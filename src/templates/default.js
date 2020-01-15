
export const defaultTheme = {
  name: 'default',
  styles: {
    background: '#000'
  },
  className: 'chart',
  panel1: {
    heightRange: { max: 300, min: 200 },
    widthRange: { max: 250, min: 200 },
    top: { max: 70, min: 20, scale: 'byHeight' },
    bottom: { max: 70, min: 20, scale: 'byHeight' },
    right: { max: 60, min: 20, scale: 'byWidth' },
    left: { max: 60, min: 20, scale: 'byWidth' },
    className: 'panel',
    styles: {
      fill: '#ccc'
    }
  },
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
  titles: {
    1: {
      text: 'Main Chart Title',
      x: '50%',
      y: '40%',
      styles: {
        'font-size': {
          range: { max: 24, min: 10 }
        },
        'fill': '#222'
      }
    },
    2: {
      text: 'Subtitle',
      x: '50%',
      y: '75%',
      styles: {
        'font-size': {
          range: { max: 14, min: 7 }
        },
        'fill': '#222'
      }
    }
  },
  axes: {
    xAxis: {
      scaleFactor: 0.05,
      label: {
        className: 'axisLabel',
        text: 'xlabel',

        offset: 0.5,
        styles: {
          'font-size': {
            range: { max: 15, min: 7 }
          },
          'font-weight': 300,
          fill: 'black'
        }
      },
      ticks: 6,
      styles: {}
    },
    yAxis: {
      label: {
        className: 'axisLabel',
        text: 'ylabel',
        fill: 'black',
        // fontWeight: 400,
        // font-size: 10,
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
  },
  data: {
    path: {
      className: 'series',
      // stroke: not implemented here
      strokeWidth: 2.0
      // dots go here
    }
  },
  scale: [
    // this section is being phased out
    // {
    //   width: 450,
    //   paths: [
    //     { path: 'axes.xAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' },
    //
    //     { path: 'axes.xAxis.ticks', value: 3 },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' },
    //     { path: 'panel.bottom', value: 35 }
    //   ]
    // },
    // {
    //   width: 200,
    //   paths: [
    //     { path: 'panel.left', value: 30 },
    //     { path: 'panel.right', value: 30 },
    //     { path: 'axes.xAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' },
    //
    //     { path: 'axes.xAxis.ticks', value: 3 },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' }
    //   ]
    // },
    // {
    //   width: 100,
    //   paths: [
    //     { path: 'panel.left', value: 15 },
    //     { path: 'panel.right', value: 15 },
    //     { path: 'axes.xAxis.label.styles.font-size', value: 5 },
    //     { path: 'axes.yAxis.label.styles.font-size', value: 5 },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: 5 },
    //
    //     { path: 'axes.xAxis.ticks', value: 1 },
    //     { path: 'axes.yAxis.label.styles.font-size', value: 5 },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: 5 },
    //     { path: 'panel.top', value: 30 },
    //     { path: 'panel.bottom', value: 30 }
    //     // { path: 'titles.1.styles.font-size', value: '10px' },
    //     // { path: 'titles.2.styles.font-size', value: '10px' }
    //   ]
    // }
    // {
    //   height: 200,
    //   paths: [
    //     { path: 'panel.top', value: 15 },
    //     { path: 'panel.bottom', value: 15 },
    //     // { path: 'titles.1.styles.font-size', value: '10px' },
    //     // { path: 'titles.2.styles.font-size', value: '10px' },
    //     { path: 'axes.xAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' },
    //
    //     { path: 'axes.xAxis.ticks', value: 3 },
    //     { path: 'axes.yAxis.label.styles.font-size', value: '10px' },
    //     { path: 'axes.yRightAxis.label.styles.font-size', value: '10px' }
    //   ]
    // }

  ]
}
