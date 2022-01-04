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

fixture`Manage currency: Concurrency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
    })

test
    /*Scenario: #36153/#36166: Check concurrency when users edit currency with Override option'
      - Open browser, login with user 1, edit a currency
      - Open new browser, login with user 2, edit the same currency with user 1, click Save
      - Back to user 1, click Save
      - Click Override
       */
    .meta({ type: 'base' })
    ('#36153/#36166: Check concurrency when both users edit the same currency with Override option', async t => {
        const currencyTC1a = new ManageCurrency()
        const currencyTC1b = new ManageCurrency()
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);

        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await currencyTC1a.createCurrency()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await currencyTC1a.filterCurrency(currencyTC1a.ISOcodeValue)
        await currencyTC1a.editCurrency()

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(7000)
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
        //Open detail view at second Window and edit that account
        await currencyTC1b.filterCurrency(currencyTC1a.ISOcodeValue)
        await currencyTC1b.editCurrency()
        await t.click(detailsSelector.saveCloseBtn);

        //Open the first window
        await t.switchToWindow(initialWindow);
        await t
            .click(detailsSelector.saveCloseBtn)
            .wait(2000);
        //Assert
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
            .expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
            .expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
            .expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC1b.editISOcodeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC1b.editNameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC1b.editCodeValue)
        //Override information
        await t.click(detailsSelector.overrideBtn)
        //Assert
        await currencyTC1a.filterCurrency(currencyTC1a.editISOcodeValue)
        await t
            .expect(indexSelector.currencyTable.innerText).contains(currencyTC1a.editISOcodeValue)
        //Delete data
        await currencyTC1a.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')

    });

test
    
    /*Scenario: #36153/#36167: Check concurrency when users edit currency with Refresh option'
       - Open browser, login with user 1, edit a currency
       - Open new browser, login with user 2, edit the same currency with user 1, click Save
       - Back to user 1, click Save
       - Click Refresh
        */
    .meta({ type: 'base' })
    ('#36153/#36167: Check concurrency when both users edit the same currency with Refresh option', async t => {
        const currencyTC2a = new ManageCurrency()
        const currencyTC2b = new ManageCurrency()
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);

        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await currencyTC2a.createCurrency()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await currencyTC2a.filterCurrency(currencyTC2a.ISOcodeValue)
        await currencyTC2a.editCurrency()

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(4000)
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
        //Open detail view at second Window and edit that account
        await currencyTC2a.filterCurrency(currencyTC2a.ISOcodeValue)
        await currencyTC2b.editCurrency()
        await t.click(detailsSelector.saveCloseBtn);

        //Open the first window
        await t.switchToWindow(initialWindow);
        await t
            .click(detailsSelector.saveCloseBtn)
            .wait(2000);
        //Assert 
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
            .expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
            .expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
            .expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC2b.editISOcodeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC2b.editNameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC2b.editCodeValue)
        //Refresh information
        await t.click(detailsSelector.refreshBtn)
        //Assert
        await t.expect(detailsSelector.isocodeBox.value).contains(currencyTC2b.editISOcodeValue)
        await t.expect(detailsSelector.nameBox.value).contains(currencyTC2b.editNameValue)
        await t.expect(detailsSelector.codeBox.value).contains(currencyTC2b.editCodeValue)
        await t.click(detailsSelector.backBtn)
        //Assert
        await currencyTC2b.filterCurrency(currencyTC2b.editISOcodeValue)
        await t
            .expect(indexSelector.currencyTable.innerText).contains(currencyTC2b.editISOcodeValue)
        //Delete data
        await currencyTC2b.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')

    });

test
    /*Scenario: #36153/#36168: Check concurrency when users edit currency with Cancel option'
       - Open browser, login with user 1, edit a currency
       - Open new browser, login with user 2, edit the same currency with user 1, click Save
       - Back to user 1, click Save
       - Click Cancel
        */
    .meta({ type: 'base' })
    ('#36153/#36168: Check concurrency when both users edit the same currency with Cancel option', async t => {
        const currencyTC3a = new ManageCurrency()
        const currencyTC3b = new ManageCurrency()
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);

        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await currencyTC3a.createCurrency()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await currencyTC3a.filterCurrency(currencyTC3a.ISOcodeValue)
        await currencyTC3a.editCurrency()

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(4000)
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
        //Open detail view at second Window and edit that account
        await currencyTC3a.filterCurrency(currencyTC3a.ISOcodeValue)
        await currencyTC3b.editCurrency()
        await t.click(detailsSelector.saveCloseBtn);

        //Open the first window
        await t.switchToWindow(initialWindow);
        await t
            .click(detailsSelector.saveCloseBtn)
            .wait(2000);
        //Assert
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
            .expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
            .expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
            .expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC3b.editISOcodeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC3b.editNameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(currencyTC3b.editCodeValue)
        //Override information
        await t.click(detailsSelector.cancelBtn)
        //Assert
        await t.expect(detailsSelector.isocodeBox.value).contains(currencyTC3a.editISOcodeValue)
        await t.expect(detailsSelector.nameBox.value).contains(currencyTC3a.editNameValue)
        await t.expect(detailsSelector.codeBox.value).contains(currencyTC3a.editCodeValue)
        await t.click(detailsSelector.backBtn)
        //Assert
        await currencyTC3b.filterCurrency(currencyTC3b.editISOcodeValue)
        await t
            .expect(indexSelector.currencyTable.innerText).contains(currencyTC3b.editISOcodeValue)
        //Delete data
        await currencyTC3b.deleteCurrency()
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')

    });

test
    /*Scenario: #36161: Check concurrency when users delete the same currency'
       - Open browser, login with user 1, delete a currency
       - Open new browser, login with user 2, delete the same currency with user 1, click Save
       - Back to user 1, click Save
       - Click Cancel
        */
    .meta({ type: 'base' })
    ('#36161: Check concurrency when both users delete the same currency', async t => {
        const currencyTC4 = new ManageCurrency()
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);

        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await currencyTC4.createCurrency()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await currencyTC4.filterCurrency(currencyTC4.ISOcodeValue)
        await t.click(indexSelector.deleteBtn)

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(4000)
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
        //Open detail view at second Window and edit that account
        await currencyTC4.filterCurrency(currencyTC4.ISOcodeValue)
        await currencyTC4.deleteCurrency()

        //Open the first window
        await t.switchToWindow(initialWindow);
        await t
            .click(indexSelector.confirmDeleteBtn)
            .wait(2000)
            .expect(detailsSelector.errorMessage.innerText).contains('Kann nicht gelöscht werden. Der Datensatz wurde von einem anderen Benutzer gelöscht.')
            .click(detailsSelector.closeErrorMessage)
       
        //Assert
        await currencyTC4.filterCurrency(currencyTC4.ISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')

    });

test
    /*Scenario:  #36155: Check concurrency when user 1 delete and user 2 edit the same currency'
   - Open browser, login with user 1, delete a currency
   - Open new browser, login with user 2, edit the same currency with user 1
   - Back to user 1, click Save
   - Back to user 2, click Save
*/
    .meta({ type: 'base' })
    ('#36155: Check concurrency when user 1 delete and user 2 edit the same currency', async t => {
        const currencyTC5 = new ManageCurrency()
        const initialWindow = await t.getCurrentWindow();
        const window1 = await t.openWindow(config.UrlAdmin);

        //Create currency at initial Window
        await t.switchToWindow(initialWindow);
        await currencyTC5.createCurrency()
        await t.click(detailsSelector.saveCloseBtn);
        //Open detail view at initial Window
        await currencyTC5.filterCurrency(currencyTC5.ISOcodeValue)
        await t.click(indexSelector.deleteBtn)

        //Open second browser
        await t.switchToWindow(window1);
        await t.maximizeWindow()
        await t.wait(4000)
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.currencyMenu);
        //Open detail view at second Window and edit that currency
        await currencyTC5.filterCurrency(currencyTC5.ISOcodeValue)
        await currencyTC5.editCurrency()
        
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
        await currencyTC5.filterCurrency(currencyTC5.editISOcodeValue)
        await t.expect(indexSelector.currencyTable.innerText).contains('Keine Daten zum Anzeigen')

    });