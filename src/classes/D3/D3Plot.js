// classes/D3/D3Plot.js
/* D3Plot
 *
 * This class defines:
 *    panels are used
 *    titles
 *
 * A panel is defined by the number of pixels away from the panel.
 * For example, if panel.coords.top = 40, then after the top panel is
 * calculated, the panel extends down 40 more pixels.
 *
 * The point of it is to be able to define an area where such things
 * as titles or axes or legends go.
 *
 * panel: { top, right, bottom, left}
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
      coords: { top: 30, bottom: 0, right: 0, left: 0 },
      styles: {}
    }

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
    // const panel = { ...this.panel }
    const panel = JSON.parse(JSON.stringify(this.panel))
    const panel1 = this.panel1

    if (height > panel1.heightRange.max) {
      panel.coords.top = panel1.top.max
      panel.coords.bottom = panel1.bottom.max
    } else if (height < panel1.heightRange.min) {
      panel.coords.top = panel1.top.min
      panel.coords.bottom = panel1.bottom.min
    } else {
      // (height - 200) / (300 - 200) * (70 - 20) + 20 = x
      panel.coords.top = calcProportion(
        height,
        panel1.heightRange,
        { max: panel1.top.max, min: panel1.top.min }
      )

      panel.coords.bottom = calcProportion(
        height,
        panel1.heightRange,
        { max: panel1.bottom.max, min: panel1.bottom.min }
      )
    }

    if (this.panel.coordMods !== undefined) {
      panel.coords.top *= panel.coordMods.top
      panel.coords.left *= panel.coordMods.left
      panel.coords.right *= panel.coordMods.right
      panel.coords.bottom *= panel.coordMods.bottom
    }

    panel.styles = { ...panel1.styles, ...panel.styles }
    panel.className = panel1.className
    this.panel = panel
    return panel
  }

  addPanels = (svg, height, width) => {
    const panel = this.panelCoords(height, width)
    if (panel.coords.top) {
      this.addRect({
        svg: svg,
        top: 0,
        left: 0,
        className: panel.className,
        styles: { ...panel.styles, ...panel.topPanel.styles },
        width: width,
        height: panel.coords.top > 0
          ? panel.coords.top
          : 1
      })
    }

    if (panel.coords.left) {
      this.addRect({
        svg: svg,
        top: panel.coords.top - 1,
        left: 0,
        className: panel.className,
        styles: { ...panel.styles, ...panel.leftPanel.styles },
        width: panel.coords.left,
        height: height - panel.coords.top - panel.coords.bottom > 0
          ? height - panel.coords.top - panel.coords.bottom + 2 // why +2
          : 1
      })
    }

    if (panel.coords.right) {
      this.addRect({
        svg: svg,
        top: panel.coords.top - 1,
        left: width - panel.coords.right,
        className: panel.className,
        styles: { ...panel.styles, ...panel.rightPanel.styles },
        width: panel.coords.right,
        height: height - panel.coords.top - panel.coords.bottom > 0
          ? height - panel.coords.top - panel.coords.bottom + 2
          : 1
      })
    }

    if (panel.coords.bottom) {
      this.addRect({
        svg: svg,
        top: height - panel.coords.bottom,
        left: 0,
        className: panel.className,
        styles: { ...panel.styles, ...panel.bottomPanel.styles },
        width: width,
        height: panel.coords.bottom > 0
          ? panel.coords.bottom
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
      if (title !== undefined) {
        if (title.y.endsWith('%')) {
          title.y = this.panel.coords.top * title.y.slice(0, -1) / 100
        }
        // this portion applies to scaling font-size up or down
        const scaleBasis = {
          value: height, ...this.panel1.heightRange
        }
        svgText(svg, title, scaleBasis)
      }
    }
  }
}
