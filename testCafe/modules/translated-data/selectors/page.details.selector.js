import { Selector } from "testcafe";

export default class PageDetails {
    constructor() {
        //begin-textbox field
        this.nameDEBox = Selector('#NameNls-de');
        this.nameENBox = Selector('#NameNls-en');
        this.nameFRBox = Selector('#NameNls-fr');
        this.descriptionDEbox = Selector('#DescriptionNls-de');
        this.descriptionENbox = Selector('#DescriptionNls-en');
        this.descriptionFRbox = Selector('#DescriptionNls-fr');
        //end-textbox field

        //begin-button
        this.saveBtn = Selector('#btn-save-translate');
        this.cancelBtn = Selector('#btn-cfm-cancel');

        //end-button
        this.errorMessage = Selector('div').withAttribute('class', 'modal-body dxbs-modal-body');
        this.overrideConflictBtn = Selector('#btn-confirm-overide')
        this.refreshConflictBtn = Selector('#btn-confirm-yes')
        this.cancelConfictBtn = Selector('#btn-confirm-no')
    }
};