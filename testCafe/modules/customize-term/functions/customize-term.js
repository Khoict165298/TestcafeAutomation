import { Selector, t } from "testcafe"
import PageCustomizeTermsSelector from "../selectors/page.customize-term.selector";

const custom_term = new PageCustomizeTermsSelector();

class CustomizeTerm {
    async selectTerm(term) {
        await t
            .click(custom_term.customizeTermMenu)
            .pressKey('ctrl+a delete')
            .typeText(custom_term.codeFilter, term)
            .pressKey('enter')
            .click(custom_term.editBtn)
    }

    async updateTerm(value) {
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, value)
            .click(custom_term.updateBtn)
            .wait(3000)
    }
}
export default CustomizeTerm


