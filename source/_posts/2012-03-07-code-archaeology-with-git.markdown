---
layout: post
title: "Code Archaeology with Git"
date: 2012-03-07 15:35
comments: true
categories: [Git, Github, Tools, Visualization]
---
Have you ever dug through the commit history of an open source project, peeling
away layers, sifting for clues, trying to answer the question, "why does this
code do what it does"? I call this process _code archaeology_.

Code archaeology is made difficult by historical debris: reformatting, refactoring,
code movement, and other incidental changes. This post takes a look at techniques
for separating the interesting commits from the uninteresting ones. We'll look at
existing git tools, a tool provided by another SCM system that I wish had a git
equivalent, and a promising feature of git that has yet to arrive.

## Blame

`git blame` or github's blame view is frequently the first step---but also the first
source of frustration:

{% tweet https://twitter.com/wycats/status/153970008983216128 align='center' %}

`git blame` has a few options that can help with this problem.

* With `-w`, blame ignores lines where only whitespace changed.
* With `-M`, blame detects moved or copied lines within a file, and blames them on
the original commit instead of the commit that moved or copied them.
* With `-C`, blame extends this move or copy detection to other files that were
modified in the same commit. You can specify this option two or three times to
make git look even harder (but more slowly) for moves and copies. See the
[manpage](http://schacon.github.com/git/git-blame.html) for details.

For example, I compared the blame for
[Rails's sprockets railtie](https://github.com/rails/rails/blob/master/actionpack/lib/sprockets/railtie.rb)
without any options and with `-wCCC`. The latter was able to tell that
[this commit](https://github.com/rails/rails/commit/6960e481cb87964bd450ec3fbaa1087f44c3b860)
shouldn't be blamed because it changed only whitespace, and it blamed the multiline
comment near the end of the file on the
[commit where it was originally introduced](https://github.com/rails/rails/commit/8f75c3abcde4f2ff64e855178027e1bd93976de9),
rather than a [later commit which moved it](https://github.com/rails/rails/commit/8248052ee74465abfae5b202270e96c9fd93e785).

If any githubbers are reading this: how about supporting some power-user query
parameters on blame pages? I suggest `w=1` for ignoring whitespace (a parameter
which is already supported on diff pages); `M=1`, `C=1`, `C=2`, and `C=3` for various
levels of move and copy detection.

## Pickaxe

If you read the `git blame` manpage, you might have noticed a somewhat cryptic
reference to the "pickaxe" interface. Pickaxes are often useful for archaeological
purposes, and git's pickaxe is no exception. It refers to the `-S` option to
`git log`. The `-S` option takes a string parameter and searches the commit history for
commits that introduce or remove that string. That's not quite the same thing as
searching for commits whose diff contains the string---the change must
actually add or delete that string, not simply include a line on which it appears.

For example, I was looking at the same Sprockets railtie I looked at with `blame`
and trying to figure out why `Rails.env` was included in Sprocket's environment
version on [line 24](https://github.com/rails/rails/blob/6960e481cb87964bd450ec3fbaa1087f44c3b860/actionpack/lib/sprockets/railtie.rb#L24).
Blame landed on an [uninteresting commit](https://github.com/rails/rails/commit/63d3809e31cc9c0ed3b2e30617310407ae614fd4):

```
$ git blame -L23,25 actionpack/lib/sprockets/railtie.rb
8248052e (Joshua Peek 2011-07-27 15:09:42 -0500 23)       app.assets = Sprockets::Environment.new(app.root.to_s) do |env|
63d3809e (Joshua Peek 2011-08-21 16:42:06 -0500 24)         env.version = ::Rails.env + "-#{config.assets.version}"
8248052e (Joshua Peek 2011-07-27 15:09:42 -0500 25)
$ git log -1 63d3809e
commit 63d3809e31cc9c0ed3b2e30617310407ae614fd4
Author: Joshua Peek <josh@joshpeek.com>
Date:   Sun Aug 21 16:42:06 2011 -0500

    Fix sprockets warnings

    Fixes #2598
```

But the pickaxe found the answer right away:

```
$ git log -S'Rails.env' actionpack/lib/sprockets/railtie.rb
commit ed5c6d254c9ef5d44a11159561fddde7a3033874
Author: Ilya Grigorik <ilya@igvita.com>
Date:   Thu Aug 4 23:48:40 2011 -0400

    generate environment dependent asset digests

    If two different environments are configured to use the pipeline, but
    one has an extra step (such as compression) then without taking the
    environment into account you may end up serving wrong assets
```

## `git gui blame`

[`git gui blame`](http://schacon.github.com/git/git-gui.html) might be the most
useful and least known features of the Tcl/Tk-based GUI included with git.
You give it the name of a file and it opens an interactive blame viewer with built-in
move and copy detection and an easy way to reblame from a parent commit. Check it out:

![Screenshot of git gui blame](/images/git-gui-blame.png)

The first column on the left shows the blame _with_ move and rename detection, and the second
shows who moved the line to its current location. In the lines selected in
green, we see evidence of the movement of the same comment that
we looked at with command-line blame: in the first column, José Valim (JV)
originated it in `8f75`, and Josh Peek (JP) later moved it in `8428`.

The killer feature of `git gui blame` is found in the context menu: "Blame Parent
Commit". When blame lands on an uninteresting commit, you can use this command to
skip over it and reblame from the immediately prior commit. This is so useful that
gui blame has become my go-to tool for code archeology.

## Perforce Time-lapse View

I would never choose to use Perforce over git, but I do miss one feature that it
provides: the [time-lapse view](http://filehost.perforce.com/downloads/media/tlv/tlv.html).

<div class="flash-video">
  <div>
    <object type="application/x-shockwave-flash" name="swftools-4f57b6e32a8d5" data="http://www.perforce.com/sites/all/libraries/flowplayer3/flowplayer-3.2.2.swf" width="670" height="528" id="swftools-4f57b6e32a8d5">
      <param name="version" value="9">
      <param name="play" value="true">
      <param name="loop" value="true">
      <param name="menu" value="false">
      <param name="allowfullscreen" value="true">
      <param name="swliveconnect" value="false">
      <param name="quality" value="autohigh">
      <param name="scale" value="noborder">
      <param name="wmode" value="transparent">
      <param name="align" value="l">
      <param name="salign" value="tl">
      <param name="allowscriptaccess" value="sameDomain">
      <param name="base" value="/sites/default/files/">
      <param name="flashvars" value="config=%7B%20%27playerId%27%3A%20%27swftools-4f57b6e32a8d5%27%2C%20%27playlist%27%3A%20%5B%20%27http%3A%2F%2Ffilehost.perforce.com%2Fdownloads%2Fmedia%2Ftlv%2Ftlv.flv%27%20%5D%2C%20%27canvas%27%3A%20%7B%20%27height%27%3A%20%27528%27%2C%20%27width%27%3A%20%27670%27%2C%20%27backgroundRepeat%27%3A%20%27repeat%27%2C%20%27backgroundGradient%27%3A%20%27low%27%2C%20%27backgroundColor%27%3A%20%27%23000000%27%20%7D%2C%20%27clip%27%3A%20%7B%20%27autoPlay%27%3A%20false%2C%20%27autoBuffering%27%3A%20true%2C%20%27scaling%27%3A%20%27fit%27%2C%20%27accelerated%27%3A%20false%2C%20%27linkWindow%27%3A%20%27_blank%27%2C%20%27live%27%3A%20false%20%7D%2C%20%27play%27%3A%20%7B%20%27opacity%27%3A%20%270.8%27%2C%20%27fadeSpeed%27%3A%20%27500%27%2C%20%27rotateSpeed%27%3A%20%2750%27%2C%20%27height%27%3A%20%2710%25%27%2C%20%27width%27%3A%20%2710%25%27%2C%20%27replayLabel%27%3A%20%27Play%20again%27%20%7D%2C%20%27plugins%27%3A%20%7B%20%27controls%27%3A%20%7B%20%27backgroundGradient%27%3A%20%27medium%27%2C%20%27progressGradient%27%3A%20%27medium%27%2C%20%27bufferGradient%27%3A%20%27none%27%2C%20%27sliderGradient%27%3A%20%27none%27%2C%20%27volumeSliderGradient%27%3A%20%27none%27%2C%20%27autoHide%27%3A%20%27fullscreen%27%2C%20%27play%27%3A%20true%2C%20%27volume%27%3A%20true%2C%20%27mute%27%3A%20true%2C%20%27time%27%3A%20true%2C%20%27stop%27%3A%20false%2C%20%27playlist%27%3A%20false%2C%20%27fullscreen%27%3A%20true%2C%20%27scrubber%27%3A%20true%2C%20%27borderRadius%27%3A%20%270%27%2C%20%27scrubberHeightRatio%27%3A%20%270.4%27%2C%20%27scrubberBarHeightRatio%27%3A%20%271%27%2C%20%27volumeSliderHeightRatio%27%3A%20%270.4%27%2C%20%27volumeBarHeightRatio%27%3A%20%271%27%2C%20%27timeBgHeightRatio%27%3A%20%270.7%27%2C%20%27hideDelay%27%3A%20%274000%27%2C%20%27backgroundColor%27%3A%20%27%23000000%27%2C%20%27timeColor%27%3A%20%27%2301daff%27%2C%20%27durationColor%27%3A%20%27%23ffffff%27%2C%20%27progressColor%27%3A%20%27%23015b7a%27%2C%20%27bufferColor%27%3A%20%27%236c9cbc%27%2C%20%27sliderColor%27%3A%20%27%23000000%27%2C%20%27buttonColor%27%3A%20%27%23889aa4%27%2C%20%27buttonOverColor%27%3A%20%27%2392b2bd%27%2C%20%27volumeSliderColor%27%3A%20%27%23000000%27%2C%20%27timeBgColor%27%3A%20%27%23000000%27%20%7D%20%7D%20%7D">
    </object>
  </div>
</div>

The time-lapse view is great for quickly scrubbing through the history of a file,
but it's difficult to keep a particular line of interest in view as you scrub.
And because it showed only a linear history, it suffers from Perforce's branching model;
I would frequently land on a huge "integration changelist" (Perforce's equivalent
of a merge commit) and need to go look at the time-lapse on a different branch.

Still, I was often able to unearth interesting commits more quickly than I can with
`git blame`, and I still hope somebody creates a similar tool for git.

## Git Line-level History Browser

The 2010 Google Summer of Code included a project for git called the
[Line-level History Browser](https://git.wiki.kernel.org/articles/s/o/c/SoC2010Projects_041c.html#Line_level_history_browser),
a set of feature additions for the `git log` command to make it easy to track the
history of a line (or set of lines), even through file renames and code movement.

Thomas Rast, co-mentor for the project, [explains](http://article.gmane.org/gmane.comp.version-control.git/154190)
the purpose of the feature:

> For me it replaces a manual iterative process to find out in what ways
> a function was patched until it came to have its current shape:
>
>     git-blame the area, find the most recent commit C
>     while 1:
>       git show C
>       if that explains the code: break
>       git-blame the area in C^
>       find the most recent commit and call it C again
>
> I do this a lot when a particular section of code puzzles me or seems
> buggy, to see if any commit message provides a reason for it.  I think
> (but I never got good with it) the "blame parent" feature of `git gui
> blame` covers a similar use-case.
>
> All of this can now be replaced by a simple `git log -L <range> <filename>`

And Bo Yang, the mentee, [lists details](http://article.gmane.org/gmane.comp.version-control.git/154040):

> Generally, the goal of this project is to:
>
> 1. `git log -L` to trace multiple ranges from multiple files;
> 2. move/copy detect when we reach the end of some lines(where lines
>    are added from scratch).
>
> And now, we have supports in detail:
>
> 1. `git log -L` can trace multiple ranges from multiple files;
> 2. we support the same syntax with `git blame` `-L` options;
> 3. we integrate the `git log -L` with `--graph` options with
>    parent-rewriting to make the history looks better and clear;
> 4. move/copy detect is in its half way. We get a nearly workable
>    version of it, and now it is in a phrase of refactor, so in the scope
>    of GSoC, move/copy detect only partly complete.

Eventually, the feature was to support "fuzzy" matching of moves and copies, so
that the history could be traced across even more "refactoring"-type commits.
Sounds fantastic, right? Why am I not using this every day? Unfortunately, Bo's work
didn't get merged to git master. It's not completely defunct; Thomas Rast maintains
[a WIP version](https://github.com/trast/git/tree/line-log-WIP) which has seen some
recent activity, so I'm cautiously optimistic this feature may yet be released.
