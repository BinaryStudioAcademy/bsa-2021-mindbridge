const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

const randomNumber = () => Math.floor(Math.random() * 10000).toString();

describe('Log in', function() {

    beforeEach(async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/');
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to sign up', async function() {

        const nickNameNumber = randomNumber();

        await app.homePage.goToSignUpForm();

        await app.signupPage.signup({
            firstName: 'John',
            lastName: 'Smith',
            nickname: `smithy${nickNameNumber}`,
            email: `johnsmith${nickNameNumber}@gmail.com`,
            password: 'Pa55word',
            passwordConfirm: 'Pa55word',
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/';
        }, { timeout: 5000 }, );

        expect(await app.homePage.getNameText()).to.eql({
            nameText: 'John Smith'
        });

    });

});