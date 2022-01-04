import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import DunningIndexSelector from "../selectors/dunning.index.selector";
import DunningDetailSelector from "../selectors/dunning.detail.selector";
import ManageDunningLevel from "../functions/manage-dunning-level"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new DunningDetailSelector();
const indexSelector = new DunningIndexSelector();
const dunning = new ManageDunningLevel()

fixture`Finance - Dunning level: Edit dunning`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.dunningLevelsMenu);
    })

test.meta({ type: 'basis' })
    ('#36334: Create dunning with Save and Close button', async t => {
        const createDunningTC1 = new ManageDunningLevel()
        const editDunningTC1 = new ManageDunningLevel()

        //Create dunning level
        await createDunningTC1.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit dunning
        await dunning.filterDunning(createDunningTC1.codeValue)
        await editDunningTC1.editDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await dunning.filterDunning(editDunningTC1.codeValue)
        await t
            .expect(indexSelector.dunningTable.innerText).contains(editDunningTC1.codeValue)
            .expect(indexSelector.dunningTable.innerText).contains(editDunningTC1.nameValue)
        //Delete dunning level
        await dunning.deleteDunning()
        await dunning.filterDunning(editDunningTC1.codeValue)
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36335: Edit dunning with Save and New button', async t => {
        const createDunningTC2 = new ManageDunningLevel()
        const editDunningTC2 = new ManageDunningLevel()

        //Create dunning level
        await createDunningTC2.createDunningLevels()
        await t.click(detailsSelector.saveNewBtn)
        await t.click(detailsSelector.backBtn)
         //Edit dunning
        await dunning.filterDunning(createDunningTC2.codeValue)
        await editDunningTC2.editDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await dunning.filterDunning(editDunningTC2.codeValue)
        await t
            .expect(indexSelector.dunningTable.innerText).contains(editDunningTC2.codeValue)
            .expect(indexSelector.dunningTable.innerText).contains(editDunningTC2.nameValue)
        //Delete dunning level
        await dunning.deleteDunning()
        await dunning.filterDunning(editDunningTC2.codeValue)
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36336: Edit dunning with blank Code', async t => {
        const createDunningTC3 = new ManageDunningLevel()
        //Create dunning
        await createDunningTC3.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit dunning
        await dunning.filterDunning(createDunningTC3.codeValue)
        await dunning.editDunningConfig(' ', '30 net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Der Code ist erforderlich.')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        await dunning.filterDunning(createDunningTC3.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36337: Edit dunning level with duplicate Code', async t => {
        const createDunningTC4a = new ManageDunningLevel()
        const createDunningTC4b = new ManageDunningLevel()

        //Create the first dunning level 
        await createDunningTC4a.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Create the second dunning level 
        await createDunningTC4b.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit the second dunning level
        await dunning.filterDunning(createDunningTC4b.codeValue)
        await dunning.editDunningConfig(createDunningTC4a.codeValue, '30 net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Dieser ISO-Code existiert bereits')
            .click(detailsSelector.closeErrorMessage)
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        //Delete the first dunning level
        await dunning.filterDunning(createDunningTC4a.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
        //Delete the second dunning level
        await dunning.filterDunning(createDunningTC4b.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36338: Edit dunning level with Code more than 50 characters', async t => {
        const createDunningTC5 = new ManageDunningLevel()
        //Create dunning
        await createDunningTC5.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit dunning
        await dunning.filterDunning(createDunningTC5.codeValue)
        await dunning.editDunningConfig('Test new code Test new codeTest new codeTest new codeTest new codeTest new code', '30 net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 50 Zeichen')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        //Delete data
        await dunning.filterDunning(createDunningTC5.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36339: Edit dunning level with blank Name', async t => {
        const createDunningTC6 = new ManageDunningLevel()
        //Create dunning
        await createDunningTC6.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit dunning
        await dunning.filterDunning(createDunningTC6.codeValue)
        await dunning.editDunningConfig('Dunning level code ', ' ')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Der Name ist erforderlich.')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        //Delete data
        await dunning.filterDunning(createDunningTC6.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36340: Edit dunning level with Name more than 254 characters', async t => {
        const createDunningTC7 = new ManageDunningLevel()
        //Create dunning
        await createDunningTC7.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Edit dunning
        await dunning.filterDunning(createDunningTC7.codeValue)
        await dunning.editDunningConfig('Dunning level code ', 'Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name', '30 Net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        //Delete the second dunning level
        await dunning.filterDunning(createDunningTC7.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

