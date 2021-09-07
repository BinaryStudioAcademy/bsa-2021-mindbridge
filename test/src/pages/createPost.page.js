const { Input, Button } = require('../elements');


class CreatePostPage {
    constructor(){
        this.titleOfArticle = new Input ('input[placeholder="Enter the title of the article"');
        this.postContent = new Input ('div.se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable');
        this.publishButton = new Button ("//button[contains(text(), 'Publish')]");
        this.tag = new Button('div[role="combobox"]');
        this.tagOptions = new Button('div[role="option"]=TEXT_TO_REPLACE');
                               
    }

    async  CreatePost({title, content, tag}){
        await this.titleOfArticle.setValue(title);
        await this.postContent.setValue(content);
        await this.tag.click();
        await this.tagOptions.clickByText(tag);
        await this.publishButton.click();
                
    }   
    
    

}
module.exports = {CreatePostPage};