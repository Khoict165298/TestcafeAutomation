import { Selector, t } from "testcafe"
import CurrencyIndexSelector from "../selectors/currency.index.selector";
import CurrencyDetailSelector from "../selectors/currency.detail.selector";
import Utils from "../../../../../commons/utils";

const detailsSelector = new CurrencyDetailSelector();
const indexSelector = new CurrencyIndexSelector();
const randomData = new Utils();


class ManageCurrency {
    constructor() {
        this.ISOcodeValue = randomData.getText('', 3);
        this.nameValue = randomData.getText('Autotest ', 15);
        this.codeValue = randomData.getText('Autotest ', 15);
        this.editISOcodeValue = randomData.getText('', 3);
        this.editNameValue = randomData.getText('Autotest ', 15);
        this.editCodeValue = randomData.getText('Autotest ', 15);
    }
    async filterCurrency(code) {
        await t
            .click(indexSelector.filterBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.filterBox, code)
            .pressKey('enter')
    }

    async createCurrency() {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.isocodeBox, this.ISOcodeValue)
            .typeText(detailsSelector.nameBox, this.nameValue)
            .typeText(detailsSelector.codeBox, this.codeValue)
    }
    async createCurrencyConfig(isoCode, name, code) {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.isocodeBox, isoCode)
            .typeText(detailsSelector.nameBox, name)
            .typeText(detailsSelector.codeBox, code)
    }

    async selectRule(droplist, option, rule) {
        await t
            .click(droplist)
            .click(option.withText(rule))
            .expect(droplist.innerText).contains(rule)
            .wait(5000)
    }

    async fillvalue(selector, value) {
        await t
            .click(type)
            .pressKey('ctrl+a delete')
            .typeText(selector,value)
	}

    async editCurrency() {
        await t
            .click(indexSelector.editBnt)
            .click(detailsSelector.isocodeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.isocodeBox, this.editISOcodeValue)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, this.editNameValue)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, this.editCodeValue)
            
    }
    async editCurrencyConfig(isoCode, name, code) {
        await t
            .click(indexSelector.editBnt)
            .click(detailsSelector.isocodeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.isocodeBox, isoCode)
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.nameBox, name)
            .click(detailsSelector.codeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailsSelector.codeBox, code)

    }

    async deleteCurrency() {
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.confirmDeleteBtn)
    }

}
export default ManageCurrency