/* pie variables
 *
 * controllable elements:
 * segment lines
 * dimensions
 *  size of pie
 *  placement of pie
 *  size of inner radius
 *  curvature of edges
 *  space between slices
 *
 * use of pointer lines
 * placement of legend
 * style of polylines, if any
 */
const pie = {
  styles: {
    stroke: '#000',
    strokeWidth: 0.5,
    fontWeight: 100,
    opacity: 0.4
  },

  panel: {
    // percent reduction of panel size passed through
    //   since no axes
    coordMods: {
      top: 1.0,
      right: 0.5,
      left: 0.5,
      bottom: 0.38
    }
  },

  pieDimensions: {
    diameter: 0.55,
    centerOffset: {
      top: 0,
      left: 0
    }
  },

  slices: {
    outerRadius: 0.75,
    innerRadius: 0.4,
    padAngle: 0.01,
    cornerRadius: 4,
    className: 'slices'
  },

  pointerLines: {
    usePointerLines: true,
    className: 'polylines',
    middleArc: {
      innerRadius: 0.68,
      outerRadius: 0.68
    },
    outerArc: {
      innerRadius: 0.75,
      outerRadius: 0.85
    },
    // alternate placements of percent labels
    percentAArc: {
      innerRadius: 0.6,
      outerRadius: 0.6
    },
    percentBArc: {
      innerRadius: 0.5,
      outerRadius: 0.5
    },
    styles: {
      fill: 'none',
      stroke: '#999',
      strokeWidth: '1.5px'
    }
  },
  labels: {
    useLabels: true,
    className: 'labels',
    styles: {
      fontSize: '13px',
      fill: 'white'
    },
    percents: {
      styles: {
        fontSize: '15px',
        fontWeight: 700,
        fill: '#000'
      }
    }
  }
}

export default pie
