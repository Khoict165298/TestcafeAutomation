import { Selector } from "testcafe";

export default class PaymentIndexSelector {
    constructor() {
        //Menu bar
        this.financeMenu = Selector('a').withText("Finanzen")
        this.paymentMenu = Selector('a').withText("Zahlungskonditionen")

        //List view
        this.addBtn = Selector('#btn-addNew');
        this.filterBox = Selector('div[class="dxbs-textbox"]');
        this.editBtn = Selector('#btn-edit');
        this.copyBtn = Selector('#btn-duplicate')
        this.deleteBtn = Selector('#btn-delete');
        this.confirmDeleteBtn = Selector('#btn-confirm-yes');
        this.cancelDeleteBtn = Selector('#btn-confirm-no');
        this.paymentTable = Selector('div').withAttribute('class', 'dxbs-gridview');
        this.clearFilterBtn = Selector('button[class ="btn btn-sm dx-btn dxbs-edit-btn dxbs-clear-btn"]')

        /*//Label layout
        this.userProfileBtn = Selector('i[title="User Info"]');
        this.userSettingBtn = Selector('a').withAttribute('class', 'dropdown-item btn');
        this.labelDropdown = Selector('select').withAttribute('class', 'form-control-sm w-100');
        this.regularLabel = Selector('option').withAttribute('value', 'Regular');
        this.floatingLabel = Selector('option').withAttribute('value', 'Floating');
        this.automaticLabel = Selector('option').withAttribute('value', 'Automatic');
        this.closeLabelBtn = Selector('#btn-close-alert');*/

    }
};