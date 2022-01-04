import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import CurrencyDetailSelector from "../../manage-currency/selectors/currency.detail.selector";
import CurrencyIndexSelector from "../../manage-currency/selectors/currency.index.selector";
import ManageCurrency from "../../manage-currency/functions/manage-currency";
import ExchangeRateDetailSelector from "../selectors/exchange-rate.detail.selector";
import ExchangeRateIndexSelector from "../selectors/exchange-rate.index.selector";
import CreateExchangeRate from "../functions/create-exchange-rate";
import EditExchangeRate from "../functions/edit-exchange-rate";

const config = new Configuration();
const login = new LoginPage();
const detailsCurencySelector = new CurrencyDetailSelector();
const indexCurencySelector = new CurrencyIndexSelector();
const detailSelector = new ExchangeRateDetailSelector();
const indexSelector = new ExchangeRateIndexSelector();
const createEchangeRate = new CreateExchangeRate();
const editExchangeRate = new EditExchangeRate();


fixture`Finance - Currency: Exchange rate`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexCurencySelector.financeMenu)
        await t.click(indexCurencySelector.currencyMenu);
    })

test.meta({ type: 'base' })
    ('Check create Exchange Rate successfully', async t => {
        const manageCurrencyTC1 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC1.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC1.filterCurrency(manageCurrencyTC1.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //Create exchange rate
        await createEchangeRate.createExchangeRate()
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('2,04000')
            .expect(indexSelector.dataTable.innerText).contains('15.06.2024')
            .click(detailsCurencySelector.backBtn)
            .wait(3000);
        //Delete data
        await manageCurrencyTC1.filterCurrency(manageCurrencyTC1.ISOcodeValue);
        await manageCurrencyTC1.deleteCurrency();
})

test.meta({ type: 'base' })
    ('Check create Exchange Rate unsuccessfully when duplicate date', async t => {
        const manageCurrencyTC2 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC2.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC2.filterCurrency(manageCurrencyTC2.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //Create exchange rate 1
        await createEchangeRate.createExchangeRate()
        //Create exchange rate 2
        await createEchangeRate.createExchangeRate()
        //Assertion
        await t
            .expect(Selector('i').withAttribute('style', 'text-align:center; word-wrap:unset').innerText).contains('Wechselkurs ist dupliziert')
            .click(Selector('#btn-close-alert'))
            .click(detailsCurencySelector.backBtn);
        //Delete data
        await manageCurrencyTC2.filterCurrency(manageCurrencyTC2.ISOcodeValue);
        await manageCurrencyTC2.deleteCurrency();
})

test.meta({ type: 'base' })
    ('Check edit Exchange Rate successfully', async t => {
        const manageCurrencyTC3 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC3.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC3.filterCurrency(manageCurrencyTC3.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //Edit exchange rate
        await editExchangeRate.editExchangeRate()
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('9,04')
            .expect(indexSelector.dataTable.innerText).contains('06.10.2024')
            .click(detailsCurencySelector.backBtn);
        //Delete data
        await manageCurrencyTC3.filterCurrency(manageCurrencyTC3.ISOcodeValue);
        await manageCurrencyTC3.deleteCurrency();
})

test.meta({ type: 'base' })
    ('Check delete Exchange Rate successfully', async t => {
        const manageCurrencyTC4 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC4.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC4.filterCurrency(manageCurrencyTC4.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //Create exchange rate
        await createEchangeRate.createExchangeRate()
        //delete Exchange rate
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.yesConfirmDeleteBtn)
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('0,00000')
})

test.meta({ type: 'base' })
    ('Check delete the last Exchange Rate', async t => {
        const manageCurrencyTC5 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC5.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC5.filterCurrency(manageCurrencyTC5.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //delete the last Exchange rate
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.yesConfirmDeleteBtn)
        //Assertion
        await t
            .expect(Selector('i').withAttribute('style', 'text-align:center; word-wrap:unset').innerText).contains('Löschen des letzten Wechselkurses ist unmöglich.')
            .click(Selector('#btn-close-alert'))
            .click(detailsCurencySelector.backBtn);
        //Delete data
        await manageCurrencyTC5.filterCurrency(manageCurrencyTC5.ISOcodeValue);
        await manageCurrencyTC5.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('Check Cancal delete the last Exchange Rate', async t => {
        const manageCurrencyTC6 = new ManageCurrency();
        //Create Create Currency
        await manageCurrencyTC6.createCurrency()
        await t.click(detailsCurencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC6.filterCurrency(manageCurrencyTC6.ISOcodeValue)
        await t.click(indexCurencySelector.editBnt);
        //Create exchange rate
        await createEchangeRate.createExchangeRate()
        //Cancel delete Exhange rate
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.cancelConfirmDeleteBtn)
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('2,04000')
            .expect(indexSelector.dataTable.innerText).contains('15.06.2024')
            .click(detailsCurencySelector.backBtn)
            .wait(3000);
        //Delete data
        await manageCurrencyTC6.filterCurrency(manageCurrencyTC6.ISOcodeValue);
        await manageCurrencyTC6.deleteCurrency();
    })
