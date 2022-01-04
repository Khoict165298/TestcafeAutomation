import { Selector } from "testcafe";

export default class PageDetails {
    constructor() {
        //begin-textbox field
        this.nameDEbox = Selector('#NameNls-de');
        this.nameENbox = Selector('#NameNls-en');
        this.nameFRbox = Selector('#NameNls-fr');
        this.codeDEBox = Selector('#ShortSymbolNls-de');
        this.codeENBox = Selector('#ShortSymbolNls-en');
        this.codeFRBox = Selector('#ShortSymbolNls-fr');
        //end-textbox field

        //begin-button
        this.saveBtn = Selector('#btn-save-translate');
        this.cancelBtn = Selector('#btn-cfm-cancel');
        this.resetBtn = Selector('#btn-reset-translate');
    }
};