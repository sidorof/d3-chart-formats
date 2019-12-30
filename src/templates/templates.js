
export default () => {
  var chartThemes = {
    dark: {
      plot: {
        size: { width: 500, height: 400 },
        background: '#666666',
        panel: { top: 40, right: 40, bottom: 45, left: 60 },
        margin: { top: 0.01, right: 0.02, bottom: 0.15, left: 0.0 }
      },
      title: {
        use: true,
        text: 'Your title here {{ test }}',
        fill: '#444',
        fontName: null,
        fontSize: '20px',
        background: null
      },

      category: {
        dateLinePlot: {
          series: {
            colorScheme: null,
            lineWidth: 1.0,
            markerSize: '5px',
            opacity: 1.0
          },
          axes: {
            defaults: {
              fill: '#EEE',
              fontWeight: 700,
              fontName: null
            },
            xAxis: {
              use: true,
              ticks: 10,
              label: {
                text: 'Date Range',
                xPosition: 0.4,
                fill: null,
                fontWeight: null,
                fontName: null
              }
            },
            yAxis: {
              use: true,
              ticks: 5,
              label: {
                text: null,
                fill: null,
                fontWeight: null,
                fontName: null
              }
            },
            yRightAxis: {
              use: true,
              ticks: 5,
              label: {
                text: null,
                fill: null,
                fontWeight: null,
                fontName: null
              }
            },
            grids: {
              defaults: {
                stroke: '#EEE',
                strokeWidth: 1,
                opacity: 0.5
              },
              horizontal: {
                use: true,
                stroke: null,
                strokeWidth: null,
                opacity: null
              },
              vertical: {
                use: true,
                stroke: null,
                strokeWidth: null,
                opacity: null
              }
            }
          },
          plotControls: {
            use: true,
            frequency: 1,
            dateRange: {
              startDate: '2013-12-31',
              endDate: '2018-12-31'
            }
          }
        }
      }
    }
  }
}
