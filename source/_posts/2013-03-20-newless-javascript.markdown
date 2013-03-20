---
layout: post
title: "new-less JavaScript"
date: 2013-03-20 10:15
comments: true
categories: [JavaScript]
---
JavaScript borrowed the `new` and `delete` keywords from its less-dynamic
predecessor languages. They feel a bit out of place in a garbage collected
language and are a source of confusion for newbies -- one of the reasons
popular libraries such as jQuery, d3, and Ember.js have adopted APIs that
don't require using `new` at all. In this post I'll show you one way do it,
and why you should consider it for your next JavaScript library.

In C++, `new` and `delete` are symmetric operators that combine memory
management and object lifecycle operations. `new` allocates an instance and
calls the constructor, and `delete` calls the destructor and deallocates it.
In garbage collected languages, `delete` isn't necessary; Java doesn't have
it, for example. It's one of JavaScript's quirks that it _does_ use `delete`,
and for a purpose (removing a property from an object) that's not symmetric
with `new`. You'll sometimes see confused JavaScript programmers trying to
`delete` plain objects.

`new` can itself be a source of confusion. Looking at instantiation with
`new`, it's easy to see why: `new User()` requires both a language keyword
_and_ a unique syntactic form. In other scripting languages, neither are
needed: instantiation is done via regular function notation, either via a
class method as in Ruby (`User.new`), or calling the class object as a
function as in Python (`User()`).

What's worse, in JavaScript, forgetting `new` when calling a constructor can
produce some very strange behavior -- leaving variables undefined and polluting
the global scope. John Resig gave a great [rundown of the issues and proposed a solution](http://ejohn.org/blog/simple-class-instantiation/), often dubbed the
'instanceof trick':

```js The instanceof trick
function User(first, last) {
  if (!(this instanceof User)) return new User(first, last);
  this.first = first;
  this.last = last;
}

User.prototype.fullName = function() {
  return this.first + ' ' + this.last;
}
```

Class constructors defined with the instanceof trick can be called with or
without `new`:

```js
  var userViaNew = new User("John", "Firebaugh");
  userViaNew.fullName(); // "John Firebaugh"
  
  var userDirect = User("John", "Resig");
  userDirect.fullName(); // "John Resig"
```

In either case, the result is a newly allocated and initialized User.

John Resig goes on to show how to create a reusable function that builds
constructors that use the instanceof trick. This way, instead of writing it
out manually for every class, you write it once and use a [higher-level function](https://github.com/jfirebaugh/Leaflet/blob/auto_new/src/core/Class.js)
to declare classes and their prototype properties:

```js
// The `Class.extend` function defines a new constructor that uses
// the instanceof trick internally, and then calls `initialize`:
var User = Class.extend({
  initialize: function(first, last) {
    this.first = first;
    this.last = last;
  },
  
  fullName: function() {
    return this.first + ' ' + this.last;
  }
});

var userViaNew = new User("John", "Firebaugh");
var userDirect = User("John", "Resig");
```

APIs that use the instanceof trick internally often publicly document only the
newless form of instantiation. This minimizes the API surface area, gives new
users less to learn, and avoids the awkward aspects of `new`. Another
advantage is that it allows the implementation to choose either the [Module pattern](http://macwright.org/2012/06/04/the-module-pattern.html) or classic
prototypal instantiation without changing the public API. For example, we can
rewrite the `User` class to use the Module pattern without changing how it's
used:

```js
function User(first, last) {
  function fullName() {
    return first + ' ' + last;
  }
  return {
    first: first,
    last: last,
    fullName: fullName
  };
}
```

Similarly, if we had started out with the Module pattern, but discovered that
we needed the [memory efficiency of prototypal instantation](http://macwright.org/2013/01/22/javascript-module-pattern-memory-and-closures.html),
we could switch without changing client code.

An alternative that some library use is to pair each constructor with a factory
function of the same name but with leading lower-case, e.g. `User` and `user`:

```
  function user(first, last) {
    return new User(first, last);
  }

  var userViaNew = new User("John", "Firebaugh");
  var userViaFactory = user("John", "Resig");
```

This works, but again, it increases the size of the API you need to document
and users need to learn, and unlike the instanceof trick, there's no way to
implement it in a reusable form. You're stuck writing a factory wrapper for
every class.

A newless API works great for as jQuery and d3, and I've found it very useful
in [iD](http://ideditor.com/) as well. Consider using it for your next
library.