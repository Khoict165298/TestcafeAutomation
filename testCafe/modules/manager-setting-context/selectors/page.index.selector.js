import { Selector } from "testcafe";

export default class PageIndexSelector {
    constructor() {
        //Begin menu bar
        this.manageSettingContextMenu = Selector('a').withExactText('Kontext einstellen');
        //begin-manage account screenn
        this.addBtn = Selector('#btn-addNew');
        this.searchBox = Selector('#txt-search');
        this.editBnt = Selector('#btn-edit');
        this.deleteBtn = Selector('#btn-delete');
        this.confirmDeleteBtn = Selector('#btn-confirm-yes');
        this.cancelDeleteBtn = Selector('#btn-confirm-no');
        //end-manage accounts screen 

        //begin-manage-customer screen
        this.settingContextTable = Selector('div').withAttribute('class', 'dxbs-gridview');
        //end-manage-customer screen

        //begin-label layout
        this.userProfileBtn = Selector('i[title="User Info"]');
        this.userSettingBtn = Selector('a').withAttribute('class', 'dropdown-item btn');
        this.labelDropdown = Selector('select').withAttribute('class', 'form-control-sm w-100');
        this.regularLabel = Selector('option').withAttribute('value', 'Regular');
        this.floatingLabel = Selector('option').withAttribute('value', 'Floating');
        this.automaticLabel = Selector('option').withAttribute('value', 'Automatic');
        this.closeLabelBtn = Selector('#btn-close-alert');
        //end-label layout
    }
};