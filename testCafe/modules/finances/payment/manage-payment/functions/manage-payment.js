import { Selector, t } from "testcafe"
import PaymentIndexSelector from "../selectors/payment.index.selector";
import PaymentDetailSelector from "../selectors/payment.detail.selector";
import Utils from "../../../../../commons/utils";

const detailsSelector = new PaymentDetailSelector();
const indexSelector = new PaymentIndexSelector();
const randomData = new Utils();


class ManagePayment {
    constructor() {
        this.codeValue = randomData.getText('Payment_Code', 15);
        this.nameValue = randomData.getText('Payment_Name', 15);
        this.textValue = randomData.getText('Payment_Text', 15)

    }
    async filterPayment(code) {
        await t
            .click(indexSelector.filterBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.filterBox, code)
            .pressKey('enter')
    }

    async createPayment1(code, name, text) {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.codeBox, code)
            .typeText(detailsSelector.nameBox, name)
            .typeText(detailsSelector.textBox, text)
    }

    async createPayment2() {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.codeBox, this.codeValue)
            .typeText(detailsSelector.nameBox, this.nameValue)
            .typeText(detailsSelector.textBox, this.textValue)
    }

    async fillvalue(selector, value) {
        await t
            .click(type)
            .pressKey('ctrl+a delete')
            .typeText(selector, value)
    }

    async editPayment1(code, name, text) {
        await t
            .click(indexSelector.editBtn)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, code)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, name)
            .click(detailsSelector.textBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.textBox, text)
            
    }

    async editPayment2() {
        //edit data
        await t
            .click(indexSelector.editBtn)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, this.codeValue)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, this.nameValue)
            .click(detailsSelector.textBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.textBox, this.textValue)
    }

    async copyPayment1(code, name, text) {
        await t
            .click(indexSelector.editBtn)
            .click(indexSelector.copyBtn)
            .typeText(detailsSelector.codeBox, code)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, name)
            .click(detailsSelector.textBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.textBox, text)

    }

    async copyPayment2() {
        //edit data
        await t
            .click(indexSelector.editBtn)
            .click(indexSelector.copyBtn)
            .typeText(detailsSelector.codeBox, this.codeValue)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, this.nameValue)
            .click(detailsSelector.textBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.textBox, this.textValue)
    }

    async deletePayment() {
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.confirmDeleteBtn)
    }

}
export default ManagePayment