import { Selector, t } from "testcafe"
import PageDetailsSelector from "../../manage-payment/selectors/payment.detail.selector";
import TranslatePaymentDetails from "../selectors/translate-payment.detail.selector";
import TranslatePaymentIndex from "../selectors/translate-payment.index.selector";

const pageDetailPayment = new PageDetailsSelector();
const translate = new TranslatePaymentDetails();

class TranslateData {
    async createTranslate() {
        await t
            .click(pageDetailPayment.translateBtn)
            .typeText(translate.textDEBox, 'Text DE')
            .typeText(translate.textENBox, 'Text EN')
            .typeText(translate.textFRBox, 'Text FR')
            .typeText(translate.nameDEBox, 'Name DE')
            .typeText(translate.nameENBox, 'Name EN')
            .typeText(translate.nameFRBox, 'Name FR')
            .click(translate.saveBtn);
    }

    async editTranslate() {
        await t
            .click(pageDetailPayment.translateBtn)
            .click(translate.textDEBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.textDEBox, 'Text update DE')
            .click(translate.textENBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.textENBox, 'Text update EN')
            .click(translate.textFRBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.textFRBox, 'Text update FR')
            .click(translate.nameDEBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.nameDEBox, 'Name update DE')
            .click(translate.nameENBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.nameENBox, 'Name update EN')
            .click(translate.nameFRBox)
            .pressKey('ctrl+a delete')
            .typeText(translate.nameFRBox, 'Name update FR')
            .click(translate.saveBtn);
    }
}
export default TranslateData