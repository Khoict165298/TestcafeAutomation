import { Selector, t } from "testcafe"
import PageIndexSelector from "../selectors/page.index.selector";

const indexSelector = new PageIndexSelector();

class DeleteSettingContext {
    async delete(codeSearch) {
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a')
            .pressKey('delete')
            .typeText(indexSelector.searchBox, codeSearch)
            .pressKey('enter')
            .click(indexSelector.deleteBtn)
            .click(indexSelector.confirmDeleteBtn);
    }
}
export default DeleteSettingContext