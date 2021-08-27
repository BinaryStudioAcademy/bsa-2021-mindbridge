const { SignInPage } = require('./signin.page');
const { SignUpPage } = require('./signup.page');
const { HomePage } = require('./home.page');
const { ProfilePage } = require('./profile.page');

class App {
    constructor() {
        this.signinPage = new SignInPage();
        this.signupPage = new SignUpPage();
        this.homePage = new HomePage();
        this.profilePage = new ProfilePage();
    }
}

module.exports = { App };