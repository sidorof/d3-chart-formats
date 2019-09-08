export default class ExecutionRules {
  constructor (payload) {
    if (payload.priceType === undefined) {
      this.priceType = payload.priceType
    } else {
      this.priceType = 'close'
    }
    if (payload.lag === undefined) {
      this.lag = payload.lag
    } else {
      this.lag = 0
    }
  }

  desc = function () {
    var text = 'Trades at the close'
    return text
  }
  savedProperties = function () {
    return { priceType: this.priceType, lag: this.lag }
  }
}
