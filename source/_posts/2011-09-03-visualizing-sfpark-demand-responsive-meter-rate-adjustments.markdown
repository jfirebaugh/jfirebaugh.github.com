---
layout: post
title: "Visualizing SFpark Demand-Responsive Meter Rate Adjustments"
date: 2011-09-03
comments: true
categories: [Visualization, Statistics, d3.js, SFpark]
---
On July 11th 2011, [SF<em>park</em>](http://sfpark.org/) announced the
first set of [meter rate adjustments](http://sfpark.org/how-it-works/pricing/).
Meter operational hours were divided into six distinct rate periods, and the hourly
price of metered parking in the project's seven pilot areas was adjusted on a
block-to-block basis in response to parking demand during each period:

* +25¢ in periods of 80% or more occupancy
* No change in periods of 60-80% occupancy
* −25¢ in periods of 30-60% occupancy
* −50¢ in periods of less than 40% occupancy

I created this visualization using the [d3.js](http://mbostock.github.com/d3/)
framework and data provided by SF<em>park</em>. Click for full size.

<a href="/sfpark/rates.html"><img src="/sfpark/SFpark.png" alt="SFpark meter
rate adjustment visualization" /></a>
