import { Selector } from "testcafe";

export default class TranslatePaymentDetails {
    constructor() {
        //begin-textbox field
        this.nameDEBox = Selector('#NameNls-de');
        this.nameENBox = Selector('#NameNls-en');
        this.nameFRBox = Selector('#NameNls-fr');
        this.textDEBox = Selector('#TextNls-de');
        this.textENBox = Selector('#TextNls-en');
        this.textFRBox = Selector('#TextNls-fr');
        //end-textbox field

        //begin-button
        this.saveBtn = Selector('#btn-save-translate');
        this.cancelBtn = Selector('#btn-cfm-cancel');
        this.resetBtn = Selector('#btn-reset-translate');
    }
};