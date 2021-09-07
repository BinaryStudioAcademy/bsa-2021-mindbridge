const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

describe('Log in', function() {

    beforeEach(async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/');
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to log in', async function() {

        await app.homePage.goToLogInForm();

        await app.signinPage.login({
            email: 'testt@gmail.com',
            password: '12345'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/';
        }, { timeout: 5000 }, );

        expect(await app.homePage.getNameText()).to.eql({
            nameText: 'Test'
        });

    });

});