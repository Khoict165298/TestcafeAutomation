import { Selector } from "testcafe";

export default class DunningIndexSelector {
    constructor() {
        //Menu bar
        this.financeMenu = Selector('a').withText("Finanzen")
        this.dunningLevelsMenu = Selector('a').withText("Mahnstufen")

        //List view
        this.addBtn = Selector('#btn-addNew');
        this.filterBox = Selector('div[class="dxbs-textbox"]');
        this.editBtn = Selector('#btn-edit');
        this.deleteBtn = Selector('#btn-delete');
        this.confirmDeleteBtn = Selector('#btn-confirm-yes');
        this.cancelDeleteBtn = Selector('#btn-confirm-no');
        this.dunningTable = Selector('div').withAttribute('class', 'dxbs-gridview');
        this.clearFilterBtn = Selector('button[class ="btn btn-sm dx-btn dxbs-edit-btn dxbs-clear-btn"]')

    }
};