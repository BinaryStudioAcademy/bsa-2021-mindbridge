const { expect } = require('chai');
const  {App} = require('../src/pages');

const randomTitle = require('random-title');
const randomSentence = require('random-sentence');

const app = new App();



describe('Create Post:', function(){

    beforeEach(async function () {
        //await browser.setWindowSize(1440, 960);
        await browser.url('/login');

        await app.signinPage.login({
            email: 'testt@gmail.com',
            password: '12345',
        });

    });

    afterEach(async function () {
        await browser.reloadSession();
    }); 

  

    it('Shoud be able to create new post', async function(){
                        
        await app.homePage.goToCreatePostPage();

        const titleOfArticle =  randomTitle();       
        await app.createPostPage.CreatePost({
            title: titleOfArticle,
            content: randomSentence(),
            tag: 'Eclipse',
        });

        await browser.pause(5000);
                
        const postTitle = await $('div[class="styles_postName__jEqUk"]').getText();
        
        expect(postTitle).to.include(titleOfArticle);         

    })

});