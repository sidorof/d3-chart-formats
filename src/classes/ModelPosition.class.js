import Security from '@/classes/Security.class'

export default class ModelPosition {
  constructor (payload) {
    if (payload === undefined) {
      this.ticker = ''
      this.percent = 0
      this.security = null
    } else {
      this.ticker = payload.ticker
      this.percent = payload.percent
    }
    if (payload.security !== undefined) {
      this.security = new Security(payload.security)
    }
  }

  savedProperties = function () {
    return {
      ticker: this.ticker,
      percent: this.percent
    }
  }
}
