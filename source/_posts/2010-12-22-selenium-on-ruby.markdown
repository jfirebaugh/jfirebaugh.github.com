---
layout: post
title: "Selenium on Ruby"
date: 2010-12-22
comments: true
categories: [Ruby, Tools]
---
The state of Selenium on Ruby is a bit confusing. Among the top google results for
["selenium ruby"](http://www.google.com/search?q=selenium+ruby) are several links that are badly out of date, and it's
not clear which of the many [gems](http://rubygems.org/search?utf8=%E2%9C%93&amp;query=selenium) are ones you would want
to use. This post aims to clear up some of the confusion.

First of all, you should be aware that there are two Selenium APIs: the original 1.0 API, called Selenium-RC, and a
newer 2.0 API called Selenium WebDriver. Internally, the two have quite different architectures. In a nutshell,
Selenium-RC is based around a Java "Remote Control" server process that launches the browser under test and manages
communication between the client process (the Ruby interpreter, in our case) and the browser. The browser is controlled
by injecting the "Selenium Core" JavaScript framework into the Browser's built-in JavaScript interpreter. In contrast,
WebDriver requires no external process; the browser is launched directly, and controlled via means that vary from
browser to browser. For example, WebDriver controls Firefox via a custom Firefox extension.

Ruby has good support for both RC and WebDriver. The [selenium-client](http://rubygems.org/gems/selenium-client) gem
([docs](http://selenium-client.rubyforge.org/), [source](https://github.com/ph7/selenium-client)) provides bindings for
the RC API, and the [selenium-webdriver](http://rubygems.org/gems/selenium-webdriver) gem
([wiki](http://code.google.com/p/selenium/wiki/RubyBindings),
[docs](http://selenium.googlecode.com/svn/trunk/docs/api/rb/index.html),
[source](http://code.google.com/p/selenium/source/browse/#svn%2Ftrunk%2Frb)) provides bindings for the WebDriver API.
You will likely want to use one of these two gems, but which one? If you are using Selenium via a higher-level Ruby
library such as Webrat or Capybara, the choice will be made for you: Webrat uses selenium-client, Capybara uses
selenium-webdriver. If you want to access a Selenium API directly, I would generally recommend selenium-webdriver.
The WebDriver API provides several advantages, including multi-browser testing, page navigation, drag-and-drop, and
multi-frame and multi-window support. It recently released its
[first beta](http://groups.google.com/group/selenium-users/browse_thread/thread/28ce2b37123a4e4d) and is where the
future of Selenium and Selenium on Ruby lies. It is, however, still beta software and sometimes changes its API in
aggravating ways. If stability is of paramount concern, stick with selenium-client.

You may find references to some other Selenium-related Ruby projects. The [Selenium](http://rubygems.org/gems/Selenium)
gem (with a capital "S") and its associated website [selenium.rubyforge.org](http://selenium.rubyforge.org/) paved the
way for Selenium on Ruby, but today it is obsolete, as is the [selenium-rails](http://rubygems.org/gems/selenium-rails)
gem which depends on it. Unfortunately they are still prominently featured in search results and on the
[outdated "Selenium on Ruby" page](http://seleniumhq.org/projects/ruby/), which doesn't even mention selenium-webdriver.

The Selenium RC API relies on an external Java-based server process, and though the selenium-client gem provides rake
tasks to start and stop an RC server, it does not provide the actual jar file necessary to run the service. You can
either download and install it yourself, or install the [selenium-rc](http://rubygems.org/gems/selenium-rc) gem, which
bundles it. You'll sometimes see a gem that depends on selenium-client also depending on selenium-rc solely for the jar,
as the [jasmine](https://github.com/pivotal/jasmine-gem) gem does. The selenium-rc gem has some Ruby code in it too, but
it more or less duplicates functionality that's already part of selenium-client.

Finally there's the [selenium](http://rubygems.org/gems/selenium) and
[selenium_remote_control](http://rubygems.org/gems/selenium_remote_control) gems, which provide functionality similar
to selenium-client and selenium-rc. They don't seem widely used and at first glance I don't see any reason to prefer
them to the more popular gems. Recent releases of the selenium-webdriver gem include the selenium-client code as well,
and personally, I hope that selenium-webdriver can usurp the "selenium" gem name and become the One True Selenium gem
for Ruby.
