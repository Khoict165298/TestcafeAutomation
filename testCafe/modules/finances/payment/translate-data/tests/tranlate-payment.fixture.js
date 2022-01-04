import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import PaymentIndexSelector from "../../manage-payment/selectors/payment.index.selector";
import PaymentDetailSelector from "../../manage-payment/selectors/payment.detail.selector";
import TranslatePaymentDetails from "../selectors/translate-payment.detail.selector";
import TranslatePaymentIndex from "../selectors/translate-payment.index.selector";
import ManagePayment from "../../manage-payment/functions/manage-payment"
import TranslateData from "../functions/tranlate-data"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new PaymentDetailSelector();
const indexSelector = new PaymentIndexSelector();
const translateDetail = new TranslatePaymentDetails();
const translateIndex = new TranslatePaymentIndex();
const payment = new ManagePayment()
const translate = new TranslateData();


fixture`Finance - Payment: Translate payment`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
    })

test.meta({ type: 'base' })
    ('#36257: Check translated data when input normal data at DE language', async t => {
    const create1 = new ManagePayment()
    
    //Create Create Payment
    await create1.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Open detail view payment
    await payment.filterPayment(create1.codeValue)
    await t.click(indexSelector.editBtn)
    //Open translate data detail view
    await t.click(detailsSelector.translateBtn)
    await t.wait(2000)
    //Assertion
    await t
        .expect(translateDetail.textDEBox.value).contains(create1.textValue)
        .expect(translateDetail.textENBox.value).contains(create1.textValue)
        .expect(translateDetail.textFRBox.value).contains(create1.textValue)
        .expect(translateDetail.nameDEBox.value).contains(create1.nameValue)
        .expect(translateDetail.nameENBox.value).contains(create1.nameValue)
        .expect(translateDetail.nameFRBox.value).contains(create1.nameValue)
        .click(translateDetail.cancelBtn)
        .click(detailsSelector.backBtn);
    //Delete data
    await payment.filterPayment(create1.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')

})

test.meta({ type: 'base' })
    ('#36264: Check translated data when input normal data at EN language', async t => {
    const create2 = new ManagePayment()

    //Switch language to DE
    await t.click(translateIndex.languageToggle);
    await t.click(translateIndex.languageENDrop);
    await t.wait(3000);
    //Create Payment
    await create2.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Open detail view payment
    await payment.filterPayment(create2.codeValue)
    await t.click(indexSelector.editBtn)
    //Open translate data detail view
    await t.click(detailsSelector.translateBtn)
    await t.wait(2000)
    //Assertion
    await t
        .expect(translateDetail.textDEBox.value).contains(create2.textValue)
        .expect(translateDetail.textENBox.value).contains(create2.textValue)
        .expect(translateDetail.textFRBox.value).contains(create2.textValue)
        .expect(translateDetail.nameDEBox.value).contains(create2.nameValue)
        .expect(translateDetail.nameENBox.value).contains(create2.nameValue)
        .expect(translateDetail.nameFRBox.value).contains(create2.nameValue)
        .click(translateDetail.cancelBtn)
        .click(detailsSelector.backBtn)
    //Delete data
    await payment.filterPayment(create2.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('No data to display')
})

test.meta({ type: 'base' })
    ('#36263: Check translated data when input normal data at FR language', async t => {
    const create3 = new ManagePayment()

    //Switch language to FR 
    await t.click(translateIndex.languageToggle);
    await t.click(translateIndex.languageFRDrop);
    await t.wait(3000);
    //Create Payment
    await create3.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Open detail view payment
    await payment.filterPayment(create3.codeValue)
    await t.click(indexSelector.editBtn)
    //Open translate data detail view
    await t.click(detailsSelector.translateBtn)
    await t.wait(2000)
    //Assertion
    await t
        .expect(translateDetail.textDEBox.value).contains(create3.textValue)
        .expect(translateDetail.textENBox.value).contains(create3.textValue)
        .expect(translateDetail.textFRBox.value).contains(create3.textValue)
        .expect(translateDetail.nameDEBox.value).contains(create3.nameValue)
        .expect(translateDetail.nameENBox.value).contains(create3.nameValue)
        .expect(translateDetail.nameFRBox.value).contains(create3.nameValue)
        .click(translateDetail.cancelBtn)
        .click(detailsSelector.backBtn);
    //Delete data
    await payment.filterPayment(create3.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
    
    ('#36258/36260/36261: Check translated data when entering form data translation first in default language', async t => {
    const create4 = new ManagePayment()
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create4.codeValue);
    //Create translated data
    await translate.createTranslate()
    //Expected
    await t
        .expect(detailsSelector.nameBox.value).contains('Name DE')
        .expect(detailsSelector.textBox.value).contains('Text DE');
    //Save payment
    await t.click(detailsSelector.saveCloseBtn);
    await payment.filterPayment(create4.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create4.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text DE')
        .expect(indexSelector.paymentTable.innerText).contains('Name DE');
    //Check data after swicth default to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(3000)
    await payment.filterPayment(create4.codeValue)
    //Assert after swicth default to EN language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create4.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text EN')
        .expect(indexSelector.paymentTable.innerText).contains('Name EN');
    //Check data after swicth default to FR language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(5000)
    await payment.filterPayment(create4.codeValue)
    //Assert after swicth default to FR language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create4.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text FR')
        .expect(indexSelector.paymentTable.innerText).contains('Name FR')
        //Delete data
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create4.codeValue)
    await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
    
    ('#36265/36266/36267: Check translated data when entering form data translation first in EN language', async t => {
    const create5 = new ManagePayment()
    //Swicth to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(3000);
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create5.codeValue);
    //Create translated data
    await translate.createTranslate()
    //Expected
    await t
        .expect(detailsSelector.nameBox.value).contains('Name EN')
        .expect(detailsSelector.textBox.value).contains('Text EN');
    //Save payment
    await t.click(detailsSelector.saveCloseBtn);
    await payment.filterPayment(create5.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create5.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text EN')
        .expect(indexSelector.paymentTable.innerText).contains('Name EN')
    //Check data after swicth default to DE language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageDEDrop)
        .wait(3000)
    await payment.filterPayment(create5.codeValue)
    //Assert after swicth default to EN language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create5.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text DE')
        .expect(indexSelector.paymentTable.innerText).contains('Name DE');
    //Check data after swicth default to FR language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(5000)
    await payment.filterPayment(create5.codeValue)
    //Assert after swicth default to FR language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create5.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text FR')
        .expect(indexSelector.paymentTable.innerText).contains('Name FR');
    //Delete data
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create5.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
    
    ('#36268/36269/36270: Check translated data when entering form data translation first in FR language', async t => {
    const create6 = new ManagePayment()
    //Swicth to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(3000);
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create6.codeValue);
    //Create translated data
    await translate.createTranslate()
    //Expected
    await t
        .expect(detailsSelector.nameBox.value).contains('Name FR')
        .expect(detailsSelector.textBox.value).contains('Text FR');
    //Save payment
    await t.click(detailsSelector.saveCloseBtn);
    await payment.filterPayment(create6.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create6.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text FR')
        .expect(indexSelector.paymentTable.innerText).contains('Name FR')
    //Check data after swicth default to DE language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageDEDrop)
        .wait(3000)
    await payment.filterPayment(create6.codeValue)
    //Assert after swicth default to EN language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create6.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text DE')
        .expect(indexSelector.paymentTable.innerText).contains('Name DE');
    //Check data after swicth default to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(5000)
    await payment.filterPayment(create6.codeValue)
    //Assert after swicth default to FR language
    await t
        .expect(indexSelector.paymentTable.innerText).contains(create6.codeValue)
        .expect(indexSelector.paymentTable.innerText).contains('Text EN')
        .expect(indexSelector.paymentTable.innerText).contains('Name EN');
    //Delete data
    await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create6.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('No data to display')
})

test.meta({ type: 'base' })
    
    ('#36535: Check translated data when edit Payment at default language', async t => {
    const create7 = new ManagePayment()
    //Create payment
    await create7.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit payment
        await payment.filterPayment(create7.codeValue)
        await payment.editPayment1(create7.codeValue,'Name update DE', 'Text update DE')
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(5000)
    //Assert
        await payment.filterPayment(create7.codeValue)
        await t
            .click(indexSelector.editBtn)
            .click(detailsSelector.translateBtn)
            .wait(2000)
            .expect(translateDetail.nameDEBox.value).contains('Name update DE')
           .expect(translateDetail.nameENBox.value).contains(create7.nameValue)
            .expect(translateDetail.nameFRBox.value).contains(create7.nameValue)
            .expect(translateDetail.textDEBox.value).contains('Text update DE')
            .expect(translateDetail.textENBox.value).contains(create7.textValue)
            .expect(translateDetail.textFRBox.value).contains(create7.textValue)
            .click(translateDetail.cancelBtn)
            .click(detailsSelector.backBtn)
    //Delete data
    await payment.filterPayment(create7.codeValue)
    await payment.deletePayment()
    await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')

})


test.meta({ type: 'base' })
    ('#36336: Check translated data when edit Payment at EN language', async t => {
    const create8 = new ManagePayment()
    //Create setting-context
    await create8.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Swicth language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(4000);
    //Edit setting-context
        await payment.filterPayment(create8.codeValue)
        await payment.editPayment1(create8.codeValue,'Name update EN', 'Text update EN')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert
    await payment.filterPayment(create8.codeValue)
    await t
        .click(indexSelector.editBtn)
        .click(detailsSelector.translateBtn)
        .expect(translateDetail.nameENBox.value).contains('Name update EN')
        .expect(translateDetail.nameDEBox.value).contains(create8.nameValue)
        .expect(translateDetail.nameFRBox.value).contains(create8.nameValue)
        .expect(translateDetail.textENBox.value).contains('Text update EN')
        .expect(translateDetail.textDEBox.value).contains(create8.textValue)
        .expect(translateDetail.textFRBox.value).contains(create8.textValue)
        .click(translateDetail.cancelBtn)
        .click(detailsSelector.backBtn)
    //Delete data
    
    await payment.filterPayment(create8.codeValue)
    await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('No data to display')
})

test.meta({ type: 'base' })
   
    ('#36337: Check translated data when edit Payment at FE language', async t => {
    const create9 = new ManagePayment()
    //Create setting-context
    await create9.createPayment2()
    await t.click(detailsSelector.saveCloseBtn)
    //Swicth language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(4000);
    //Edit setting-context
        await payment.filterPayment(create9.codeValue)
        await payment.editPayment1(create9.codeValue,'Name update FE', 'Text update FE')
    await t.click(detailsSelector.saveCloseBtn)
    //Assert
    await payment.filterPayment(create9.codeValue)
    await t
        .click(indexSelector.editBtn)
        .click(detailsSelector.translateBtn)
        .expect(translateDetail.nameFRBox.value).contains('Name update FE')
        .expect(translateDetail.nameENBox.value).contains(create9.nameValue)
        .expect(translateDetail.nameDEBox.value).contains(create9.nameValue)
        .expect(translateDetail.textFRBox.value).contains('Text update FE')
        .expect(translateDetail.textENBox.value).contains(create9.textValue)
        .expect(translateDetail.textDEBox.value).contains(create9.textValue)
        .click(translateDetail.cancelBtn)
        .click(detailsSelector.backBtn)
    //Delete data
    await payment.filterPayment(create9.codeValue)
    await payment.deletePayment() 
        await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
   
    ('#36538/365639/#36540: Check translated data when edit form data translation at default language', async t => {
    const create10 = new ManagePayment()
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create10.codeValue);
    //Create translated data
    await translate.createTranslate()
    await t.click(detailsSelector.saveCloseBtn)
    //Edit translate data
        await payment.filterPayment(create10.codeValue)
        await t.click(indexSelector.editBtn)
        await translate.editTranslate()
        await t.click(detailsSelector.saveCloseBtn)
    //Assert  after edit translate data
        await payment.filterPayment(create10.codeValue)
        await t.click(indexSelector.editBtn)
    await t
        //Assert in view detail
        .expect(detailsSelector.nameBox.value).contains('Name update DE')
        .expect(detailsSelector.textBox.value).contains('Text update DE')
        .click(detailsSelector.backBtn)
        //Assert in view table
        .expect(indexSelector.paymentTable.innerText).contains('Name update DE')
        .expect(indexSelector.paymentTable.innerText).contains('Text update DE');
    //Check when switch to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(3000);
    //Assert after switch to EN language
    await payment.filterPayment(create10.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update EN')
        .expect(indexSelector.paymentTable.innerText).contains('Text update EN');
    //Check when switch to FR language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(3000);
    //Assert after switch to FR language
    await payment.filterPayment(create10.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update FR')
        .expect(indexSelector.paymentTable.innerText).contains('Text update FR');
        //Delete data
        await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create10.codeValue)
    await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
    ('#36541/365642/#36543: Check translated data when edit form data translation at EN language', async t => {
    const create11 = new ManagePayment()

    //Switch to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(3000);
   
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create11.codeValue);
    //Create translated data
    await translate.createTranslate()
    await t.click(detailsSelector.saveCloseBtn);
    //Edit translate data
    await payment.filterPayment(create11.codeValue)
        await t.click(indexSelector.editBtn)
        await translate.editTranslate()
        await t.click(detailsSelector.saveCloseBtn)
        //Assert  after edit translate data
        await payment.filterPayment(create11.codeValue)
        await t.click(indexSelector.editBtn)
        await t
        //Assert in view detail
        .expect(detailsSelector.nameBox.value).contains('Name update EN')
        .expect(detailsSelector.textBox.value).contains('Text update EN')
            .click(detailsSelector.backBtn)
        //Assert in view table
        .expect(indexSelector.paymentTable.innerText).contains('Name update EN')
        .expect(indexSelector.paymentTable.innerText).contains('Text update EN');
    //Check when switch to DN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageDEDrop)
        .wait(3000);
    //Assert after switch to EN language
    await payment.filterPayment(create11.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update DE')
        .expect(indexSelector.paymentTable.innerText).contains('Text update DE');
    //Check when switch to FR language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(3000);
    //Assert after switch to FR language
    await payment.filterPayment(create11.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update FR')
        .expect(indexSelector.paymentTable.innerText).contains('Text update FR');
        //Delete data
        await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create11.codeValue)
    await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Aucune donnée à afficher')
})

test.meta({ type: 'base' })
    ('#36544/365645/#36546: Check translated data when edit form data translation at FE language', async t => {

    const create12 = new ManagePayment()

    //Switch to FE language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageFRDrop)
        .wait(3000);
    //Create payment
    await t
        .click(indexSelector.addBtn)
        .typeText(detailsSelector.codeBox, create12.codeValue);
    //Create translated data
    await translate.createTranslate()
    await t.click(detailsSelector.saveCloseBtn);
    //Edit translate data
    await payment.filterPayment(create12.codeValue)
        await t.click(indexSelector.editBtn)
        await translate.editTranslate()
        await t.click(detailsSelector.saveCloseBtn)
        //Assert  after edit translate data
        await payment.filterPayment(create12.codeValue)
        await t.click(indexSelector.editBtn)
    await t
        //Assert in view detail
        .expect(detailsSelector.nameBox.value).contains('Name update FR')
        .expect(detailsSelector.textBox.value).contains('Text update FR')
        .click(detailsSelector.backBtn)
        //Assert in view table
        .expect(indexSelector.paymentTable.innerText).contains('Name update FR')
        .expect(indexSelector.paymentTable.innerText).contains('Text update FR');
    //Check when switch to DE language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageDEDrop)
        .wait(3000);
    //Assert after switch to DE language
    await payment.filterPayment(create12.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update DE')
        .expect(indexSelector.paymentTable.innerText).contains('Text update DE');
    //Check when switch to EN language
    await t
        .click(translateIndex.languageToggle)
        .click(translateIndex.languageENDrop)
        .wait(3000);
    //Assert after switch to FR language
    await payment.filterPayment(create12.codeValue)
    await t
        .expect(indexSelector.paymentTable.innerText).contains('Name update EN')
        .expect(indexSelector.paymentTable.innerText).contains('Text update EN');
        //Delete data
        await t.click(indexSelector.clearFilterBtn)
    await payment.filterPayment(create12.codeValue)
    await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('No data to display')
})

