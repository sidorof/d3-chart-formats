import data from './data'
import axes from './axes'

class DefaultTheme {
  constructor ({ axes, data }) {
    this.name = 'default'
    this.styles = { background: '#000' }
    this.className = 'chart'

    this.axes = axes
    this.data = data

    this.panel1 = {
      heightRange: { max: 300, min: 200 },
      widthRange: { max: 250, min: 200 },
      top: { max: 70, min: 20, scale: 'byHeight' }, // scale not functional
      bottom: { max: 70, min: 20, scale: 'byHeight' },
      right: { max: 60, min: 20, scale: 'byWidth' },
      left: { max: 60, min: 20, scale: 'byWidth' },
      className: 'panel',
      styles: {
        fill: '#ccc'
      }
    }
    this.panel = {
      top: 60,
      bottom: 70,
      right: 60,
      left: 60,
      className: 'panel',
      styles: {
        fill: '#ccc'
      }
    }

    this.margin = { top: 0.0, right: 0.0, bottom: 0.0, left: 0.0 }

    this.title = {
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
    }

    this.legend = {
      useLegend: true,
      className: 'legend',
      dotRadius: 7,
      colorPadWidth: 13,
      width: '30%',
      top: 0,
      left: 0,
      useRect: true,
      rect: {
        stroke: '#cc',
        strokeWidth: 1.0,
        fill: 'none',
        opacity: 0.2
      }
    }
  }
}

export default new DefaultTheme({
  data: data,
  axes: axes
})
