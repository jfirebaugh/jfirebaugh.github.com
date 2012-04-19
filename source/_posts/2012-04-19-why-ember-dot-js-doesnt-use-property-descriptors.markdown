---
layout: post
title: "Why Ember.js doesn't use property descriptors"
date: 2012-04-19 08:11
comments: true
categories: [JavaScript, Ember.js]
---
Like model classes in many other JavaScript MVC frameworks, `Ember.Object` uses
`get()`/`set()`-based property accessor functions rather than native JavaScript
properties:

```js
MyApp.president = Ember.Object.create({
  name: "Barack Obama"
});

MyApp.president.get('name'); // Not `MyApp.president.name`
```

Of course, Ember provides computed properties and property bindings, features
that plain JavaScript properties don't support. Fortunately, ECMAScript 5 includes
_[property descriptors](http://ejohn.org/blog/ecmascript-5-objects-and-properties/)_, and in particular, the
[`Object.defineProperty()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty)
method. `Object.defineProperty` allows you to specify a function to serve as a
getter for the property (for example, to implement a computed property) and a
corresponding function to serve as a setter (which can be used to implement
properties that notify their observers when they change). So why doesn't Ember
use property descriptors to provide more natural, less intrusive object properties?

Browser compatibility is only part of the answer. Browser support for property
descriptors is actually reasonably decent: present on Firefox, Chrome, Safari, and
Opera (naturally), and IE >= 9. For applications that can afford to drop IE 8 support,
particularly mobile apps, property descriptor-based model objects would work great.

The other part of the answer is that Ember provides a feature that goes beyond what
property descriptors can support: _unknown properties_. This is a feature akin to
Ruby's `method_missing`, where you can define a handler that's called upon access
to a property you haven't explicitly defined:

```js
MyApp.president = Ember.Object.create({
  unknownProperty: function (key) {
    if (key === "name") return "Barack Obama";
  }
});

MyApp.president.get('name'); //=> "Barack Obama"
```

Property descriptors do not allow you to define a function that's called when a
previously undefined property is accessed or assigned. Accesses of undefined properties
simply produce `undefined`, and without a previously installed setter function the
object has no way of detecting assignment to a previously undefined property,
which it needs to be able to do in order to notify observers of the change. So
Ember needs something more than property descriptors in order to support
unknown properties.

Good news: that "something more" is on the horizon, in the form of
[object proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies), a
language feature slated for ECMAScript Harmony, the next release of the JavaScript
standard. Object proxies allow you to create a virtualized object that wraps a
given target object. The key feature for Ember is that `get` and `set` are part
of the proxy API, permitting the wrapper to intercept and handle all property
accesses and assignments, even for unknown properties.

Bad news: it will be awhile before support for object proxies is widespread. Currently,
support is limited to [Firefox](https://developer.mozilla.org/en/JavaScript/ECMAScript_6_support_in_Mozilla)
and [Chrome](https://plus.google.com/113127438179392830442/posts/T615Md5JPQG)
(after enabling "Experimental JavaScript" in `chrome://flags`),
both of which actually support an older, slightly different proxy specification.

Thanks to [Tom Dale](https://twitter.com/#!/tomdale) for answering this question
for me. Any inaccuracies in the above are my own.