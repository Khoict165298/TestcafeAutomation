import { Selector } from "testcafe";

export default class PageDetailsSelector {
    constructor() {

        //begin-textbox field
        this.nameBox = Selector('#tb-name');
        this.codelBox = Selector('#tb-code');
        this.descriptionBox = Selector('#are-description');
        this.systemCheckBox = Selector('#cb-system');
        this.activeCheckBox = Selector('#cb-enabled');
        //end-textbox field

        //begin-button
        this.saveCloseBtn = Selector('#btn-saveAndClose');
        this.saveNewBtn = Selector('#saveNew');
        this.clearBtn = Selector('#btn-clear');
        this.resetBtn = Selector('#btn-reset');
        this.backBtn = Selector('#btn-back');
        this.translateBtn = Selector('#btn-translate')
        //end-button

        //begin-labels
        this.codeNormalLabel = Selector('label').withAttribute('for', 'tb-code');
        this.nameNormalLabel = Selector('label').withAttribute('for', 'tb-name');
        this.descriptionNormalLabel = Selector('label').withAttribute('for', 'are-description');
        //end-labels

        //Assert
        this.errorMessage = Selector('div').withAttribute('class', 'modal-body dxbs-modal-body');
        this.closeErrorMessage = Selector('#btn-close-alert')
        this.overrideBtn = Selector('#btn-confirm-overide')
        this.refreshBtn = Selector('#btn-confirm-yes')
        this.cancelBtn = Selector('#btn-confirm-no')
    }
};