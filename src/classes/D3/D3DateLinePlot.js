// classes/D3/D3DateLinePlot.js
/* D3DateLinePlot
 *
 * This class builds on D3Plot, adding
 *  axes
 *  time series lines
 *  legend
 *
 *  mouseovers
 *  frequency control
 *  dot labels
 *
 */

import { D3Plot } from '@/classes/D3/D3Plot'

export class D3DateLinePlot extends D3Plot {
  constructor (payload) {
    super(payload)

    this.ts = null
  }

  buildChart = (svg, height, width) => {
    this.addPanels(svg, height, width)
    this.addTitles(svg, height, width)

    // axes
    // lines
    //    dot labels?
    // legend
    // mouseovers
    // frequency control
  }
}
