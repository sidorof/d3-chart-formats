/*
 * draw_title.js
 *
 * This version uses the new version of chart params
 *
 * NOTE: createTranslate should be moved to a library
 */
import { createTranslate } from '@/lib/graph_library'

export default (vm, svg) => {
  const title = vm.chartParams.title

  if (title.text !== null || title.text !== undefined) {
    svg.append('text')
      .attr('class', 'title')
      .attr('fill', title.fill)
      // this does not work
      .attr('font-size', title.fontSize)
      .attr(
        'transform',
        createTranslate(
          (vm.plotWidth / 2) + vm.leftOffset,
          vm.topOffset * 0.5
        )
      )
      .attr('text-anchor', 'middle')
      .text(title.text)
  }
}
