import TSS from './TSS.class'
/* Assumes useage:
 * Format is slightly different from Thymus.timeeries.as_json():
 * header is not used. Instead, assumed format is:
 *  payload.ticker
 *  payload.frequency
 *  payload.dateRange that is
 *    {
 *       endDate: null,
 *       startDate: null
 *     }
 *   payload.data that is
 *     {
 *       date1: [value1, value2],
 *       date2: [value1, value2]
 *     }
 *
 *  This is the format that is used from store:prices:selectedPrices
 *
 * However: it also checks for header, just in case it is a straight
 * import from json and converts as well.
 *
 * if exporting directly from ftseries.timeseries use:
 *  ts.to_json(dt_fmt=str, data_list=False))
 *  That results in string dates are used as keys
 */
export default class TS {
  constructor (payload) {
    if (payload === undefined) {
      this.ticker = null
      this.frequency = null
      this.dateRange = {
        endDate: null,
        startDate: null
      }
      this.columns = []
      this.data = {}
    } else {
      if (payload.header === undefined) {
        this.ticker = payload.ticker
        this.frequency = payload.frequency
        this.dateRange = payload.dateRange

        // could move this to a _function
        if (payload.columns.length > 0 && payload.columns[0] === 'pdate') {
          this.columns = payload.columns.slice(1)
        } else {
          this.columns = payload.columns
        }
      } else {
        this.ticker = payload.header.ticker
        this.frequency = payload.header.frequency
        this.dateRange = payload.header.dateRange

        if (payload.header.columns.length > 0 && payload.header.columns[0] === 'pdate') {
          this.columns = payload.header.columns.slice(1)
        } else {
          this.columns = payload.header.columns
        }
      }
    }
    this.data = Object.assign({}, payload.data)

    if (this.dateRange === undefined) {
      this.dateRange = {
        endDate: this.endDate(),
        startDate: this.startDate()
      }
    }
  }

  withColumnObj = function () {
    var allData = []

    const dates = Object.keys(this.data)
    dates.sort()
    for (var idx = 0; idx < dates.length; idx++) {
      const date = dates[idx]
      var dataItem = { date: date }
      const values = this.data[date]

      for (var i = 0; i < this.columns.length; i++) {
        dataItem[this.columns[i]] = values[i]
      }
      allData.push(dataItem)
    }
    return allData
  }

  withDateValues = function () {
    var allData = []

    const dates = Object.keys(this.data)
    dates.sort()
    for (var idx = 0; idx < dates.length; idx++) {
      const date = dates[idx]
      var dataItem = { date: date, values: this.data[date] }
      allData.push(dataItem)
    }
    return allData
  }

  startDate = function () {
    var startDate = null
    for (const date in this.data) {
      if (startDate === null) {
        startDate = date
      } else {
        if (startDate > date) {
          startDate = date
        }
      }
    }
    return startDate
  }

  startValue = function () {
    // returns array at date
    return this.data[this.startDate()]
  }

  minValue = function (columns) {
    var minValue = null
    for (const date in this.data) {
      for (var i = 0; i < this.data[date].length; i++) {
        const tsValue = this.data[date][i]
        var status = true
        if (columns !== undefined) {
          status = columns.incudes(i)
        }
        if (status) {
          if (minValue === null) {
            minValue = tsValue
          } else {
            if (minValue > tsValue) {
              minValue = tsValue
            }
          }
        }
      }
    }
    return minValue
  }

  endDate = function () {
    var endDate = null
    for (const date in this.data) {
      if (endDate === null) {
        endDate = date
      } else {
        if (endDate < date) {
          endDate = date
        }
      }
    }
    return endDate
  }

  endValue = function () {
    // returns array at date
    return this.data[this.endDate()]
  }

  maxValue = function (columns) {
    var maxValue = null
    for (const date in this.data) {
      for (var i = 0; i < this.data[date].length; i++) {
        const tsValue = this.data[date][i]
        var status = true
        if (columns !== undefined) {
          status = columns.incudes(i)
        }
        if (status) {
          if (maxValue === null) {
            maxValue = tsValue
          } else {
            if (maxValue < tsValue) {
              maxValue = tsValue
            }
          }
        }
      }
    }
    return maxValue
  }

  closestDate = function (date) {
    const dates = Object.keys(this.data).sort()
    const objDate = new Date(date)
    var prevDate = null
    for (var i = 0; i < dates.length; i++) {
      const date1 = dates[i]
      if (date < date1) {
        var closeDate = new Date(date1)
        prevDate = new Date(prevDate)
        if (Math.abs(closeDate - objDate > Math.abs(prevDate - objDate))) {
          return prevDate.toISOString().substr(0, 10)
        } else {
          return closeDate.toISOString().substr(0, 10)
        }
      } else {
        prevDate = date1
      }
    }
  }

  combine = function (payload) {
    /* combine time series together into one
     *
     * tss is either ts or tss
     *
     * if discard is undefined or true
     *  there must be a date in all timeseries or it is dropped
     * if discard is false
     *  if one timeseries does not have a date a pad value is inserted
     *
     */
    var tss
    var discard
    var pad
    if (payload !== undefined) {
      tss = payload.tss
      discard = payload.discard
      pad = payload.pad
    }
    if (discard === undefined) {
      discard = true
    } // error checking here

    if (pad === undefined) {
      pad = null
    }

    // var baseTs = this.clone()
    var baseTs = this.clone()

    if (tss instanceof TSS) {
      for (const key in tss) {
        const ts = tss[key]
        baseTs = this._combineTs(baseTs, ts, discard, pad)
      }
    } else if (tss instanceof TS) {
      baseTs = this._combineTs(baseTs, tss.clone(), discard, pad)
    }
    return baseTs
  }

  _combineTs = function (baseTs, ts, discard, pad) {
    for (const date in baseTs.data) {
      var values = ts.data[date]
      if (values === undefined) {
        if (discard) {
          delete baseTs.data[date]
        } else {
          for (var colNbr = 0; colNbr < ts.columns.length; colNbr++) {
            baseTs.data[date].push(pad)
          }
          // something peculiar here. ts.data is becoming modified
          // console.log(
          //   '_combineTs: completed padding date', date, baseTs.data[date])
          // console.log(
          //   '_combineTs: completed ts', ts)
        }
      } else {
        baseTs.data[date] = baseTs.data[date].concat(values.slice())
      }
    }
    for (const date in ts.data) {
      if (baseTs.data[date] === undefined) {
        if (discard) {
          delete baseTs.data[date]
        } else {
          baseTs.data[date] = []
          for (colNbr = 0; colNbr < baseTs.columns.length; colNbr++) {
            baseTs.data[date].push(pad)
          }
          baseTs.data[date] = baseTs.data[date].concat(ts.data[date].slice())
        }
      }
    }
    return baseTs
  }

  clone = function () {
    var newTs = new TS()
    const names = Object.getOwnPropertyNames(this)
    for (var i = 0; i < names.length; i++) {
      const name = names[i]
      const contents = this[name]
      if (contents instanceof Object && contents instanceof Array) {
        newTs[name] = contents
      } else if (typeof contents === 'function') {
        newTs[name] = contents
      } else if (contents instanceof Object) {
        newTs[name] = Object.assign({}, contents)
      } else {
        newTs[name] = contents
      }
    }
    return newTs
  }

  isEmpty = function () {
    return Object.entries(this.data).length === 0
  }
}
