import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import Utils from "../../../../../commons/utils";
import LoginPage from "../../../../authentication/functions/login-page";
import PaymentIndexSelector from "../selectors/payment.index.selector";
import PaymentDetailSelector from "../selectors/payment.detail.selector";
import ManagePayment from "../functions/manage-payment"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new PaymentDetailSelector();
const indexSelector = new PaymentIndexSelector();
const payment = new ManagePayment()


fixture`Finance - Payment: filter payment`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu);
    })

test('Filter payment with valid code value', async t => {
    const create1 = new ManagePayment()

    //Filter payment by code
    await create1.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    await payment.filterPayment(create1.codeValue)
    await t.expect(indexSelector.paymentTable.innerText).contains(create1.codeValue)
    //Delete payment
    await payment.deletePayment()
    // Clear filter
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create1.codeValue)
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('Filter payment with invalid code value', async t => {
    const create2 = new ManagePayment()
    //Filter currency by
    await create2.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    await payment.filterPayment('tesst_abc')
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
    //Delete payment
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create2.codeValue)
    await payment.deletePayment()  
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})