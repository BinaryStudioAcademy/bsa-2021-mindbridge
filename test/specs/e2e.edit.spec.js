const { expect } = require('chai');

const { App } = require('../src/pages');

const app = new App();

describe('Edit profile information', function() {

    beforeEach(async function() {

        await browser.setWindowSize(1440, 960);
        await browser.url('/');

        await app.homePage.goToLogInForm();

        await app.signinPage.login({
            email: 'walton.schmitt@yahoo.com',
            password: 'mindbridge'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/';
        }, { timeout: 5000 }, );

        await app.homePage.goToProfile();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/user/99057c64-f5fa-49ee-b257-a50b1cd169b8';
        }, { timeout: 5000 }, );
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to change profile data', async function() {

        await app.profilePage.editProfileInfo({
            name: 'Dan',
            surname: 'Smith',
            nickname: 'yami',
        });

        expect(await app.profilePage.getSuccessMsg()).to.eql({
            successMsg: 'Success'
        });

        await app.profilePage.editProfileInfo({
            name: 'Marlin',
            surname: 'Rosenbaum',
            nickname: 'Gustor',
        });

    });

    it('should be able to change password', async function() {

        await app.profilePage.editPassword({
            currentPassword: 'mindbridge',
            newPassword: 'Pa55word',
        });

        expect(await app.profilePage.getSuccessMsg()).to.eql({
            successMsg: 'Success'
        });

        await app.profilePage.goToHome();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/';
        }, { timeout: 5000 }, );

        await app.homePage.signOut();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/login';
        }, { timeout: 5000 }, );

        await app.signinPage.login({
            email: 'walton.schmitt@yahoo.com',
            password: 'Pa55word'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/';
        }, { timeout: 5000 }, );

        expect(await app.homePage.getNameText()).to.eql({
            nameText: 'Marlin Rosenbaum'
        });

        await app.homePage.goToProfile();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/user/99057c64-f5fa-49ee-b257-a50b1cd169b8';
        }, { timeout: 5000 }, );

        await app.profilePage.editPassword({
            currentPassword: 'Pa55word',
            newPassword: 'mindbridge',
        });

        expect(await app.profilePage.getSuccessMsg()).to.eql({
            successMsg: 'Success'
        });
    });

});