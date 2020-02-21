# d3-chart-formats

This project enables a way of exploring the selection of parameters for D3.js charts. D3 is an amazing package, you can do anything with it. However, that means that decisions need to be made as to an overall look or aesthetic as well as more detailed specifications for how a particular chart should look.

The approach taken implements parameters representing thematic types in a hierarchy. Depending upon where in the tree the parameters are adjusted, modifications to themes can be massive or minor tweaks.

To that end, I have created some classes and functions to make the charts and implemented a minor build using Vue.js and Vuetify.js to play with parameters.

This is a work in progress.

Demo at https://sidorof.github.io/d3-chart-formats/


General strategy:

There are three main sections where the chart types can sliced and diced.
* Explore chart types -- All current chart types are presented with sample data. A theme can be selected and applied to all the different charts to understand the impact on the look and feel from the modification.
* Explore Themes -- Charts by type are presented with a set of modifications to see how the chart looks under any given theme.
* Explore Scaling -- A chart can be selected with a specified modification. Then, scaling the chart up and down in size to investigate swapping font sizes, proportions and other criteria to understand how the chart responds under various conditions.

Modifications
Modifications as transactions has now been added. A path that represents a leaf on the config tree can be used to adjust characteristics of the graph to implement the elements of a theme. There are also a few examples of themes.

Todo:
* Expand the number of chart types.
* Add interactive transitions
* Continue code cleanup to simplify organization

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
    etc
```
The family of charts can then be extended by selecting the appropriate class and layer on the new feature.

In an actual installation, the backend api will provide access to the available theme types.
