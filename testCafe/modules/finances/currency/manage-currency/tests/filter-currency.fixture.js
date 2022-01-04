
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
const currency = new ManageCurrency()


fixture`Finance - Currency: filter currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
    })

test('Filter currency with valid ISO code value', async t => {

    //Filter currency by ISO code
    await currency.createCurrency('HAH', 'Swiss Franc', 'HAH')
    await t.click(detailsSelector.saveCloseBtn)
    await currency.filterCurrency('HAH')
    await t.expect(indexSelector.currencyTable.innerText).contains('HAH')
    //Delete currency
    await currency.deleteCurrency()
    // Clear filter
    await t.click(indexSelector.clearFilterBtn)
    await currency.filterCurrency('HAH')
    await t.expect(indexSelector.currencyTable.innerText).contains('No data to display')
})

test('Filter currency with invalid ISO code value', async t => {

    //Filter currency by
    await currency.createCurrency('HAN', 'Swiss Franc', 'HAH')
    await t.click(detailsSelector.saveCloseBtn)
    await currency.filterCurrency('abc')
    await t.expect(indexSelector.currencyTable.innerText).contains('No data to display')
     // Clear filter
    await t.click(indexSelector.clearFilterBtn)
    await currency.filterCurrency('HAN')
    await currency.deleteCurrency()
    await t.expect(indexSelector.currencyTable.innerText).contains('No data to display')
})