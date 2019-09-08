export default class Rebalance {
  _prefix = 'Rebalance on '
  constructor (payload) {
    if (payload !== undefined) {
      this.ptype = payload.ptype
      this.days = payload.days
      this.multiplier = payload.multiplier
    } else {
      // default
      this.ptype = 'm'
      this.days = ['last']
      this.multiplier = 1
    }
  }

  weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ]

  _multiplier = function (suffix) {
    var text = this._prefix
    if (this.multiplier !== 1) {
      text = ' every ' + this.multiplier + ' ' + suffix
    }
    return text
  }

  desc = function () {
    var text
    switch (this.ptype) {
      case 'd':
        text = this._dailyDesc()
        break
      case 'w':
        text = this._weeklyDesc()
        break
      case 'm':
        text = this._monthlyDesc()
        break
      case 'q':
        text = this._quarterlyDesc()
        break
      case 'y':
        text = this._annualDesc()
        break
      default:
        text = 'rebalance incomplete'
    }
    return text
  }

  _dailyDesc = function () {
    var text = this._prefix
    if (this.multiplier !== 1) {
      text = this._multiplier('days')
    } else {
      text = ' every day'
    }
    return text
  }
  _weeklyDesc = function () {
    var text = this._prefix
    const days = this.days.slice().sort()
    for (var i = 0; i < days.length; i++) {
      const periodDay = days[i]
      text += this.weekDays[periodDay] + ', '
    }
    text = text.slice(0, text.length - 2)
    if (this.multiplier !== 1) {
      text += this._multiplier('weeks')
    }
    return text
  }
  _monthlyDesc = function () {
    var text = this._prefix
    const days = this.days.slice().sort()
    if (this.days.length === 1) {
      if (days[0] === 'last') {
        text += 'the last'
      } else if (days[0] === 1) {
        text += 'the 1st'
      } else if (days[0] === 15) {
        text += 'the 15th'
      } else {
        console.log('error in _monthlyDesc desc')
        //         text += 'on day ' + rebalance.days[0] + ' of the month'
      }
      text += ' day of the month'
    } else {
      text += 'days '
      const days = this.days.slice().sort()
      for (var i = 0; i < days.length; i++) {
        const day = days[i]
        if (day !== 'last') {
          text += day + ', '
        } else {
          text += 'last day'
        }
        if (i === days.length - 1) {
          if (day !== 'last') {
            text = text.slice(0, text.length - 2)
          }
        }
      }
      text += ' of the month'
    }
    if (this.multiplier !== 1) {
      text += this._multiplier('months')
    }
    return text
  }
  _quarterlyDesc = function () {
    var text = this._prefix
    text += 'the last day of the quarter'
    if (this.multiplier !== 1) {
      text += ' every ' + this.multiplier + ' quarters'
    }
    return text
  }
  _annualDesc = function () {
    var text = this._prefix
    text += 'the last day of the year'
    if (this.multiplier !== 1) {
      text += ' every ' + this.multiplier + ' years'
    }
    return text
  }
  savedProperties = function () {
    return { ptype: this.ptype, days: this.days, multiplier: this.multiplier }
  }
}
