const data = {
  path: {
    className: 'series',
    useLines: true,
    strokeWidth: 2.0,
    dots: {
      // colors derive from color scale
      useDots: false,
      useStroke: false,
      useFill: true,
      radius: 8,
      label: {
        rectangle: {
          className: 'spotBox',
          rectMarginX: 15,
          rectMarginY: 30,
          rectStroke: '#333',
          rectStrokeWidth: '0.5',
          rectFill: 'white',
          rectFillOpacity: '0.5',
          rectRx: '8',
          rectRy: '8',
          rectWidth: '100'
        },
        item: {
          textHeight: 20,
          textClass: 'spotLabel',
          textFill: 'darkblue',
          textAnchor: 'center-align',
          fontFamily: 'Arial',
          fontSize: '13px' // fontSize vs font-size
        }
      },
      mouseover: {
        labelWidth: 100
      }
    }
  }
}

export default data
