/* Notes:
 *
 * sampleData:
 *
 * example:
 * suppose it is specifically for a small number of items
 * or vice versa
 * sample data should cover all supported chart types
 *
 * sampleData: {
      # should work for line, area under curve, bar, stacked bar
      'date-line-plot': { columns: 5, length: 6 }   timeseries

      labeled data: bar, stacked bar, pie
      data: { items }   arrays

      hierarchical data:
        network diagrams
          fixed, floating positions
          node
            shapes, labeling
          connection
            strength
              color-coded
              thickness
              line type
    },

    sampleData:
      ts_long
 */
const mods = {
  dflt: {
    desc: 'default value for standard graphs',
    sampleData: {},
    mods: []
  },
  'dark 1': {
    desc: 'dark background version 1',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'dark' },
      { path: 'styles.background', value: '#000' },
      { path: 'panel.styles.fill', value: 'black' },

      { path: 'axes.styles.stroke', value: 'white' },
      { path: 'axes.xAxis.stroke', value: 'white' },
      { path: 'axes.yAxis.stroke', value: 'white' },
      { path: 'axes.yRightAxis.stroke', value: 'white' },
      //
      { path: 'axes.xAxis.label.fill', value: 'white' },
      { path: 'axes.yAxis.label.fill', value: 'white' },
      { path: 'axes.yRightAxis.label.fill', value: 'white' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'titles.1.styles.fill', value: '#aaa' },
      { path: 'titles.2.styles.fill', value: '#aaa' }
    ]
  },

  'dark 2': {
    desc: 'dark background version 2',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'dark' },
      { path: 'styles.background', value: '#000' },
      { path: 'panel.styles.fill', value: '#222' },

      { path: 'axes.styles.stroke', value: 'white' },
      { path: 'axes.xAxis.stroke', value: 'white' },
      { path: 'axes.yAxis.stroke', value: 'white' },
      { path: 'axes.yRightAxis.stroke', value: 'white' },
      //
      { path: 'axes.xAxis.label.fill', value: 'white' },
      { path: 'axes.yAxis.label.fill', value: 'white' },
      { path: 'axes.yRightAxis.label.fill', value: 'white' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'titles.1.styles.fill', value: '#aaa' },
      { path: 'titles.2.styles.fill', value: '#aaa' }
    ]
  },

  'dark 3': {
    desc: 'dark background version 3',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'dark' },
      { path: 'styles.background', value: '#222' },
      { path: 'panel.styles.fill', value: 'black' },

      { path: 'axes.styles.stroke', value: 'white' },
      { path: 'axes.xAxis.stroke', value: 'white' },
      { path: 'axes.yAxis.stroke', value: 'white' },
      { path: 'axes.yRightAxis.stroke', value: 'white' },
      //
      { path: 'axes.xAxis.label.fill', value: 'white' },
      { path: 'axes.yAxis.label.fill', value: 'white' },
      { path: 'axes.yRightAxis.label.fill', value: 'white' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'titles.1.styles.fill', value: '#aaa' },
      { path: 'titles.2.styles.fill', value: '#aaa' }
    ]
  },

  'blue 1': {
    desc: 'dark blue background version 1',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'green 1' },
      { path: 'styles.background', value: '#384679' },
      { path: 'panel.styles.fill', value: '#33333d' },

      { path: 'axes.styles.stroke', value: '#c2c2c5' },
      { path: 'axes.xAxis.stroke', value: '#373740' },
      { path: 'axes.yAxis.stroke', value: '#c2c2c5' },
      { path: 'axes.yRightAxis.stroke', value: '#373740' },
      //
      { path: 'axes.xAxis.label.fill', value: '#c2c2c5' },
      { path: 'axes.yAxis.label.fill', value: '#c2c2c5' },
      { path: 'axes.yRightAxis.label.fill', value: '#c2c2c5' },
      { path: 'axes.grids.horizontal.stroke', value: '#444' },
      { path: 'axes.grids.vertical.stroke', value: '#444' },
      { path: 'titles.1.styles.fill', value: '#c2c2c5' },
      { path: 'titles.2.styles.fill', value: '#c2c2c5' }
    ]
  },

  'blue 2': {
    desc: 'dark blue background version 2',
    sampleData: {},
    colors: {
      background: '#121c43',
      panel: '#004c87',
      axisText: '#f4f4f5',
      grids: '#444'
    },
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'styles.background', value: '{background}' },
      { path: 'panel.styles.fill', value: '{panel}' },

      { path: 'axes.styles.stroke', value: '{axisText}' },
      { path: 'axes.xAxis.label.fill', value: '{axisText}' },
      { path: 'axes.yAxis.label.fill', value: '{axisText}' },
      { path: 'axes.yRightAxis.label.fill', value: '{axisText}' },
      { path: 'axes.grids.horizontal.stroke', value: '{grids}' },
      { path: 'axes.grids.vertical.stroke', value: '{grids}' },
      { path: 'titles.1.styles.fill', value: '#dfdfe1' },
      { path: 'titles.2.styles.fill', value: '#dfdfe1' },

      { path: 'pie.labels.styles.fill', value: '{axisText}' }
    ]
  },

  'material design 1': {
    desc: 'using Material Design palette',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'styles.background', value: '#018786' },
      { path: 'panel.styles.fill', value: '#121c43' },

      { path: 'axes.styles.stroke', value: '#8eacbb' },
      { path: 'axes.xAxis.stroke', value: '#8eacbb' },
      { path: 'axes.yAxis.stroke', value: '#fff' },
      { path: 'axes.yRightAxis.stroke', value: '#fff' },
      //
      { path: 'axes.xAxis.label.fill', value: '#8eacbb' },
      { path: 'axes.yAxis.label.fill', value: '#8eacbb' },
      { path: 'axes.yRightAxis.label.fill', value: '#ff#03dac6f' },
      { path: 'axes.grids.horizontal.stroke', value: '#121c43' },
      { path: 'axes.grids.vertical.stroke', value: '#121c43' },
      { path: 'titles.1.styles.fill', value: '#8eacbb' },
      { path: 'titles.2.styles.fill', value: '#8eacbb' },
      { path: 'data.path.strokeWidth', value: 4.0 },

      { path: 'pie.labels.styles.fill', value: '#121c43' }
    ]
  },

  'material design 2': {
    desc: 'using Material Design palette',
    sampleData: {},
    colors: {
      primary: '#2196F3',
      secondary: '#1976D2',
      tertiary: '#EF5350',
      textLight: '#fff',
      textDark: '#000'
    },
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'styles.background', value: '#FFF' },
      // { path: 'panel.styles.fill', value: '{primary}' },
      { path: 'panel.topPanel.styles.fill', value: '{secondary}' },
      { path: 'panel.rightPanel.styles.fill', value: '#ededed' },
      { path: 'panel.leftPanel.styles.fill', value: '#ededed' },
      { path: 'panel.bottomPanel.styles.fill', value: '#ededed' },

      { path: 'axes.styles.stroke', value: '{textDark}' },
      { path: 'axes.xAxis.stroke', value: '{textDark}' },
      { path: 'axes.yAxis.stroke', value: '{textDark}' },
      { path: 'axes.yRightAxis.stroke', value: '{textLight}' },
      //
      { path: 'axes.xAxis.label.fill', value: '{textDark}' },
      { path: 'axes.yAxis.label.fill', value: '{textDark}' },
      { path: 'axes.yRightAxis.label.fill', value: '{textDark}' },
      { path: 'axes.grids.horizontal.stroke', value: '#ddd' },
      { path: 'axes.grids.vertical.stroke', value: '#ddd' },
      { path: 'titles.1.styles.fill', value: '{textLight}' },
      { path: 'titles.2.styles.fill', value: '{textLight}' },
      { path: 'data.path.strokeWidth', value: 4.0 },

      // for pie
      { path: 'pie.labels.styles.fill', value: '{textDark}' },
      { path: 'pie.labels.styles.fontWeight', value: 400 }
    ]
  },

  'material design 3': {
    desc: 'using Mat Design palette with dots',
    colors: {
      primary: '#2196F3',
      secondary: '#1976D2',
      tertiary: '#EF5350',
      textLight: '#fff',
      textDark: '#000'
    },
    sampleData: {
      'date-line-plot': 'ts3'
    },
    excluded: ['pie-plot'],
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'styles.background', value: '#FFF' },
      // { path: 'panel.styles.fill', value: '{primary}' },
      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'panel.topPanel.styles.fill', value: '{secondary}' },
      { path: 'panel.rightPanel.styles.fill', value: '#ededed' },
      { path: 'panel.leftPanel.styles.fill', value: '#ededed' },
      { path: 'panel.bottomPanel.styles.fill', value: '#ededed' },

      { path: 'axes.styles.stroke', value: '{textDark}' },
      { path: 'axes.xAxis.stroke', value: '{textDark}' },
      { path: 'axes.yAxis.stroke', value: '{textDark}' },
      { path: 'axes.yRightAxis.stroke', value: '{textLight}' },
      //
      { path: 'axes.xAxis.label.fill', value: '{textDark}' },
      { path: 'axes.yAxis.label.fill', value: '{textDark}' },
      { path: 'axes.yRightAxis.label.fill', value: '{textDark}' },
      { path: 'axes.grids.horizontal.stroke', value: '#ddd' },
      { path: 'axes.grids.vertical.stroke', value: '#ddd' },
      { path: 'titles.1.styles.fill', value: '{textLight}' },
      { path: 'titles.2.styles.fill', value: '{textLight}' },
      { path: 'data.path.strokeWidth', value: 2.0 },
      { path: 'data.path.dots.useDots', value: true },
      { path: 'data.path.dots.radius', value: 3.5 },
      // for pie
      { path: 'pie.labels.styles.fill', value: '{textDark}' },
      { path: 'pie.labels.styles.fontWeight', value: 400 }
    ]
  },

  'simplified 1': {
    desc: 'stripping out detail',
    colors: {},
    sampleData: {
      'date-line-plot': 'ts3'
    },
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'panel.coords.left', value: 1 },
      { path: 'panel.coords.right', value: 0 },
      {
        path: 'panel.coordMods',
        value: {
          top: 1.0,
          right: 0.5,
          left: 0.5,
          bottom: 0.38
        }
      },

      { path: 'panel1.bottom.min', value: 1 },
      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'axes.yAxis.label.text', value: '' },
      { path: 'axes.xAxis.label.text', value: 'none' },
      { path: 'axes.xAxis.show', value: false },
      { path: 'axes.yAxis.show', value: false },
      { path: 'data.path.strokeWidth', value: 4.0 },
      { path: 'data.path.dots.useDots', value: true },

      { path: 'pie.slices.innerRadius', value: 0.0 },
      { path: 'pie.slices.padAngle', value: 0.0 },
      { path: 'pie.slices.cornerRadius', value: 10 },
      { path: 'pie.labels.useLabels', value: false }
    ]
  },

  'simplified 1a': {
    desc: 'stripping out detail, thick lines on line charts',
    colors: {},
    sampleData: {
      'date-line-plot': 'ts4'
    },

    mods: [
      { path: 'name', value: 'blue 2' },
      {
        path: 'titles.2',
        value: {
          text: 'stripping out detail, thick lines on line charts',
          y: '75%',
          x: '10',
          'text-anchor': 'left'
        }
      },
      { path: 'panel.coords.left', value: 1 },
      { path: 'panel.coords.right', value: 0 },
      {
        path: 'panel.coordMods',
        value: {
          top: 1.0,
          right: 0.5,
          left: 0.5,
          bottom: 0.38
        }
      },

      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'axes.yAxis.label.text', value: '' },
      { path: 'axes.xAxis.label.text', value: 'none' },
      { path: 'axes.xAxis.show', value: false },
      { path: 'axes.yAxis.show', value: false },
      { path: 'data.path.strokeWidth', value: 15.0 },
      { path: 'data.path.opacity', value: 0.50 },
      { path: 'data.path.dots.useDots', value: true },
      { path: 'data.path.dots.useStroke', value: true },
      { path: 'data.path.dots.useFill', value: true },
      { path: 'data.path.dots.radius', value: 14 },

      { path: 'pie.slices.innerRadius', value: 0.0 },
      { path: 'pie.slices.padAngle', value: 0.02 },
      { path: 'pie.slices.cornerRadius', value: 10 },
      { path: 'pie.labels.useLabels', value: false }
    ]
  },

  'simplified 1b': {
    desc: 'showing title placement control',
    colors: {},
    sampleData: {
      'date-line-plot': 'ts4'
    },
    mods: [
      { path: 'name', value: 'blue 2' },
      { path: 'titles.1.text', value: 'Left Main Title' },
      { path: 'titles.1.x', value: '15' },
      { path: 'titles.1.y', value: '42%' },
      { path: 'titles.1.text-anchor', value: 'left' },
      { path: 'titles.2.text', value: 'right secondary title' },
      { path: 'titles.2.x', value: '85%' },
      { path: 'titles.2.y', value: '30%' },
      { path: 'titles.2.text-anchor', value: 'middle' },
      { path: 'titles.3', value: {} },
      { path: 'titles.3.text', value: 'something in the middle' },
      { path: 'titles.3.x', value: '50%' },
      { path: 'titles.3.y', value: '75%' },
      { path: 'titles.3.styles', value: {} },
      { path: 'titles.3.styles.fontSize', value: 14 },
      { path: 'titles.3.styles.fill', value: '#222' },

      { path: 'panel.coords.left', value: 1 },
      { path: 'panel.coords.right', value: 0 },
      {
        path: 'panel.coordMods',
        value: {
          top: 1.0,
          right: 0.5,
          left: 0.5,
          bottom: 0.38
        }
      },

      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'axes.yAxis.label.text', value: '' },
      { path: 'axes.xAxis.label.text', value: 'none' },
      { path: 'axes.xAxis.show', value: false },
      { path: 'axes.yAxis.show', value: false },
      { path: 'data.path.strokeWidth', value: 15.0 },
      { path: 'data.path.opacity', value: 0.50 },
      { path: 'data.path.dots.useDots', value: true },
      { path: 'data.path.dots.useStroke', value: true },
      { path: 'data.path.dots.useFill', value: true },
      { path: 'data.path.dots.radius', value: 14 },

      { path: 'pie.slices.innerRadius', value: 0.0 },
      { path: 'pie.slices.padAngle', value: 0.02 },
      { path: 'pie.slices.cornerRadius', value: 10 },
      { path: 'pie.labels.useLabels', value: false }
    ]
  },

  'simplified 2': {
    desc: 'stripping out detail',
    colors: {},
    sampleData: {
      'date-line-plot': 'ts3',
      'labeled-data-plot': 'labeled1'
    },
    mods: [
      { path: 'name', value: 'simplified 2' },
      {
        path: 'panel.coordMods',
        value: {
          top: 1.0,
          right: 0.5,
          left: 0.5,
          bottom: 0.38
        }
      },

      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'axes.yAxis.label.text', value: '' },
      { path: 'axes.xAxis.label.text', value: 'none' },
      { path: 'axes.xAxis.show', value: false },
      { path: 'axes.yAxis.show', value: false },
      { path: 'data.path.strokeWidth', value: 4.0 },
      { path: 'data.path.dots.useDots', value: true },
      { path: 'data.path.dots.useStroke', value: true },
      { path: 'data.path.dots.useFill', value: false },
      { path: 'data.path.dots.strokeWidth', value: 4 },
      { path: 'data.path.dots.radius', value: 7 },

      { path: 'pie.slices.innerRadius', value: 0.0 },
      { path: 'pie.slices.padAngle', value: 0.00 },
      { path: 'pie.slices.cornerRadius', value: 0 },
      { path: 'pie.labels.useLabels', value: false }
    ]
  },

  'simplified 3': {
    desc: 'only dots',
    colors: {},
    sampleData: {
      'date-line-plot': 'ts3'
    },
    excluded: ['pie-plot'],
    mods: [
      { path: 'name', value: 'simplified 3' },
      {
        path: 'panel.coordMods',
        value: {
          top: 1.0,
          right: 0.5,
          left: 0.5,
          bottom: 0.38
        }
      },

      { path: 'axes.yAxis.scaleFactor', value: 0.005 },
      { path: 'axes.yAxis.label.text', value: '' },
      { path: 'axes.xAxis.label.text', value: 'none' },
      { path: 'axes.xAxis.show', value: false },
      { path: 'axes.yAxis.show', value: false },
      { path: 'data.path.useLines', value: false },
      { path: 'data.path.strokeWidth', value: 4.0 },
      { path: 'data.path.dots.useDots', value: true },
      { path: 'data.path.dots.useStroke', value: true },
      { path: 'data.path.dots.useFill', value: true },
      { path: 'data.path.dots.strokeWidth', value: 4 },
      { path: 'data.path.dots.radius', value: 4 },

      { path: 'pie.labels.useLabels', value: false }
    ]
  },

  generic: {
    desc: 'mostly white',
    sampleData: {},
    colors: {},
    mods: [
      { path: 'name', value: 'plain' },
      { path: 'styles.background', value: '#FFF' },
      { path: 'panel.styles.fill', value: '#FFF' },

      { path: 'axes.styles.stroke-width', value: 1.0 },
      { path: 'axes.xAxis.styles.fill', value: 'black' },
      { path: 'axes.yAxis.styles.fill', value: 'black' },
      { path: 'axes.yAxis.styles.stroke-width', value: 1.0 },
      { path: 'axes.yRightAxis.styles.fill', value: 'black' },

      { path: 'axes.xAxis.stroke', value: 'black' },
      { path: 'axes.yAxis.stroke', value: 'black' },
      { path: 'axes.yRightAxis.stroke', value: 'black' },

      { path: 'axes.xAxis.label.fill', value: 'black' },
      { path: 'axes.yAxis.label.fill', value: 'black' },
      { path: 'axes.yRightAxis.label.fill', value: 'black' },
      { path: 'titles.1.styles.fill', value: 'black' },
      { path: 'titles.2.styles.fill', value: 'black' },
      { path: 'data.path.strokeWidth', value: 4.0 },
      // for pie
      { path: 'pie.labels.styles.fill', value: '{textDark}' },
      { path: 'pie.labels.styles.fontWeight', value: 400 }
    ]
  }
}

export default mods
