import { Selector } from "testcafe";

export default class PaymentDetailSelector {
    constructor() {
        //Textbox fields
        this.codeBox = Selector('#tb-iso-code')
        this.nameBox = Selector('#tb-name');
        this.textBox = Selector('#tb-short-symbol');

        this.daysNetBox = Selector('#tb-factor')
        this.day1Box = Selector('#tb-days1')
        this.day2Box = Selector('#tb-days2')
        this.day3Box = Selector('#tb-days3')

        this.percent1 = Selector('#tb-discount1')
        this.percent2 = Selector('#tb-discount2')
        this.percent2 = Selector('#tb-discount3')

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
}