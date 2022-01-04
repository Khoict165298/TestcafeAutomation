import { Selector, t } from "testcafe"
import PageDetailsSelector from "../selectors/page.details.selector";
import PageIndexSelector from "../selectors/page.index.selector";
import Utils from "../../../commons/utils";

const detailsSelector = new PageDetailsSelector();
const indexSelector = new PageIndexSelector();
const randomData = new Utils();


class CreateSettingContext {
    constructor() {
        this.codeValue = randomData.getText('Autotest_', 15);
        this.nameValue = randomData.getText('Autotest ', 15);
        this.descriptionValue = randomData.getText('Autotest ', 15);
    }
    async createAcc(code, name, discription) {
        await t
            .click(indexSelector.addBtn)
            .typeText(detailsSelector.codelBox, this.codeValue)
            .typeText(detailsSelector.nameBox, this.nameValue)
            .typeText(detailsSelector.descriptionBox, this.descriptionValue)
            .click(detailsSelector.systemCheckBox)
            .click(detailsSelector.activeCheckBox)
    }
}
export default CreateSettingContext