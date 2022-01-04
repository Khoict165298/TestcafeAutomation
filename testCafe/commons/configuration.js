import { Selector, t } from "testcafe"
class Configuration {
    constructor() {
        this.UrlAdmin = 'https://xxxxxxxxxxxx'
        this.UserName = 'user4'
        this.Password = '12345678';
    }
    async configBeforeEach() {
        await t.setTestSpeed(0.7)
        await t.maximizeWindow()
        await t.wait(5000)
    }
}
export default Configuration;
