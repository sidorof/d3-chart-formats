
import { TS } from './TS.class'

export class TSS {
  /* counterpart of TssDict */
  constructor (payload) {
    if (payload !== undefined) {
      for (const key in payload) {
        this[key] = payload[key]
      }
    }
  }

  combine = function (payload) {
    /* combine:
     *  keys:
     *    an array of tickers to be combined, in a specific order
     *    if keys are undefined
     *      uses tsKeys()
     *  discard:
     *    true
     *      if the dates do not match up, discarded
     *  pad:
     *    if discard is true
     *      if dates do not match up, padded values are inserted
     *
     *  returns:
     *    TS
     *      columns:
     *        assumes only 1 value per ts
     *        if more than 1 value
     *          ['SPY:padjHigh', 'SPY:padjLow', 'SPY:padjClose']
     *      frequency:
     *        first ts.frequency is used
     *      ticker, key:
     *        undefined for now
     */
    var keys
    var discard
    var pad
    if (payload !== undefined) {
      keys = payload.keys
      discard = payload.discard
      pad = payload.pad
    }
    if (discard === undefined) {
      discard = true
    }

    if (pad === undefined) {
      pad = null
    }

    // if keys then use that order
    if (keys === undefined) {
      keys = this.tsKeys()
    }
    if (keys.length > 0) {
      var newTs = new TS()
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i]
        var ts = this[key]
        if (i === 0) {
          newTs = newTs.combine({ tss: ts, discard: false })
          newTs.frequency = ts.frequency
        } else {
          newTs = newTs.combine({ tss: ts, discard: discard, pad: pad })
        }
        for (var j = 0; j < ts.columns.length; j++) {
          newTs.columns.push(key + ':' + ts.columns[j])
        }
      }
      if (newTs.data[newTs.startDate()].length === keys.length) {
        newTs.columns = keys
      }
      return newTs
    } else {
      return null
    }
  }

  tsKeys = function () {
    const keys = Object.getOwnPropertyNames(this)
    var tsKeys = []
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (this[key] instanceof TS) {
        tsKeys.push(key)
      }
    }
    return tsKeys
  }

  startDate = function () {
    var startDate = null
    const keys = this.tsKeys()
    for (var i = 0; i < keys.length; i++) {
      const ts = this[keys[i]]
      const tsDate = ts.startDate()
      if (startDate === null) {
        startDate = tsDate
      } else {
        if (startDate > tsDate) {
          startDate = tsDate
        }
      }
    }
    return startDate
  }

  minValue = function (columns) {
    var minValue = null
    const keys = this.tsKeys()
    for (var i = 0; i < keys.length; i++) {
      const ts = this[keys[i]]
      const tsValue = ts.minValue(columns)
      if (minValue === null) {
        minValue = tsValue
      } else {
        if (minValue > tsValue) {
          minValue = tsValue
        }
      }
    }
    return minValue
  }

  endDate = function () {
    var endDate = null
    const keys = this.tsKeys()
    for (var i = 0; i < keys.length; i++) {
      const ts = this[keys[i]]
      const tsDate = ts.endDate()
      if (endDate === null) {
        endDate = tsDate
      } else {
        if (endDate < tsDate) {
          endDate = tsDate
        }
      }
    }
    return endDate
  }

  maxValue = function (columns) {
    var maxValue = null
    const keys = this.tsKeys()
    for (var i = 0; i < keys.length; i++) {
      const ts = this[keys[i]]
      const tsValue = ts.maxValue(columns)
      if (maxValue === null) {
        maxValue = tsValue
      } else {
        if (maxValue < tsValue) {
          maxValue = tsValue
        }
      }
    }
    return maxValue
  }

  length = function () {
    return this.tsKeys().length
  }

  maxColumns = function () {
    var maxCols = 0
    const keys = this.tsKeys()
    for (var i = 0; i < keys.length; i++) {
      const ts = this[keys[i]]
      const dates = Object.keys(ts.data)
      // assume all columns the same
      const tsCols = ts.data[dates[0]].length
      if (maxCols < tsCols) {
        maxCols = tsCols
      }
    }
    return maxCols
  }

  clone = function () {
    var newTss = new TSS()
    const names = Object.getOwnPropertyNames(this)
    for (var i = 0; i < names.length; i++) {
      const name = names[i]
      const contents = this[name]
      if (contents instanceof TS) {
        newTss[name] = contents.clone()
      } else {
        newTss[name] = contents
      }
    }
    return newTss
  }

  isEmpty = function () {
    return this.length() === 0
  }
}
