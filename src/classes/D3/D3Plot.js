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
import { svgText } from './svgText'

import { D3Base } from '@/classes/D3/D3Base'

export class D3Plot extends D3Base {
  constructor ({ panel, titles, ...otherPayload }) {
    super(otherPayload)

    const dfltPanel = {
      top: 30, bottom: 0, right: 0, left: 0, styles: {} }

    this.panel = { ...dfltPanel, ...panel }

    //   top: panel.top !== undefined ? panel.top : 30,
    //   bottom: panel.bottom !== undefined ? panel.bottom : 0,
    //   right: panel.right !== undefined ? panel.right : 0,
    //   left: panel.left !== undefined ? panel.left : 0,
    //   styles: panel.styles !== undefined ? panel.styles : {},
    //   className: panel.className !== undefined ? panel.className : null
    // }

    this.titles = titles !== undefined ? titles : []
  }

  buildChart = (svg, height, width) => {
    this.addPanels(svg, height, width)
    this.addTitles(svg, height, width)
  }

  addPanels = (svg, height, width) => {
    const panel = this.panel
    console.log('panel', panel)
    if (panel.top) {
      console.log('panel.top')
      this.addRect({
        svg: svg,
        top: 0,
        left: 0,
        className: panel.className,
        styles: this.panel.styles,
        width: width,
        height: panel.top
      })
      console.log('finished panel.top')
    }

    if (panel.left) {
      console.log('panel.left')
      this.addRect({
        svg: svg,
        top: panel.top,
        left: 0,
        className: panel.className,
        styles: panel.styles,
        width: panel.left,
        height: height - panel.top - panel.bottom
      })
    }

    if (panel.right) {
      console.log('panel.right')
      console.log('panel.styles', panel.styles)
      this.addRect({
        svg: svg,
        top: panel.top,
        // some reason: need to offset more
        left: width - panel.right, // * 1.5 + 4,
        className: panel.className,
        styles: panel.styles,
        width: panel.right,
        height: height - panel.top - panel.bottom
      })
    }

    if (panel.bottom) {
      console.log('panel.bottom')
      this.addRect({
        svg: svg,
        top: height - panel.bottom,
        left: 0,
        className: panel.className,
        styles: panel.styles,
        width: width,
        height: panel.bottom
      })
    }
  }

  createTranslate (leftValues, topValues) {
    // for positioning using the svg translate function
    // doesn't implement rotations, skew, scale
    const prefix = 'translate('
    return prefix + leftValues + ', ' + topValues + ')'
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

  addTitles = (svg) => {
    svgText(svg, this.titles)
  }
}
