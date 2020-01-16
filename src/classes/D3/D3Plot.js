// classes/D3/D3Plot.js
/* D3Plot
 *
 * This class defines:
 *    panels are used
 *    titles
 *
 * A panel is defined by the number of pixels away from the panel.
 * For example, if panel.top = 40, then after the top panel is
 * calculated, the panel extends down 40 more pixels.
 *
 * The point of it is to be able to define an area where such things
 * as titles or axes or legends go.
 *
 * panel: { top, right, bottom, left}
 *
 * NOTE: it might make sense to put color in this as well. It would
 * need to take into a account that color might be different in various
 * areas of the panels.
 *
 * Here is a minimal chartParams:
 * chartParams: {
 *   styles: [['background', '#9a9a9a']],
 *   className: 'chart',
 *   panel: {                  see how styles apply to all panels
 *     top: 60,
 *     bottom: 40,
 *     right: 40,
 *     left: 40,
 *     className: 'panel',
 *     styles: [
 *       ['fill', 'blue'],
 *       ['stroke', 'green']
 *     ]
 *   },
 *   margin: { top: 0.0, right: 0.0, bottom: 0.0, left: 0.0 },
 *   titles: [                  text has default of
 *                                'text-anchor', 'middle'
 *                                but just override
 *     {
 *       text: 'My Title Here',
 *       x: '50%',
 *       y: 25,
 *       styles: [
 *         ['font-size', 24]
 *       ]
 *     },
 *     {
 *       text: 'Whoa! subtitles',
 *       x: '50%',
 *       y: 45,
 *       styles: [
 *         ['font-size', 14]
 *       ]
 *     }
 *   ]
 * }
 *
 * So this is the plot prototype which is extended to
 *   line charts
 *   date-line charts
 *   network diagrams
 *   etc.
 *
 */
// combine these
import { calcProportion } from '@/lib/D3/utils'
import { svgText } from './svgText'

import { D3Base } from '@/classes/D3/D3Base'

export class D3Plot extends D3Base {
  constructor ({ panel, panel1, titles, ...otherPayload }) {
    super(otherPayload)

    const dfltPanel = {
      top: 30, bottom: 0, right: 0, left: 0, styles: {} }

    this.panel = { ...dfltPanel, ...panel }
    this.panel1 = panel1 // change this name
    this.titles = titles !== undefined ? titles : []
  }

  buildChart = (svg, height, width) => {
    height = Math.round(height)
    width = Math.round(width)
    this.addPanels(svg, height, width)
    this.addTitles(svg, height, width, this.panel.heightRange)
  }

  panelCoords = (height, width) => {
    const panel = {}
    const panel1 = this.panel1

    if (height > panel1.heightRange.max) {
      panel.top = panel1.top.max
      panel.bottom = panel1.bottom.max
    } else if (height < panel1.heightRange.min) {
      panel.top = panel1.top.min
      panel.bottom = panel1.bottom.min
    } else {
      // (height - 200) / (300 - 200) * (70 - 20) + 20 = x
      panel.top = calcProportion(
        height,
        panel1.heightRange,
        { max: panel1.top.max, min: panel1.top.min }
      )

      panel.bottom = calcProportion(
        height,
        panel1.heightRange,
        { max: panel1.bottom.max, min: panel1.bottom.min }
      )
    }

    panel.left = this.panel.left
    panel.right = this.panel.right
    panel.styles = { ...panel1.styles }
    panel.className = panel1.className
    this.panel = panel
    return panel
  }

  addPanels = (svg, height, width) => {
    const panel = this.panelCoords(height, width)
    if (panel.top) {
      this.addRect({
        svg: svg,
        top: 0,
        left: 0,
        className: panel.className,
        styles: this.panel.styles,
        width: width,
        height: panel.top > 0
          ? panel.top
          : 1
      })
    }

    if (panel.left) {
      this.addRect({
        svg: svg,
        top: panel.top - 1,
        left: 0,
        className: panel.className,
        styles: panel.styles,
        width: panel.left,
        height: height - panel.top - panel.bottom > 0
          ? height - panel.top - panel.bottom + 2 // why +2
          : 1
      })
    }

    if (panel.right) {
      this.addRect({
        svg: svg,
        top: panel.top - 1,
        left: width - panel.right,
        className: panel.className,
        styles: panel.styles,
        width: panel.right,
        height: height - panel.top - panel.bottom > 0
          ? height - panel.top - panel.bottom + 2
          : 1
      })
    }

    if (panel.bottom) {
      this.addRect({
        svg: svg,
        top: height - panel.bottom,
        left: 0,
        className: panel.className,
        styles: panel.styles,
        width: width,
        height: panel.bottom > 0
          ? panel.bottom
          : 1
      })
    }
  }

  createTranslate (leftValue, topValue) {
    // for positioning using the svg translate function
    // doesn't implement rotations, skew, scale
    if (leftValue < 0) {
      // console.log('createTranslate:faulty left values', leftValue)
      leftValue = 0
    }
    if (topValue < 0) {
      // console.log('createTranslate:faulty top values', topValue)
      topValue = 0
    }
    const prefix = 'translate('
    return prefix + leftValue + ', ' + topValue + ')'
  }

  // not being used right now
  paddingStyle = (type) => {
    return ''.concat(
      (this.padding.top * 100) + 'px ',
      (this.padding.bottom * 100) + 'px ',
      (this.padding.right * 100) + 'px ',
      (this.padding.left * 100) + 'px'
    )
  }

  addTitles = (svg, height, width) => {
    /*
     use panel range for scaling fonts
     assumes that title go in top panel

     uses top panel coords for y positioning
    */
    for (const lineNo in this.titles) {
      // determine y position
      var title = JSON.parse(JSON.stringify(this.titles[lineNo]))

      if (title.y.endsWith('%')) {
        title.y = this.panel.top * title.y.slice(0, -1) / 100
      }
      // this portion applies to scaling font-size up or down
      const scaleBasis = {
        value: height, ...this.panel1.heightRange
      }
      svgText(svg, title, scaleBasis)
    }
  }
}
