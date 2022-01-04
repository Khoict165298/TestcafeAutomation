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

fixture`Finance - Currency: Create currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
    })

test.meta({ type: 'base' })  
    ('Create a new currency with all valid value', async t => {
        const currencyTC1 = new ManageCurrency()
        //Create new currency
        await currencyTC1.createCurrency()
        await t.click(detailsSelector.factorBox)
        await t.pressKey('ctrl+a delete')
        await t.typeText(detailsSelector.factorBox, '100')
        /* await currency.selectRule(detailsSelector.singleroundingoffruleBox, detailsSelector.singleroundingoffruleOption, 'Commercial')
        await currency.fillvalue(detailsSelector.singleroundingoffvalueBox,'0.5')
        await currency.selectRule(detailsSelector.totalroundingoffruleBox, detailsSelector.totalroundingoffruleOption, 'Commercial')
        await t.click(detailsSelector.totalroundingoffruleBox)
        await t.click(detailsSelector.totalroundingoffruleOption)
        await t.wait(2000)
        await currency.fillvalue(detailsSelector.totalroundingoffvalueBox, '0.5')*/
        await t.click(detailsSelector.sortBox)
        await t.pressKey('ctrl+a delete')
        await t.typeText(detailsSelector.sortBox,'1')
        await t.click(detailsSelector.saveCloseBtn)

        //Filter currency
        await currencyTC1.filterCurrency(currencyTC1.ISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains(currencyTC1.ISOcodeValue)
        //Delete currency
        await currencyTC1.deleteCurrency()
        await currencyTC1.filterCurrency(currencyTC1.ISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('Create a new currency with blank ISO code', async t => {
        const currencyTC2 = new ManageCurrency()
        await currencyTC2.createCurrencyConfig(' ', 'Swiss Franc', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        //Assertion
        await t.expect(detailsSelector.vldMessage.innerText).contains('Der ISO Code ist erforderlich.') 
})

test.meta({ type: 'basis' })
    ('Create a new currency with ISO code is duplicated', async t => {
        const currencyTC3 = new ManageCurrency()
        //Create currency A
        await currencyTC3.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Create currency B have same Iso code as currency A
        await currencyTC3.createCurrency()
        await t.click(detailsSelector.saveCloseBtn)
        //Assertion
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Dieser ISO-Code hat bereits existiert')
            .click(Selector('#btn-close-alert'))
            .click(detailsSelector.backBtn);
        //Delete data
        await currencyTC3.filterCurrency(currencyTC3.ISOcodeValue)
        await currencyTC3.deleteCurrency()

})

test.meta({ type: 'basis' })
    ('Create a new currency with ISO code more than 3 characters', async t => {
        const currencyTC4 = new ManageCurrency()
        await currencyTC4.createCurrencyConfig('VND1', 'Swiss Franc', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 3 Zeichen')
})

test.meta({ type: 'advance' })
    ('Create a new currency with blank Name', async t => {
        const currencyTC5 = new ManageCurrency()
        await currencyTC5.createCurrencyConfig('VND',' ','VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die Bezeichnung ist erforderlich.')
})

test.meta({ type: 'basis' })
    ('Create a new currency with Name more than 254 characters', async t => {
        const currencyTC6 = new ManageCurrency()
        await currencyTC6.createCurrencyConfig('VND', 'Test Swiss Franc Test Swiss Franc  Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc  Test Swiss Franc Test Swiss FrancTest Swiss Franc Test Swiss Franc  Test Swiss Franc Test Swiss FrancTest Swiss Franc Test Swiss Franc  Test Swiss Franc Test Swiss FrancTest Swiss Franc Test Swiss Franc  Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc Test Swiss Franc', 'VND')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
})

test.meta({ type: 'advance' })
    ('Create a new currency with blank Code', async t => {
        const currencyTC7 = new ManageCurrency()
        await currencyTC7.createCurrencyConfig('VND', 'Swiss Franc', ' ')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.vldMessage.innerText).contains('Das Kurzzeichen ist erforderlich.')
})

test.meta({ type: 'advance' })
    ('Create a new currency with Code more than 254 characters', async t => {
        const currencyTC8 = new ManageCurrency()
        await currencyTC8.createCurrencyConfig('VND', 'Swiss Franc', 'Test new code Test new codeTest new code Test new code Test new codeTest new code Test new code Test new codeTest new code Test new code Test new codeTest new code Test new code Test new codeTest new code Test new code Test new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new codeTest new code')
        await t.click(detailsSelector.saveCloseBtn)
        await t.expect(detailsSelector.valdMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
})






