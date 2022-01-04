import { Selector } from "testcafe"

class PageCustomizeTermsSelector {
    constructor() {

        //Begin menu bar
        this.customizeTermMenu = Selector('a').withText('Begriff')

        //begin list terms screen
        this.codeFilter = Selector('div[class="dxbs-textbox"]')
        this.editBtn = Selector('#btn-edit')
        this.cancelBtn = Selector('button[title="Abbrechen"]')
        this.resetBtn = Selector('#btn-delete')
                 
        //begin edit screen
        this.valueTermBox = Selector('#term_1')
        this.updateBtn = Selector('button[title="Speichern"]')
        this.alerMsg = Selector('div[class="modal-body dxbs-modal-body"]')

        //begin concurrency
        this.titleConflictTerm = Selector('div').withText('Datenkonflikte')
        this.overideConflictBtn = Selector('#btn-confirm-overide')
        this.refreshConflictBtn = Selector('#btn-confirm-yes')
        this.cancelConflictBtn = Selector('#btn-confirm-no')
            
    }
}

export default PageCustomizeTermsSelector