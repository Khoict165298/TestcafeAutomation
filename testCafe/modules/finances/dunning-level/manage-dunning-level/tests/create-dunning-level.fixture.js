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

fixture`Finance - Dunning level: Create dunning`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.financeMenu)
        await t.click(indexSelector.dunningLevelsMenu);
    })

test.meta({ type: 'basis' })
    ('#36334: Create dunning with Save and Close button', async t => {
        const dunningTC1 = new ManageDunningLevel()

        //Create dunning level
        await dunningTC1.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        await dunning.filterDunning(dunningTC1.codeValue)
        //Assert 
        await t
            .expect(indexSelector.dunningTable.innerText).contains(dunningTC1.codeValue)
            .expect(indexSelector.dunningTable.innerText).contains(dunningTC1.nameValue)
        //Delete dunning level
        await dunning.deleteDunning()
        await dunning.filterDunning(dunningTC1.codeValue)
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36335: Create dunning with Save and New button', async t => {
        const dunningTC2 = new ManageDunningLevel()

        //Create dunning level
        await dunningTC2.createDunningLevels()
        await t.click(detailsSelector.saveNewBtn)
        await t.click(detailsSelector.backBtn);
        //Assert 
        await dunning.filterDunning(dunningTC2.codeValue)
        await t
            .expect(indexSelector.dunningTable.innerText).contains(dunningTC2.codeValue)
            .expect(indexSelector.dunningTable.innerText).contains(dunningTC2.nameValue)
        //Delete dunning level
        await dunning.deleteDunning()
        await dunning.filterDunning(dunningTC2.codeValue)
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36336: Create dunning with blank Code', async t => {
        //Create dunning
        await dunning.createDunningconfig(' ', '30 net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Der Code ist erforderlich.')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
})

test.meta({ type: 'basis' })
    ('#36337: Create dunning level with duplicate Code', async t => {
        const dunningTC4 = new ManageDunningLevel()
    
        //Create the first dunning level 
        await dunningTC4.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Create the second dunning level 
        await dunningTC4.createDunningLevels()
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.errorMessage.innerText).contains('Dieser ISO-Code existiert bereits')
            .click(detailsSelector.closeErrorMessage)
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
        //Delete dunning level
        await dunning.filterDunning(dunningTC4.codeValue)
        await dunning.deleteDunning()
        await t.expect(indexSelector.dunningTable.innerText).contains('Keine Daten zum Anzeigen')
})

test.meta({ type: 'basis' })
    ('#36338: Create dunning level with Code more than 50 characters', async t => {
        //Create dunning level
        await dunning.createDunningconfig('Test new code Test new codeTest new codeTest new codeTest new codeTest new code', '30 net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 50 Zeichen')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
})

test.meta({ type: 'basis' })
    ('#36339: Create dunning level with blank Name', async t => {
        //Create dunning level
        await dunning.createDunningconfig('Dunning level code ', ' ')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Der Name ist erforderlich.')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
})

test.meta({ type: 'basis' })
    ('#36340: Create dunning level with Name more than 254 characters', async t => {
        //Create dunning level
        await dunning.createDunningconfig('Dunning level code ', 'Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name Test dunning level Name', '30 Net')
        await t.click(detailsSelector.saveCloseBtn)
        //Assert 
        await t
            .expect(detailsSelector.vldMessage.innerText).contains('Die maximale Länge beträgt 254 Zeichen')
        //Back to dunning level list
        await t.click(detailsSelector.backBtn)
})

