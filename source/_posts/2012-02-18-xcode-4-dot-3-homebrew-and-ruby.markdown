---
layout: post
title: "Xcode 4.3, homebrew, and Ruby"
date: 2012-03-02
comments: true
categories: [Homebrew, Xcode, Ruby, RVM]
---
Ruby on Mac OS Lion is going through a bit of a rough patch,
installation-wise. With Xcode 4.2, clang became the default compiler and gcc
was no longer included. Unfortunately, this has caused a lot of grief for
Rubyists on OS X, because for a while, MRI did not officially support
compiling with clang. With the release of 1.9.3-p125,
that situation has changed--clang is now officially supported--but
there are still some gotchas. This post details my toolchain and process for
running MRI 1.9.3 and 1.8.7 on Lion with Xcode 4.3.

If you want a TL;DR: install the Xcode 4.3 command line tools. Then,

```
$ brew update
$ brew install autoconf automake
$ brew install https://raw.github.com/Homebrew/homebrew-dupes/master/apple-gcc42.rb
$ rvm get head
$ rvm install 1.8.7
$ rvm install 1.9.3-head
```

Read on for a detailed rationale.

## Xcode

I use Xcode 4.3 and have installed the Xcode command line tools. I've
uninstalled all previous versions of Xcode. If you don't use Xcode itself,
save yourself a multi-gigabyte download and install just the command line
tools, which are now available
[separately](http://developer.apple.com/downloads). Thanks to Kenneth Reitz for
[his work making this happen](http://kennethreitz.com/xcode-gcc-and-homebrew.html).

## Homebrew

Homebrew now has good support for Xcode 4.3. Just make sure to `brew update`.

In order to build MRI, you'll need to install some specific formulas. First
of all, autoconf and automake:

    $ brew install autoconf automake

You need these because Xcode 4.3 no longer includes autotools; if you have
installed Xcode 4.3 and uninstalled the previous versions,
you will no longer have `/usr/bin/autoconf`. You don't usually need the
autotools for installing homebrew formulas, since the downloaded packages
should come with `configure` pregenerated, but you do need them in order to
install head versions of MRI as described below.

Second, install gcc--the real version--from homebrew-dupes:

    $ brew install https://raw.github.com/Homebrew/homebrew-dupes/master/apple-gcc42.rb

The command line tools provide `/usr/bin/gcc`, but it's a modified version
based on LLVM and if you try to use it to compile 1.8.7,
you'll get the following crash when trying to install gems:

```
$ gem install bundler
/Users/john/.rvm/rubies/ruby-1.8.7-p358/lib/ruby/1.8/timeout.rb:60: [BUG] Segmentation fault
ruby 1.8.7 (2012-02-08 patchlevel 358) [i686-darwin11.3.0]
```

Kenneth Reitz's
[osx-gcc-installer](https://github.com/kennethreitz/osx-gcc-installer) is another
popular way of getting GCC,
but you don't want to install it on top of the Xcode 4.3 command line tools,
because it will overwrite working versions of llvm-gcc and clang.
Homebrew-alt's apple-gcc42 formula gives you _just_ Apple's GCC 4.2,
installed at `/usr/local/bin/gcc-4.2`.

## RVM

Install RVM and run `rvm get head`. The latest RVM
[has the smarts](https://github.com/wayneeseguin/rvm/issues/763) to use the
correct compilers to build both 1.9.3 and 1.8.7 -- clang for 1.9.3 and gcc-4.2
for 1.8.7. I tend to install both so I can test my gems on both versions.

    rvm install 1.9.3
    rvm install 1.8.7

You shouldn't see any errors or warnings from these commands,
and you shouldn't need to specify `--with-gcc=clang` or `--with-gcc=gcc-4.2`.
If you see something like `Building 'ruby-1.8.7-p358' using clang - but it's
not (fully) supported, expect errors`, you've done something wrong. Go back
and make sure your command line tools are correctly installed and you've
installed the apple-gcc42 homebrew-alt formula.

You should now have working copies of 1.9.3 and 1.8.7. Hooray!

Still, you might run into one more problem. If you try to debug on 1.9.3,
you'll get this error:

```
/Users/john/.rvm/rubies/ruby-1.9.3-p125/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36:
  in `require': dlopen(/Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug-base19-0.11.25/lib/ruby_debug.bundle, 9):
  Symbol not found: _ruby_current_thread (LoadError)
  Referenced from: /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug-base19-0.11.25/lib/ruby_debug.bundle
  Expected in: flat namespace
 in /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug-base19-0.11.25/lib/ruby_debug.bundle - /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug-base19-0.11.25/lib/ruby_debug.bundle
	from /Users/john/.rvm/rubies/ruby-1.9.3-p125/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug-base19-0.11.25/lib/ruby-debug-base.rb:1:in `<top (required)>'
	from /Users/john/.rvm/rubies/ruby-1.9.3-p125/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
	from /Users/john/.rvm/rubies/ruby-1.9.3-p125/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug19-0.11.6/cli/ruby-debug.rb:5:in `<top (required)>'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug19-0.11.6/bin/rdebug:108:in `require_relative'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/gems/ruby-debug19-0.11.6/bin/rdebug:108:in `<top (required)>'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/bin/rdebug:19:in `load'
	from /Users/john/.rvm/gems/ruby-1.9.3-p125/bin/rdebug:19:in `<main>'
```

This is caused by a [clang incompatibility](https://bugs.ruby-lang.org/issues/6080)
that didn't get fixed until after the 1.9.3-p125 release. Use the head
version of 1.9.3 instead: `rvm install 1.9.3-head`.

Phew! Now you're really bleeding edge.
