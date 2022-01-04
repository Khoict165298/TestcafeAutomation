import { Selector } from "testcafe";

export default class DunningDetailSelector {
    constructor() {
        //Textbox fields
        this.codeBox = Selector('#tb-code')
        this.nameBox = Selector('#tb-name');
        this.descriptionBox = Selector('#tb-desc');

        this.templateBox = Selector('#cbx-template');
        this.templateOption = Selector('a').withAttribute('tabindex', '-1');
        this.dunningTypeBox = Selector('#cbx-dunningtype');
        this.dunnningTypeOption = this.dunningTypeBox.find('option');

        this.dunningIntervalBox = Selector('#tb-duedays')
        this.waitingPeriodBox = Selector('#tb-waitingperiod')
        this.sortBox = Selector('#tb-sortorder')

        this.standardCheckBox = Selector('#cb-default');
        this.activeCheckBox = Selector('#cb-enabled');
        this.requestdeleteCheckBox = Selector('#cb-has-deleted')

        //Buttons
        this.saveCloseBtn = Selector('#btn-saveAndClose');
        this.saveNewBtn = Selector('#saveNew');
        this.clearBtn = Selector('#btn-clear');
        this.resetBtn = Selector('#btn-reset');
        this.copyBtn = Selector('')
        this.backBtn = Selector('#btn-back');
        this.translateBtn = Selector('#btn-translate')

        /* //begin-labels
         this.codeNormalLabel = Selector('label').withAttribute('for', 'tb-code');
         this.nameNormalLabel = Selector('label').withAttribute('for', 'tb-name');
         this.descriptionNormalLabel = Selector('label').withAttribute('for', 'are-description');*/

        //Asser
        this.vldMessage = Selector('div[class="validation-message"]')
        this.errorMessage = Selector('div').withAttribute('class', 'modal-body dxbs-modal-body');
        this.closeErrorMessage = Selector('#btn-close-alert')
        this.overrideBtn = Selector('#btn-confirm-overide')
        this.refreshBtn = Selector('#btn-confirm-yes')
        this.cancelBtn = Selector('#btn-confirm-no')

    }
};