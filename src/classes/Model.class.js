import Rebalance from './Rebalance.class'
import ModelPosition from './ModelPosition.class'
import TradeRules from './TradeRules.class'
import ExecutionRules from './ExecutionRules.class'
import constants from '@/constants'

export default class Model {
  constructor (payload) {
    if (payload.name === undefined) {
      this.name = ''
    } else {
      this.name = payload.name
    }

    if (payload.description === undefined) {
      this.description = ''
    } else {
      this.description = payload.description
    }

    if (payload.startDate === undefined) {
      this.startDate = null
    } else {
      this.startDate = payload.startDate
    }

    if (payload.endDate === undefined) {
      this.endDate = null
    } else {
      this.endDate = payload.endDate
    }

    if (payload.rebalance === undefined) {
      const dfltRebalance = constants.modelRebalances['m']
      this.rebalance = new Rebalance(dfltRebalance)
    } else {
      this.rebalance = new Rebalance(payload.rebalance)
    }

    if (payload.tradeRules === undefined) {
      this.tradeRules = new TradeRules()
    } else {
      this.tradeRules = new TradeRules(payload.tradeRules)
    }

    if (payload.executionRules === undefined) {
      this.executionRules = new ExecutionRules()
    } else {
      this.executionRules = new ExecutionRules(payload.executionRules)
    }

    if (payload.status === undefined) {
      this.status = null
    } else {
      this.status = payload.status
    }

    if (payload.uuid === undefined) {
      this.uuid = ''
    } else {
      this.uuid = payload.uuid
    }

    if (payload.positions === undefined) {
      this.positions = constants.modelPositionsDflt
    } else {
      this.positions = {}
      for (const ticker in payload.positions) {
        this.positions[ticker] = new ModelPosition(
          payload.positions[ticker]
        )
      }
    }
  }

  statusDesc = function () {
    var text
    switch (this.status) {
      case 0:
        text = 'Not Ready'
        break
      case 1:
        text = 'Active'
        break
      case 2:
        text = 'No Long Used'
        break
      default:
        text = 'undefined status code'
    }
    return text
  }

  savedProperties = function () {
    return {
      name: this.name,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      benchmarks: this.benchmarks,
      rebalance: this.rebalance.savedProperties(),
      tradeRules: this.tradeRules.savedProperties(),
      executionRules: this.executionRules.savedProperties(),
      status: this.status,
      uuid: this.uuid,
      positions: this.savedPositionProperties()
    }
  }

  availableCash = function () {
    var cash = 100
    for (var ticker in this.positions) {
      const position = this.positions[ticker]
      if (position.ticker !== '$cash') {
        cash -= position.percent
      }
    }
    this.positions['$cash'].percent = cash

    return 100 - cash
  }

  positionsList = function () {
    console.log('in positionsList:', this.positions)
    var plist = []
    for (var ticker in this.positions) {
      console.log('position class: ', ticker, this.positions[ticker])
      plist.push(this.positions[ticker])
    }
    return plist
  }

  savedPositionProperties = function () {
    var ps = {}
    for (var ticker in this.positions) {
      ps[ticker] = this.positions[ticker].savedProperties()
    }
    return ps
  }
}
