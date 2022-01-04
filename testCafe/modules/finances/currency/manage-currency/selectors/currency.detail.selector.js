import { Selector } from "testcafe";

export default class CurrencyDetailSelector {
    constructor() {
        //Textbox fields
        this.isocodeBox = Selector('#tb-iso-code')
        this.nameBox = Selector('#tb-name');
        this.codeBox = Selector('#tb-short-symbol');
        this.factorBox = Selector('#tb-factor');

        this.singleroundingoffruleBox = Selector('#sl-round-rule')
        this.singleroundingoffruleOption = this.singleroundingoffruleBox.find('option')
        this.singleroundingoffvalueBox = Selector('#tb-round-precision')

        this.totalroundingoffruleBox = Selector('#sl-round-rule-total')
        //this.totalroundingoffruleOption = this.totalroundingoffruleBox.find('option')
        this.totalroundingoffruleOption = Selector('a[class="dropdown-item dxbs-clickable"]:nth-child(2)')
        this.totalroundingoffvalueBox = Selector('#tb-round-precision-total')
        
        this.sortBox = Selector('#tb-sortorder')

        this.standardCheckBox = Selector('#cb-default');
        this.activeCheckBox = Selector('#cb-enabled');
        this.requestdeleteCheckBox = Selector('#cb-has-deleted')
        
        //Buttons
        this.saveCloseBtn = Selector('#btn-saveAndClose');
        this.saveNewBtn = Selector('#saveNew');
        this.clearBtn = Selector('#btn-clear');
        this.resetBtn = Selector('#btn-reset');
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