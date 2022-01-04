import { Selector, t } from "testcafe"
import ExchangeRateIndexSelector from "../selectors/exchange-rate.index.selector";
import ExchangeRateDetailSelector from "../selectors/exchange-rate.detail.selector";

const indexSelector = new ExchangeRateIndexSelector();
const detailSelector = new ExchangeRateDetailSelector();

class CreateExchangeRate {
    async createExchangeRate(){
        await t
            .click(indexSelector.addBtn)
            .click(detailSelector.exchangeRateBox)
            .pressKey('ctrl+a delete')
            .pressKey('2 . 0 4')
            .click(detailSelector.validFromDate)
            .pressKey('ctrl+a delete')
            .pressKey('1 5 . 0 6 . 2 0 2 4')
            .click(detailSelector.saveBtn);
    }
}
export default CreateExchangeRate