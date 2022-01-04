import { Selector, t } from "testcafe"
import DunningCurrencyIndexSelector from "../selectors/dunning-level-currency.index.selector";
import DunningCurrencyDetailSelector from "../selectors/dunning-level-currency.detail.selector";

const indexSelector = new DunningCurrencyIndexSelector();
const detailSelector = new DunningCurrencyDetailSelector();

class CreateDunningCurrency {
    async createDunningCurrency() {
        await t
            .click(indexSelector.addBtn)
            .click(detailSelector.minimumAmountBox)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.minimumAmountBox, '2.05')
            .click(detailSelector.dunningFeeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.dunningFeeBox, '9999.99')
            .click(detailSelector.validFromDate)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.validFromDate, '20.10.2021')
            .click(detailSelector.saveBtn)
            .wait(2000);
    }
}
export default CreateDunningCurrency