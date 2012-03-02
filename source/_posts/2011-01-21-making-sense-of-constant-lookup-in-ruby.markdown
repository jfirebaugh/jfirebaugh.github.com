---
layout: post
title: "Making sense of constant lookup in Ruby"
date: 2011-01-21
comments: true
categories: [Ruby]
---
In Ruby 1.8, constant lookup is mostly <a
href="http://en.wikipedia.org/wiki/Scope_(programming)#Lexical_versus_dynamic_scoping">lexically scoped</a>,
even when using <tt>class_eval</tt> or <tt>instance_eval</tt>.
That is, constant lookup always searches the chain of <em>lexically
enclosing</em> classes or modules. The first lexically enclosing class or
module is not necessarily the same as <tt>self.class</tt>:

{% gist 790454 constants.rb %}

Here's the output on 1.8.7:

{% gist 790510 %}

Here we can see that within the lexical block defining <tt>Foo#foo</tt>, which
is enclosed by <tt>class Foo</tt>, <tt>X</tt> refers to <tt>Foo::X</tt>, while
in the lexical blocks used for the singleton method, <tt>class_eval</tt>, and
<tt>instance_eval</tt>, which are not in <tt>class Foo</tt>'s scope,
<tt>X</tt> refers to <tt>::X</tt>, the global constant.

However, in 1.9, the situation changes, and moreover, the behavior is
different between 1.9.1 and 1.9.2. Here's the result of running <tt><a
href="http://rvm.beginrescueend.com/set/ruby/">rvm 1.9.1,1.9.2
constants.rb</a></tt>:

{% gist 790511 %}

So, in 1.9.1, constant lookup in <tt>class_eval</tt> and
<tt>instance_eval</tt> proceeds from the receiver, rather than the lexically
enclosing scope. Particularly for <tt>class_eval</tt>, this turned out to be a
<a href="http://www.ruby-forum.com/topic/191672">problematic</a> <a
href="http://www.ruby-forum.com/topic/199317">change</a>, breaking existing
libraries that depended on the 1.8.7 behavior and making it hard to build DSLs
that behaved in predictable ways. Eventually, it was decided to <a
href="http://www.ruby-forum.com/topic/199317#871425">revert to the 1.8
behavior</a>, and this was supposedly implemented:

<blockquote><pre>
&gt; [Matz] would like to revert all of instance_eval, instance_exec,
&gt; class_eval, and class_exec to the behavior of 1.8 (including class
&gt; variables). [...]

I have just commited it to the SVN trunk.
</pre></blockquote>

I say "supposedly" only because as you can see, the 1.9.2 behavior still
differs from 1.8.7 in the case of <tt>instance_eval</tt>. Was this an
oversight, or was the revert later unreverted for&nbsp;<span
style="font-family: monospace;">instance_eval</span>? If so, what was the
rationale? I searched the mailing list and subsequent commits, but couldn't
find an explanation. If anyone can shed light on the matter, I would
appreciate it.

As you can see, 1.9.2 also changed the behavior for singleton methods: the
receiver's scope is now searched before the lexically enclosing scope. This
change makes sense to me, and I haven't heard of it causing any problems.

Note that these rules apply to constant <em>definition</em>&nbsp;as well as
lookup. In 1.8 and 1.9.2, a constant defined in a class_evaluated block will
be defined in the enclosing lexical scope, rather than the scope of the
receiver. This is one of the things that makes <tt>Foo = Class.new { ...
}</tt> not <em>quite</em> the same as <tt>class Foo; ...; end</tt>:

{% gist 790492 %}

The block passed to <tt>Class.new</tt> is effectively
<tt>class_eval</tt>uated, so in this example, the constant <tt>Quux</tt> ends
up defined at the top level. (And once again 1.9.1 is the exception: it
defines <tt>Baz::Quux</tt> instead.) This behavior can cause problems if you
are in the habit of defining test classes in RSpec <tt>describe</tt> blocks:

{% gist 790496 %}

Here <tt>TestClass</tt> winds up in the global scope, not the scope of the
RSpec example group that <tt>describe</tt> creates. If you have multiple specs
that define test classes with the same name, you may get collisions unless you
place each <tt>describe</tt> within a uniquely-named module or diligently
remove the constants in an <tt>after</tt> block. In the above example, you'll
get the error "superclass mismatch for class TestClass".

If you need to ensure a particular scoping is used (for example, if you need
to support 1.9.1 as well as 1.8.7/1.9.2), you can always be explicit about it
by prefixing constants with <tt>::</tt> (for global lookup), <tt>self::</tt>
(for receiver scope), or the fully qualified desired scope:

{% gist 790500 %}
