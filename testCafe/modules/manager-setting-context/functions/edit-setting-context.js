import { Selector, t } from "testcafe"
import PageIndexSelector from "../selectors/page.index.selector";
import PageDetailsSelector from "../selectors/page.details.selector";
import Utils from "../../../commons/utils";

const detailsSelector = new PageDetailsSelector();
const indexSelector = new PageIndexSelector();
const randomData = new Utils();

class EditSettingContext {
    constructor() {
        this.codeValue = randomData.getText('Autotest_Update_', 21);
        this.nameValue = randomData.getText('Autotest Update ', 21);
        this.descriptionValue = randomData.getText('Autotest Update ', 21);
    }
    async searchToEdit(code) {
        //open edit form
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a')
            .pressKey('delete')
            .typeText(indexSelector.searchBox, code)
            .pressKey('enter')
            .click(indexSelector.editBnt);
    }
    async edit() {
        //edit data
        await t
            //edit code
            .click(detailsSelector.codelBox)
            .pressKey('ctrl+a')
            .pressKey('delete')
            .typeText(detailsSelector.codelBox, this.codeValue)
            //edit name
            .click(detailsSelector.nameBox)
            .pressKey('ctrl+a')
            .pressKey('delete')
            .typeText(detailsSelector.nameBox, this.nameValue)
            //edit description
            .click(detailsSelector.descriptionBox)
            .pressKey('ctrl+a')
            .pressKey('delete')
            .typeText(detailsSelector.descriptionBox, this.descriptionValue)
    }
}
export default EditSettingContext