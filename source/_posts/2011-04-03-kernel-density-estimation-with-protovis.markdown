---
layout: post
title: "Kernel Density Estimation with Protovis"
date: 2011-04-03
comments: true
categories: [Visualization, Statistics, Protovis]
---
<a href="http://bl.ocks.org/900762"><img src="http://dl.dropbox.com/u/7078234/KDE.png" alt="" /></a>

A [kernel density estimate](http://en.wikipedia.org/wiki/Kernel_density_estimation) provides a
means of estimating and visualizing the probability distribution function of a
random variable based on a random sample. In contrast to a histogram, a kernel
density estimate provides a smooth estimate, via the effect of a smoothing
parameter called the _bandwidth_, here denoted by _h_. With the correct choice
of bandwidth, important features of the distribution can be seen; an incorrect
choice will result in undersmoothing or oversmoothing and obscure those
features.

Here we see a histogram and three kernel density estimates for a sample of
waiting times in minutes between eruptions of
[Old Faithful Geyser](http://en.wikipedia.org/wiki/Old_Faithful) in Yellowstone National
Park, taken from R's
[`faithful`](http://stat.ethz.ch/R-manual/R-patched/library/datasets/html/faithful.html)
dataset. The data follow a [bimodal distribution](http://en.wikipedia
.org/wiki/Bimodal_distribution); short
eruptions are followed by a wait time averaging about 55 minutes, and long
eruptions by a wait time averaging about 80 minutes. In recent years, wait
times have been increasing, possibly due to the effects of earthquakes on the
geyser's geohydrology.
