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


fixture`Finance - Payment: Copy payment`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
    })

test
    /*Scenario: #36227/36239: Check concurrency when users edit payment with Override option'
      - Open browser, login with user 1, edit a payment
      - Open new browser, login with user 2, edit the same payment with user 1, click Save
      - Back to user 1, click Save
      - Click Override
       */
    ('#36227/36239: Check concurrency when both users edit the same payment with Override option', async t => {
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);
        const create1 = new ManagePayment()
        const edit11 = new ManagePayment()
        const edit12 = new ManagePayment()
            
        //Create payment term at window 1
        await t.switchToWindow(initialWindow);
        await create1.createPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit payment at window 1
        await payment.filterPayment(create1.codeValue)
        await edit11.editPayment2()

        //Edit payment term at window 2
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password)
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
        await payment.filterPayment(create1.codeValue)
        await edit12.editPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 1
        await t.switchToWindow(initialWindow);
        await t.click(detailsSelector.saveCloseBtn)      
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit12.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit12.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit12.textValue)

        //Override information
        await t.click(detailsSelector.overrideBtn)
        //Assert
        await payment.filterPayment(edit11.codeValue)
        await t
            .expect(indexSelector.paymentTable.innerText).contains(edit11.codeValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit11.nameValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit11.textValue)
        //Delete data
        await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test
    /*Scenario: #36227/36240: Check concurrency when users edit currency with Refresh option'
      - Open browser, login with user 1, edit a payment
      - Open new browser, login with user 2, edit the same payment with user 1, click Save
      - Back to user 1, click Save
      - Click Refresh
       */
    ('#36227/36240: Check concurrency when both users edit the same payment with Refresh option', async t => {
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);
        const create2 = new ManagePayment()
        const edit21 = new ManagePayment()
        const edit22 = new ManagePayment()

        //Create payment term at window 1
        await t.switchToWindow(initialWindow);
        await create2.createPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit payment at window 1
        await payment.filterPayment(create2.codeValue)
        await edit21.editPayment2()

        //Edit payment term at window 2
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password)
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
        await payment.filterPayment(create2.codeValue)
        await edit22.editPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 1
        await t.switchToWindow(initialWindow);
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit22.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit22.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit22.textValue)

        await t.click(detailsSelector.refreshBtn)
        await t.wait(2000)
        await t.expect(detailsSelector.codeBox.value).contains(edit22.codeValue)
        await t.expect(detailsSelector.nameBox.value).contains(edit22.nameValue)
        await t.expect(detailsSelector.textBox.value).contains(edit22.textValue)
        await t.click(detailsSelector.backBtn)
        //Assert
        await payment.filterPayment(edit22.codeValue)
        await t
            .expect(indexSelector.paymentTable.innerText).contains(edit22.codeValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit22.nameValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit22.textValue)
        //Delete data
        await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test
    /*Scenario: #36227/36241: Check concurrency when users edit currency with Cancel option'
      - Open browser, login with user 1, edit a payment
      - Open new browser, login with user 2, edit the same payment with user 1, click Save
      - Back to user 1, click Save
      - Click Cancel
       */
    ('#36227/36241: Check concurrency when both users edit the same payment with Cancel option', async t => {
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);
        const create3 = new ManagePayment()
        const edit31 = new ManagePayment()
        const edit32 = new ManagePayment()

        //Create payment term at window 1
        await t.switchToWindow(initialWindow);
        await create3.createPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit payment at window 1
        await payment.filterPayment(create3.codeValue)
        await edit31.editPayment2()

        //Edit payment term at window 2
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password)
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
        await payment.filterPayment(create3.codeValue)
        await edit32.editPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 1
        await t.switchToWindow(initialWindow);
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit32.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit32.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(edit32.textValue)

        await t.click(detailsSelector.cancelBtn)
        await t.expect(detailsSelector.codeBox.value).contains(edit31.codeValue)
        await t.expect(detailsSelector.nameBox.value).contains(edit31.nameValue)
        await t.expect(detailsSelector.textBox.value).contains(edit31.textValue)
        await t.click(detailsSelector.backBtn)
        //Assert
        await payment.filterPayment(edit32.codeValue)
        await t
            .expect(indexSelector.paymentTable.innerText).contains(edit32.codeValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit32.nameValue)
            .expect(indexSelector.paymentTable.innerText).contains(edit32.textValue)
        //Delete data
        await payment.deletePayment()
        await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test
    /*Scenario: #36253: Check concurrency when users delete the same payment'
       - Open browser, login with user 1, delete a payment
       - Open new browser, login with user 2, delete the same payment with user 1, click Save
       - Back to user 1, click Save
       - Click Cancel
        */
    ('#36253: Check concurrency when both users delete the same payment', async t => {
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);
        const create4 = new ManagePayment()
       
        //Create payment term at window 1
        await t.switchToWindow(initialWindow);
        await create4.createPayment2()
        await t.click(detailsSelector.saveCloseBtn)
        // Delete payment at window 1
        await payment.filterPayment(create4.codeValue)
        await t.click(indexSelector.deleteBtn)

        //Delete payment term at window 2
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password)
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
        await payment.filterPayment(create4.codeValue)
        await payment.deletePayment()
        //switch to window 1
        await t.switchToWindow(initialWindow);
        await t.click(indexSelector.confirmDeleteBtn)
            .wait(2000)
            .expect(detailsSelector.errorMessage.innerText).contains('Kann nicht gelöscht werden. Der Datensatz wurde von einem anderen Benutzer gelöscht.')
            .click(detailsSelector.closeErrorMessage)
        //Assert
        await payment.filterPayment(create4.codeValue)
        await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')
    })

test
    /*Scenario:  #36229: Check concurrency when user 1 delete and user 2 edit the same payment'
   - Open browser, login with user 1, delete a payment
   - Open new browser, login with user 2, edit the same payment with user 1
   - Back to user 1, click Save
   - Back to user 2, click Save
*/
    .meta({ type: 'base' })
    ('#36229: Check concurrency when user 1 delete and user 2 edit the same payment', async t => {
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);
        const create5 = new ManagePayment()
        const edit52= new ManagePayment()
       
        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await create5.createPayment2()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await payment.filterPayment(create5.codeValue)
        await t.click(indexSelector.deleteBtn)

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password)
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.paymentMenu)
        //Open detail view at second Window and edit that account
        await payment.filterPayment(create5.codeValue)
        await edit52.editPayment2()
        
        //Open the first window
        await t.switchToWindow(initialWindow);
        await t
            .click(indexSelector.confirmDeleteBtn)
            .wait(2000);

        //Open second browser
        await t.switchToWindow(window1);
        await t.click(detailsSelector.saveCloseBtn);
        //Assert
        await t.expect(detailsSelector.errorMessage.innerText).contains('Speichern nicht möglich. Die Abteilung wurde von einem anderen Benutzer gelöscht.')
        await t.click(detailsSelector.closeErrorMessage)
        //Assert
        await payment.filterPayment(create5.codeValue)
        await t.expect(indexSelector.paymentTable.innerText).contains('Keine Daten zum Anzeigen')

    });