import { Selector } from "testcafe";

export default class ExchangeRateIndexSelector {
    constructor() {
        this.addBtn = Selector('#btn-add-exchange-rate')
        this.editBtn = Selector('#btn-edit')
        this.deleteBtn = Selector('#btn-delete')
        this.yesConfirmDeleteBtn = Selector('#btn-confirm-yes')
        this.cancelConfirmDeleteBtn = Selector('#btn-confirm-no')
        this.dataTable = Selector('div').withAttribute('class','dxbs-grid-hsd')
    }
};