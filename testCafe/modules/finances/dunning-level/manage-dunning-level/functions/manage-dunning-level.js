import { Selector, t } from "testcafe"
import DunningIndexSelector from "../selectors/dunning.index.selector";
import DunningDetailSelector from "../selectors/dunning.detail.selector";
import Utils from "../../../../../commons/utils";

const detailsSelector = new DunningDetailSelector();
const indexSelector = new DunningIndexSelector();
const randomData = new Utils();


export default class ManageDunningLevel {
    constructor() {
        this.codeValue = randomData.getText('Dunning_Code_', 20);
        this.nameValue = randomData.getText('Dunning_Name ', 20);
        this.descriptionValue = randomData.getText('Dunning Description ', 25);
        this.codeEditValue = randomData.getText('Edit_Dunning_Code_', 25);
        this.nameEditValue = randomData.getText('Edit Dunning_Name ', 25);
    }

    async filterDunning(code) {
        await t
            .click(indexSelector.filterBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.filterBox, code)
            .pressKey('enter')
    }

    async createDunningconfig(code, name) {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.codeBox, code)
            .typeText(detailsSelector.nameBox, name)
            .click(detailsSelector.templateBox)
            .click(detailsSelector.templateOption)
    }

    async createDunningLevels() {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.codeBox, this.codeValue)
            .typeText(detailsSelector.nameBox, this.nameValue)
            .typeText(detailsSelector.descriptionBox, this.descriptionValue)
            .click(detailsSelector.templateBox)
            .click(detailsSelector.templateOption)
    }

    async fillvalue(selector, value) {
        await t
            .click(type)
            .pressKey('ctrl+a delete')
            .typeText(selector, value)
    }

    async editDunningConfig(code, name) {
        await t
            .click(indexSelector.editBtn)
            .wait(2000)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, code)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, name)          
    }

    async editDunningLevels() {
        //edit data
        await t
            .click(indexSelector.editBtn)
            .wait(2000)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, this.codeEditValue)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, this.nameEditValue)
    }

    async copyDunningConfig(name, code) {
        await t
            .click(indexSelector.editBnt)
            .click(indexSelector.copyBtn)
            .typeText(detailsSelector.codeBox, code)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, name)
    }

    async copyDunningLevels() {
        //edit data
        await t
            .click(indexSelector.editBnt)
            .click(indexSelector.copyBtn)
            .typeText(detailsSelector.codeBox, this.codeValue)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, this.nameValue)
            .click(detailsSelector.textBox)
    }

    async deleteDunning() {
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.confirmDeleteBtn)
    }

}
