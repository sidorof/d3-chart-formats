export default class Security {
  constructor (payload) {
    if (payload !== undefined) {
      this.ticker = payload.ticker
      this.name = payload.name
      this.securityTypeId = payload.securityTypeId
      this.category = payload.category
      this.securityStatusId = payload.securityStatusId
    } else {
      this.ticker = ''
      this.name = ''
      this.securityTypeId = null
      this.category = null
      this.status = 0
    }
  }

  status = function () {
    if (this.securityStatusId === undefined || this.securityStatusId === null) {
      return 'undefined'
    }
    const choices = [
      'Not Ready',
      'Active',
      'Deprecated'
    ]
    return choices[this.securityStatusId]
  }

  securityType = function () {
    if (this.securityTypeId === undefined || this.securityTypeId === null) {
      return 'undefined'
    }
    const securityTypes = [
      'Cash',
      'Equity',
      'Composite'
    ]
    return securityTypes[this.securityTypeId]
  }
  savedProperties = function () {
    return {
      ticker: this.ticker,
      name: this.name,
      securityTypeId: this.securityTypeId,
      category: this.category,
      securityStatusId: this.securityStatusId
    }
  }
}
