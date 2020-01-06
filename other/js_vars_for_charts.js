 {
  chartParams: {
    chartId: 'datelinePlot',
    plot: {
      size: { width: null, height: null },
      background: '#000000',
      panel: { top: 40, right: 40, bottom: 45, left: 60 },
      margin: { top: 0.01, right: 0.02, bottom: 0.15, left: 0.0 }
    },
    series: {
      colorScheme: null,
      lineWidth: 1.0,
      markerSize: '5px',
      opacity: 1.0
    },
    axes: {
      xAxis: {
        use: true,
        ticks: 10
        label: {
          text: null,
          fill: '#EEE',
          xPosition: 0.4,
          fontWeight: 700
          // font?
        }
      },
      yAxis: {
        use: true,
        ticks: 5
        label: {
          text: null,
          fill: '#EEE',
          // yPosition: not used
          fontWeight: 700
          // font?
        }
      },
      yRightAxis: {
        use: true,
        ticks: 5
        label: {
          text: null,
          fill: '#EEE',
          xPosition: 0.4,
          fontWeight: 700
          // font?
        }
      },
      grids: {
        horizontal:
          use: true,
          stroke: '#EEEEEE',
          strokeWidth: 0.9,
          opacity: 0.05
      }
    },
    title: {
      useTitle: true,
      text: 'Your title here {{ test }}',
      fill: '#444'
      // font from class
      // fontSize: '20px',
      // color: blue;
    }
  },


 }

      plot: {
        size: { width: null, height: null },
        background: '#000000'
      },
      plotSize: { width: null, height: null },
      panel: { top: 40, right: 40, bottom: 45, left: 60 },
      margin: { top: 0.01, right: 0.02, bottom: 0.15, left: 0.0 },
      colors: ['blue', 'green', 'red', 'purple'],
      xlabel: null,
      ylabel: null,
      currentDisplay: null,
      useLegend: true,
      drawVerticalLine: false,
      legendHeight: 20
    }

    dotlabel variables
      rectCoords = null
      rectClass = 'spotBox'
      rectMarginX = 15
      rectMarginY = 30
      rectStroke = '#333'
      rectStrokeWidth = '0.5'
      rectFill = 'white'
      rectFillOpacity = '0.5'
      rectRx = '8'
      rectRy = '8'
      rectWidth = '100'
      rectAttrs = []

      // line defaults
      labels = []
      _textHeight = 20
      _textClass = 'spotLabel'
      _textFill = 'darkblue'
      _textAnchor = 'center-align'
      _fontFamily = 'Arial;'
      _fontSize = '13px;'

      // dot defaults
      dotClass = 'spotDot'
      dotFill = null
      dotR = 8
      dotAttrs = []

    legend variables
      dotSize = 7 // size of dot
      selectDotSize = 11
      dotSizePadding = 16 // space after dot

      // is it spaced on width of item characters or fixed?
      itemPadding = 0 // padding between items if variable
      charWidth = 25 // used to calculate spacing

      itemFixedWidth = 50 // entire item width
      itemHeight = 20

      // upper left-hand corner
      left = 0 // start of legend at left
      top = 0 // start of legend at

      useRect = true // shows a background rectangle

      bottomRectY = null
      legendRectAttrs = [
        ['stroke', '#888'],
        ['strokeWidth', 0.5],
        // ['fill', 'none'],
        ['fill', 'white'],
        ['opacity', 1],
        ['rx', 7],
        ['ry', 7]
      ]
      legendLabelAttrs = [
        ['fontSize', '13px']
      ]

    legend transition attributes
      transAttrs =
  {
    mouseover: {
      legendDot: {
        duration: 150,
        attrs: {}
      },
      series: {
        duration: 250,
        attrs: {
          'stroke-width': [0.4, 3] // ,
          // opacity: [0.4, 1]
        }
      }
    },
    mouseout: {
      legendDot: {
        duration: 250,
        attrs: {}
      },
      series: {
        'stroke-width': 1,
        opacity: 1
      }
    }
  }

  // look through legend code for additional tweaks

