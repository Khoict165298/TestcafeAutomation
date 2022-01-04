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

fixture`Finance - Currency: Edit currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
    })

test.meta({ type: 'base' })
    ('Edit a currency with all valid value', async t => {
        const currencyTC1 = new ManageCurrency()
        //Create a currency
        await currencyTC1.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC1.filterCurrency(currencyTC1.ISOcodeValue)
        await currencyTC1.editCurrency()
        await t.typeText(detailsSelector.factorBox, '100')
        /*await currency.selectRule(detailsSelector.singleroundingoffruleBox, detailsSelector.singleroundingoffruleOption, 'Commercial')
        await currency.fillvalue(detailsSelector.singleroundingoffvalueBox, '0.5')
        await currency.selectRule(detailsSelector.totalroundingoffruleBox, detailsSelector.totalroundingoffruleOption, 'Commercial')
        await currency.fillvalue(detailsSelector.totalroundingoffvalueBox, '0.5')*/
        await t.typeText(detailsSelector.sortBox, '1')
        await t.click(detailsSelector.saveCloseBtn)
        //Filter currency
        await currencyTC1.filterCurrency(currencyTC1.editISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains(currencyTC1.editISOcodeValue)
        //Delete currency
        await currencyTC1.deleteCurrency()
        await currencyTC1.filterCurrency(currencyTC1.editISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })
    ('Edit currency with blank ISO code', async t => {
        const currencyTC2 = new ManageCurrency()
        await currencyTC2.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        await currencyTC2.filterCurrency('VND')
        await currencyTC2.editCurrencyConfig(' ', 'Swiss France', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Der ISO Code ist erforderlich.')
        await t.click(detailsSelector.backBtn)
        //Filter currency
        await currencyTC2.filterCurrency(currencyTC2.ISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains(currencyTC2.ISOcodeValue)
        //Delete currency
        await currencyTC2.deleteCurrency()
        await currencyTC2.filterCurrency(currencyTC2.ISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })
    ('Create a new currency with ISO code is duplicated', async t => {
        const currencyTC3a = new ManageCurrency()
        const currencyTC3b = new ManageCurrency()
        //Create curency A
        await currencyTC3a.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Create curency B
        await currencyTC3b.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit currency
        await currencyTC3b.filterCurrency(currencyTC3b.ISOcodeValue)
        await currencyTC3b.editCurrencyConfig(currencyTC3a.ISOcodeValue, currencyTC3a.editNameValue, currencyTC3a.editCodeValue)
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.errorMessage.innerText).contains('Dieser ISO-Code hat bereits existiert')
        await t.click(detailsSelector.closeErrorMessage)
        await t.click(detailsSelector.backBtn)
        // Delete currency 1
        await currencyTC3a.filterCurrency(currencyTC3a.ISOcodeValue)
        await currencyTC3a.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
        // Delete currency 2
        await currencyTC3b.filterCurrency(currencyTC3b.ISOcodeValue)
        await currencyTC3b.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })

    ('Edit currency with ISO code more than 3 characters', async t => {
        const currencyTC4 = new ManageCurrency()
        //Create currency
        await currencyTC4.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC4.filterCurrency(currencyTC4.ISOcodeValue)
        await currencyTC4.editCurrencyConfig('VND1', 'Swiss Franc', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 3 Zeichen')
        await t.click(detailsSelector.backBtn)
        //Delete currency
        await currencyTC4.filterCurrency(currencyTC4.ISOcodeValue)
        await currencyTC4.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })

    ('Create a new currency with blank Name', async t => {
        const currencyTC5 = new ManageCurrency()
        //Create currency
        await currencyTC5.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC5.filterCurrency(currencyTC5.ISOcodeValue)
        await currencyTC5.editCurrencyConfig('VND', ' ', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die Bezeichnung ist erforderlich.')
        await t.click(detailsSelector.backBtn)
        //Delete currency
        await currencyTC5.filterCurrency(currencyTC5.ISOcodeValue)
        await currencyTC5.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })

    ('Create a new currency with Name more than 254 characters', async t => {
        const currencyTC6 = new ManageCurrency()
        //Create currency
        await currencyTC6.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC6.filterCurrency(currencyTC6.ISOcodeValue)
        await currencyTC6.editCurrencyConfig('VND', 'Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss FrancTest Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
        await t.click(detailsSelector.backBtn) 
        //Delete currency
        await currencyTC6.filterCurrency(currencyTC6.ISOcodeValue)
        await currencyTC6.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })

    ('Create a new currency with blank Code', async t => {
        const currencyTC6 = new ManageCurrency()
        //Create currency
        await currencyTC6.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC6.filterCurrency(currencyTC6.ISOcodeValue)
        await currencyTC6.editCurrencyConfig('VND', 'Swiss Franc', ' ')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Das Kurzzeichen ist erforderlich.')
        await t.click(detailsSelector.backBtn)
        //Delete currency
        await currencyTC6.filterCurrency(currencyTC6.ISOcodeValue)
        await currencyTC6.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test.meta({ type: 'advance' })

    ('Create a new currency with Code more than 254 characters', async t => {
        const currencyTC7 = new ManageCurrency()
        //Create currency
        await currencyTC7.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit currency
        await currencyTC7.filterCurrency(currencyTC7.ISOcodeValue)
        await currencyTC7.editCurrencyConfig(currencyTC7.editISOcodeValue, 'Swiss Franc', 'Test new code Test new codeTest Test new code Test new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new code codeTest new codeTest new code')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
        await t.click(detailsSelector.backBtn)
        //Delete currency
        await currencyTC7.filterCurrency(currencyTC7.ISOcodeValue)
        await currencyTC7.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
    })





