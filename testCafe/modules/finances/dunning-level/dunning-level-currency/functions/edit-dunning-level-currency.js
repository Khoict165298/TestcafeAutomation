import { Selector, t } from "testcafe"
import DunningCurrencyIndexSelector from "../selectors/dunning-level-currency.index.selector";
import DunningCurrencyDetailSelector from "../selectors/dunning-level-currency.detail.selector";

const indexSelector = new DunningCurrencyIndexSelector();
const detailSelector = new DunningCurrencyDetailSelector();

class EditDunningCurrency {
    async editDunningCurrency() {
        await t
            .click(indexSelector.addBtn)
            .click(detailSelector.minimumAmountBox)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.minimumAmountBox, '10.05')
            .click(detailSelector.dunningFeeBox)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.dunningFeeBox, '111.25')
            .click(detailSelector.validFromDate)
            .pressKey('ctrl+a delete')
            .typeText(detailSelector.validFromDate, '10.10.2021')
            .click(detailSelector.saveBtn);
    }
}
export default EditDunningCurrency