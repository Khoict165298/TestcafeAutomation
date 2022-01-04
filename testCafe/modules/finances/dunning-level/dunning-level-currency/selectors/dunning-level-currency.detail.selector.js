import { Selector } from "testcafe";

export default class DunningCurrencyDetailSelector {
    constructor() {
        this.dunningFeeBox = Selector('#currency_charge')
        this.minimumAmountBox = Selector('#currency_minamount')
        this.validFromDate = Selector('#currency_date_valid')
        this.cancelBtn = Selector('#btn-Cancel')
        this.saveBtn = Selector('#btn-submit')
    }
};