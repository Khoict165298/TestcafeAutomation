import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import CurrencyIndexSelector from "../selectors/currency.index.selector";
import CurrencyDetailSelector from "../selectors/currency.detail.selector";
import ManageCurrency from "../functions/manage-currency"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new CurrencyDetailSelector();
const indexSelector = new CurrencyIndexSelector();

fixture`Finance - Currency: Delete currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
    })

test('Delete currency', async t => {
    const currencyTC1 = new ManageCurrency()
    //Filter currency by ISO code
    await currencyTC1.createCurrency()
    await t.click(detailsSelector.saveCloseBtn)
    await currencyTC1.filterCurrency(currencyTC1.ISOcodeValue)
    await t.expect(indexSelector.currencyTable.innerText).contains(currencyTC1.ISOcodeValue)
    //Delete currency
    await currencyTC1.deleteCurrency()
    await currencyTC1.filterCurrency(currencyTC1.ISOcodeValue)
    await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
})