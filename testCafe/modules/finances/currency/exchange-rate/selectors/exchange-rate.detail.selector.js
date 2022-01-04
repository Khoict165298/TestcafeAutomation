import { Selector } from "testcafe";

export default class ExchangeRateDetailSelector {
    constructor() {
        this.exchangeRateBox = Selector('#ex_rate')
        this.validFromDate = Selector('#ex_date_valid')
        this.cancelBtn = Selector('#btn-Cancel')
        this.saveBtn = Selector('#btn-submit')
    }
};