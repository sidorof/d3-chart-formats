const axes = {
  xAxis: {
    scaleFactor: 0.05,
    label: {
      className: 'axisLabel',
      text: 'xlabel',

      offset: 0.65,
      styles: {
        'font-size': {
          range: { max: 15, min: 7 }
        },
        'font-weight': 300,
        fill: 'black'
      }
    },
    ticks: {
      range: { max: 10, min: 3 }
    },
    styles: {}
  },
  yAxis: {
    label: {
      className: 'axisLabel',
      text: 'ylabel',
      fill: 'black',
      offset: 0.4,
      styles: {
        'font-size': 15,
        'font-weight': 300
      }
    },
    ticks: 5,
    styles: {}
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
      stroke: '#444',
      strokeWidth: '1.0',
      opacity: 1.0
    },
    vertical: {
      className: 'verticalGrid',
      stroke: '#444',
      strokeWidth: '1.0',
      opacity: 1.0
    }
  }
}

export default axes
