---
layout: post
title: "How to securely bootstrap JSON in a Rails view"
date: 2012-04-30 10:13
comments: true
categories: [Rails, Security, XSS]
---
A common pattern with client-side MVC applications is to embed the data for a
base set of models in the initial page instead of making a separate AJAX request to
load them. In a Rails application, this is typically done by interpolating the
result of a call to `to_json` in the view. The [Backbone.js docs](http://backbonejs.org/#FAQ-bootstrap)
provide this example:

``` erb
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset(<%= @accounts.to_json %>);
  var Projects = new Backbone.Collection;
  Projects.reset(<%= @projects.to_json(:collaborators => true) %>);
</script>
```

If you try this in a Rails 3 application, you will discover that by default,
the interpolated results of `to_json` are HTML-escaped: `&`, `>`, `<`, and `"`
are replaced with the equivalent HTML entities. Inside the script tag, this is
almost certainly not what you want. JSON strings containing `&`, `>`, and `<`
should contain those characters literally, and the `"` character delimits the
JSON strings themselves. Escaping them prevents the desired result:
a literal JavaScript value embedded in the script.

The common reaction is to disable HTML escaping, either by prepending the call
to `to_json` with the `raw` helper, or calling `html_safe` on the result. Here's
the same example using each of these techniques:

``` erb DO NOT FOLLOW THIS EXAMPLE
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset(<%= raw @accounts.to_json %>);
  var Projects = new Backbone.Collection;
  Projects.reset(<%= @projects.to_json(:collaborators => true).html_safe %>);
</script>
```

_Do not follow this example!_ Used in this way, both `raw` and `html_safe` open
vectors for a cross-site scripting vulnerability, and it is unfortunate that their
use is [so](https://github.com/search?utf8=%E2%9C%93&q=raw+to_json&repo=&langOverride=&start_value=1&type=Code&language=HTML%2BERB)
[widespread](https://github.com/search?utf8=%E2%9C%93&q=to_json+html_safe&repo=&langOverride=&start_value=1&type=Code&language=HTML%2BERB) and
commonly [recommended](http://stackoverflow.com/a/3758055/52207).

To understand the vulnerability, consider what happens if one of the strings
in the JSON contains the text `</script>`. This text is interpolated
into the page, and since both `raw` and `html_safe` disable HTML-escaping, it
is interpolated literally. As a consequence, and despite the fact that it appears
within a JavaScript string literal, `</script>` [closes the script element](http://mathiasbynens.be/notes/etago),
leaving an opportunity to embed an XSS payload in the subsequent text:

``` html
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset([{name: "</script><script>alert('xss')</script>", ...}]);
  // ...
</script>
```

The simplest way to escape JSON strings that may contain the `</` sequence
is to precede the slash with a backslash. Though simple to do, this should be built
in to Rails. Unfortunately, it is not. The obvious candidate would be `json_escape`,
aliased as `j`, which one would expect to be the JSON analog of the old Rails 2 `h` helper
for HTML escaping:

``` erb
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset(<%=j @accounts.to_json %>);
  // ...
</script>
```

However, in addition to escaping the JSON in a way that prevents XSS, `json_escape`
also _removes_ double quote (`"`) characters. Yes, that's right, `json_escape`
is [documented](http://api.rubyonrails.org/classes/ERB/Util.html#method-c-json_escape)
to return invalid JSON. This baffling behavior is most likely a mistake in the
[original implementation](https://github.com/rails/rails/commit/0ff7a2d89fc95dcb0a32ed92aab7156b0778a7ea).
I've submitted a [pull request](https://github.com/rails/rails/pull/6094) to change it, which will hopefully be accepted for Rails 4.

A second attempt might be to try [`escape_javascript`](http://api.rubyonrails.org/classes/ActionView/Helpers/JavaScriptHelper.html#method-i-escape_javascript),
but this escapes much more than necessary. It could probably be made to work, but would
require parsing JSON on the client rather than simply interpolating a literal JavaScript
value.

Finally, there's the option of setting `ActiveSupport::JSON::Encoding.escape_html_entities_in_json`
to true. This works, but since the default was [explicitly changed to false](https://github.com/rails/rails/commit/6042067c0b20602e72954450e9e8a19dfa8a9f7d)
in Rails 3, it feels like a workaround at best. If you change the default globally, be sure
that any consumers of JSON APIs provided by your application are prepared to handle
Unicode escape sequences, because it will result in `</script>` being escaped as
`\u003C/script\u003E` rather than `<\/script>`.

My recommendation is to overwrite `json_escape` with a sensible definition and use
that:

``` ruby config/initializers/json_escape.rb
class ActionView::Base
  def json_escape(s)
    result = s.to_s.gsub('/', '\/')
    s.html_safe? ? result.html_safe : result
  end

  alias j json_escape
end
```

``` erb view.html.erb
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset(<%=j @accounts.to_json.html_safe %>);
  var Projects = new Backbone.Collection;
  Projects.reset(<%=j @projects.to_json(:collaborators => true).html_safe %>);
</script>
```

This is simple, sufficient to prevent XSS from bootstrapped JSON, and will hopefully
be the built-in behavior of `json_escape`/`j` in Rails 4.
