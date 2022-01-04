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


fixture`Finance - Payment: Create payment`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu);
    })

test('#36334: Create payment with Save and Close button', async t => {
    const create1 = new ManagePayment()

    //Create payment term
    await create1.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    await payment.filterPayment(create1.codeValue)
    //Assert 
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create1.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains(create1.nameValue)
        .expect(indexSelector.paymentTable.innerText).contains(create1.textValue)
    //Delete payment
    await payment.deletePayment()
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create1.codeValue)
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36335: Create payment with Save and New button', async t => {
    const create2 = new ManagePayment()

    //Create payment term
    await create2.createPayment2()
    await t.click(detailsSelector.saveNewBtn)
    await t.click(detailsSelector.backBtn);
    //Assert 
    await payment.filterPayment(create2.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create2.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains(create2.nameValue)
    //Delete payment
    await payment.deletePayment()
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create2.codeValue)
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})


test('#36336: Create payment with blank Code', async t => {
    
    //Create payment term
    await payment.createPayment1(' ', '30 net','30 net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn) 
})

test('#36337: Create payment with duplicate Code', async t => {
    const create4 = new ManagePayment()
    //Create the first payment term 
    await create4.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Create the second payment term 
    await create4.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.errorMessage.innerText).contains('')
        .click(detailsSelector.closeErrorMessage)
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    //Delete payment
    await payment.filterPayment(create4.codeValue)
    await payment.deletePayment()
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create4.codeValue)
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36338: Create payment with Code more than 50 characters', async t => {

    //Create payment term
    await payment.createPayment1('Test new code Test new codeTest new codeTest new codeTest new codeTest new code', '30 net', '30 net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 50 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
})

test('#36339: Create payment with blank Name', async t => {

    //Create payment term
    await payment.createPayment1('Payment code ', ' ', '30 net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
})

test('#36340: Create payment with Name more than 254 characters', async t => {

    //Create payment term
    await payment.createPayment1('Payment code ', 'Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name', '30 Net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
})

test('#36429: Create payment with blank Text', async t => {

    //Create payment term
    await payment.createPayment1('Payment code ', '30 net', ' ')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
})

test('#36342: Create payment with Text more than 254 characters', async t => {

    //Create payment term
    await payment.createPayment1('Payment code ', 'Payment Name', 'Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
})