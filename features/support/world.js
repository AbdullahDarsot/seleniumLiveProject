require('chromedriver'); // So executable is available

const {setWorldConstructor} = require("@cucumber/cucumber");
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');

class CustomWorld {
    constructor() {
        this.headless = null;
        this.text = null;
    }

    /**
     * Constructs an emulated 'headless' Chrome browser
     */
    browserBuild() {
        const options = new chrome.Options()
            .headless()
            .setAcceptInsecureCerts(true)
            .windowSize({width: 1920, height: 1200});

        this.headless = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    /**
     * Emulates closing the 'headless' Chrome browser
     */
    async browserExit() {
        await this.headless.quit();
    }

    /**
     * Navigates to specified URL in the 'headless' Chrome browser
     */
    async browserNavigate(url) {
        await this.headless.get(url);
    }
    
    /**
     * Emulates clicking element of the specified id
     */
    async elementClick(id) {
        const element = await this.getElement(id);
        element.click();
    }

    /**
     * Returns color of specified element as a string in the format:
     * 'rgba(<red>, <green>, <blue>, <alpha transparency>)'
     */
    async elementColor(id) {
        const element = await this.getElement(id);
        return await element.getCssValue('color');
    }

    /**
     * Emulates hovering the mouse over the element of the specified id
     */
    async elementHover(id) {
        const element = await this.getElement(id);
        const actions = this.headless.actions({async: true});
        await actions.move({origin: element}).perform();
    }

    async getElement(id) {
        const selector = webdriver.By.id(id);
        return await this.headless.findElement(selector);
    }

    async getElementByCss(css) {
        const selector = webdriver.By.css(css);
        return await this.headless.findElement(selector);
    }

    /**
     * To know when a page has loaded, it's useful to wait for an element to exist
     */
    async waitForElementByCss(css, timeout) {
        const selector = webdriver.By.css(css);
        await this.headless.wait(webdriver.until.elementLocated(selector), timeout, 2000);
    }
}

setWorldConstructor(CustomWorld);