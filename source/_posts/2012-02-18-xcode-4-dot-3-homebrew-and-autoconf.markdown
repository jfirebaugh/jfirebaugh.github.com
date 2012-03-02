---
layout: post
title: "Xcode 4.3, homebrew, and autoconf"
date: 2012-02-18
comments: true
categories: [Homebrew, Xcode]
---
Xcode 4.3 no longer includes autotools. If you have installed Xcode 4.3 and
uninstalled the previous versions, you will no longer have `/usr/bin/autoconf`.
This isn't usually a problem for installing homebrew formulae, since the
downloaded packages should come with `configure` pregenerated, but if you want
to use <code>brew install --HEAD</code> or are building a package from a source
repository, you may need it. Here's how to get it:

```
brew install https://github.com/adamv/homebrew-alt/raw/master/duplicates/autoconf.rb
brew link autoconf
```

At some point in the near future, homebrew will probably add an autoconf formula.
At that point, you'll be able to `brew install autoconf` directly.
