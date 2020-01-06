# d3-chart-formats

This project enables a way of exploring the selection of parameters for D3.js charts. D3 is an amazing package, you can do anything with it. However, that means that decisions need to be made as to an overall look or aesthetic as well as more detail specifications for how a particular chart should look.

The approach taken implements parameters representing thematic types in a
hierarchy. Depending upon where in the tree the parameters are adjusted, adjustments to themes can be massive or minor tweaks.

To that end, I have created some classes and functions to make the charts and implemented a minor build using Vue.js and Vuetify.js to play with parameters.

This is a work in progress.

General strategy:

D3 class organization
```
D3Base  -- prototype class
├── D3Plot      defines basic visual parameters
    ├── D3LinePlot
    │       ├── D3DateLinePlot
    ├── D3AreaPlot
    │       ├── D3DateAreaPlot
    ├── D3BarPlot
    ├── D3PiePlot
    ├── D3CombinationPlot
    ├── D3Network Plot
```
