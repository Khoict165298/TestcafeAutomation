import { Selector, t } from "testcafe"
import ExchangeRateIndexSelector from "../selectors/exchange-rate.index.selector";
import ExchangeRateDetailSelector from "../selectors/exchange-rate.detail.selector";

const indexSelector = new ExchangeRateIndexSelector();
const detailSelector = new ExchangeRateDetailSelector();

class EditExchangeRate {
    async editExchangeRate() {
        await t
            .click(indexSelector.editBtn)
            .click(detailSelector.exchangeRateBox)
            .pressKey('ctrl+a delete')
            .pressKey('9 . 0 4')
            .click(detailSelector.validFromDate)
            .pressKey('ctrl+a delete')
            .pressKey('0 6 . 1 0 . 2 0 2 4')
            .click(detailSelector.saveBtn);
    }
}
export default EditExchangeRate