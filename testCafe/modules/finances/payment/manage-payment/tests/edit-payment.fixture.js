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


fixture`Finance - Payment: Edit payment`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu);
    })

test('#36353: Edit payment with Save and Close button', async t => {
    const create1 = new ManagePayment()
    const edit1 = new ManagePayment()

    //Create payment term
    await create1.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create1.codeValue)
    await edit1.editPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await payment.filterPayment(edit1.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains(edit1.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains(edit1.nameValue)
        .expect(indexSelector.paymentTable.innerText).contains(edit1.textValue)
    //Delete payment
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36355: Edit payment with blank Code', async t => {
    const create2 = new ManagePayment()
    //Create payment term
    await create2.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create2.codeValue)
    await payment.editPayment1(' ',' 30 days','30 days ')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create2.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36336: Edit payment with duplicate Code', async t => {
    const create31 = new ManagePayment()
    const create32 = new ManagePayment()
    
    //Create the first payment term 
    await create31.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Create the second payment term 
    await create32.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit the second payment
    await payment.filterPayment(create32.codeValue)
    await payment.editPayment1(create31.codeValue, '30 days', '30 days')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert
    await t
        .expect(detailsSelector.errorMessage.innerText).contains('Dieser Code existiert bereits')
        .click(detailsSelector.closeErrorMessage)
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    //Delete the first payment
    await payment.filterPayment(create31.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymmentTable.innerText).contains('Keine Daten zum Anzeigen')
    //Delete the second payment
    await payment.filterPayment(create32.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36357: Edit payment with Code more than 50 characters', async t => {
    const create4 = new ManagePayment()
    //Create payment term
    await create4.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create4.codeValue)
    await payment.editPayment1('Test new code Test new codeTest new codeTest new codeTest new codeTest new code', '30 net', '30 net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 50 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create4.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36358: Edit payment with blank Name', async t => {
    const create5 = new ManagePayment()
    //Create payment term
    await create5.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create5.codeValue)
    await payment.editPayment1('Payment code ', ' ', '30 net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create5.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36359: Edit payment with Name more than 254 characters', async t => {
    //Create payment term
    const create6 = new ManagePayment()
    //Create payment term
    await create6.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create6.codeValue)
    await payment.editPayment1('Payment code ', 'Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name Test Payment Name', '30 Net')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create6.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36360: Edit payment with blank Text', async t => {
    //Create payment term
    const create7 = new ManagePayment()
    //Create payment term
    await create7.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.filterPayment(create7.codeValue)
    await payment.editPayment1('Payment code ', '30 net', ' ')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Dieses Feld ist erforderlich')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create7.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})

test('#36361: Edit payment with Text more than 254 characters', async t => {
    //Create payment term
    const create8 = new ManagePayment()
    //Create payment term
    await create8.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
    await payment.editPayment1('Payment code ', 'Payment Name', 'Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text Test Payment Text')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert 
    await t
        .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
    //Back to payment list
    await t.click(detailsSelector.backBtn)
    // Delete payment
    await payment.filterPayment(create8.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
})