export default (vm, svg) => {
  if (vm.title) {
    svg.append('text')
      .attr('class', 'title')
      .attr('fill', '#444')
      .attr(
        'transform',
        vm.createTranslate(
          (vm.plotWidth / 2) + vm.leftOffset,
          vm.topOffset * 0.5
        )
      )
      .attr('text-anchor', 'middle')
      .text(vm.title)
  }
}
