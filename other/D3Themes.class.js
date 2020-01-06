class Theme {
  /* Theme
   *
   * This is the prototypical theme with placeholders for most of the
   * elements of a chart, mainly for thoroughness. It is expected that these
   * values are going to be overlayed with extending classes.
   *
   * These base elements might end up as classes themselves down the line.
   */
  plot = {
    // the size is intended to set the svg size
    size: { width: 500, height: 400 },
    background: 'white',

    // panel defines the area outside of the main graphs for such things as
    // the axes and labeling
    panel: { top: 40, right: 40, bottom: 45, left: 60 },

    // margin is intended to define distances from the outer edges of the plot
    margin: { top: 0.01, right: 0.02, bottom: 0.15, left: 0.0 }
  }

  title = {
    use: true,
    text: 'Your title here {{ test }}',
    fill: '#444',
    fontName: null,
    fontSize: '20px',
    background: null
  }

  chartType = null

  constructor (category) {
    this.category = category
  }
}

class DarkTheme extends Theme {

}

export { Theme, DarkTheme }
