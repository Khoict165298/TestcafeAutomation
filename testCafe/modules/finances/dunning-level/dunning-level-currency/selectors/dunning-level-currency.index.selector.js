import { Selector } from "testcafe";

export default class DunningCurrencyIndexSelector {
    constructor() {
        this.addBtn = Selector('#btn-add-dunning_level_currency')
        this.editBtn = Selector('#btn-edit')
        this.deleteBtn = Selector('#btn-delete')
        this.yesConfirmDeleteBtn = Selector('#btn-confirm-yes')
        this.cancelConfirmDeleteBtn = Selector('#btn-confirm-no')
        this.dataTable = Selector('div').withAttribute('class', 'dxbs-grid-hsd')
    }
};