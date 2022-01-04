
import { Selector } from "testcafe";

export default class PageLogoutSelector {
    constructor() {
        this.userProfileBtn = Selector('i[title="User Info"]')
        this.logoutDropdown = Selector('a').withText('Ausloggen')
    }
}
