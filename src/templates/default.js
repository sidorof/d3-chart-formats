
export const defaultTheme = {
  styles: {
    background: '#eee'
  },
  className: 'chart',
  panel: {
    top: 60,
    bottom: 70,
    right: 60,
    left: 60,
    className: 'panel',
    styles: {
      fill: '#ccc'
    }
  },
  margin: { top: 0.0, right: 0.0, bottom: 0.0, left: 0.0 },
  titles: [
    {
      text: 'My Title Here',
      x: '50%',
      y: 25,
      styles: {
        'font-size': 24,
        'fill': '#999999'
      }
    },
    {
      text: 'Subtitle',
      x: '50%',
      y: 45,
      styles: {
        'font-size': 14,
        'fill': '#888888'
      }
    }
  ],
  axes: {
    xAxis: {
      scaleFactor: 0.05,
      label: {
        className: 'axisLabel',
        text: 'xlabel goes here',
        fill: 'black',
        offset: 0.5,
        styles: {
          'font-size': 15,
          'font-weight': 300
        }
      },
      ticks: 5,
      styles: []
    },
    yAxis: {
      label: {
        className: 'axisLabel',
        text: 'ylabel goes here',
        fill: 'black',
        // fontWeight: 400,
        // fontSize: 10,
        offset: 0.4,
        styles: {
          'font-size': 15,
          'font-weight': 300
        }
      },
      ticks: 5,
      styles: [
      ]
    },
    yRightAxis: {
      label: {
        className: 'axisLabel',
        text: '',
        fill: 'black',
        offset: 0.25,
        styles: {}
      },
      ticks: 5,
      styles: {}
    },
    grids: {
      horizontal: {
        className: 'horizontalGrid',
        stroke: 'black',
        strokeWidth: '1.0',
        opacity: 0.1
      },
      vertical: {
        className: 'verticalGrid',
        stroke: 'black',
        strokeWidth: '1.0',
        opacity: 0.1
      }
    }
  },
  data: {
    path: {
      className: 'series',
      // stroke: not implemented here
      strokeWidth: 3.0
      // dots go here
    }
  }
}
