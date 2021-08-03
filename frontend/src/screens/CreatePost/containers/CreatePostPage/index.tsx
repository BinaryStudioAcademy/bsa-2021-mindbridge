import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';
import { IBindingAction } from '@root/models/Callbacks';
import { changeEditViewMod, changeHtmlMarkdownMod } from './reducer';
import CreatePostForm from '@root/components/CreatePostForm/CreatePastForm';
import Image_1 from './svg/svg1';
import Image_2 from './svg/svg2';
import Image_3 from './svg/svg3';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
  modes: {
    htmlMode: boolean,
    markdownMode: boolean,
    editMode: boolean,
    viewMode: boolean
  }
}

interface IActions {
  changeHtmlMarkdownMod: IBindingAction,
  changeEditViewMod: IBindingAction
}

//use real value
const notificationCount = 3;
const userName = "Charlie Culhane";
const avatar = "https://lh3.googleusercontent.com/proxy/-bkRSqw6vRpujAkZ8wupHS9ls_2fQvQw8rEBtNch1-5HELvgCrP5hx-k810ntE059vEPmsg4LeSsyh4";
const folloversCount = 6.6 + "K";
const rating = 5.4 + "K";
const postNotificationCount = 4;
const history = ["22 june, 7:50", "20 june, 13:10", "2 june, 13:50"]

const CreatePost: React.FC<ICreatePostProps> = (
  { modes, changeHtmlMarkdownMod, changeEditViewMod }
) => {
  console.log(modes);
  let htmlStyle = modes.htmlMode ? styles.blue_button : styles.colorless_button;
  let markdownStyle = modes.markdownMode ? styles.blue_button : styles.colorless_button;
  let editStyle = modes.editMode ? styles.blue_button : styles.colorless_button;
  let viewStyle = modes.viewMode ? styles.blue_button : styles.colorless_button;

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.header_container}>
        <Header notificationCount={notificationCount} />
      </div>
      <div className={styles.form_and_sidebar_container}>
        <div className={styles.profile_sidebar_container}>
          <ProfileSidebar
            userName={userName}
            avatar={avatar}
            folloversCount={folloversCount}
            rating={rating}
            postNotificationCount={postNotificationCount}
          />
        </div>
        <div className={styles.history_sidebar_container}>
          <HistorySidebar history={history} />
        </div>
        <div className={styles.create_post_container}>
          <div className={styles.header}>
            <button
              className={classNames(htmlStyle, styles.html_button)}
              onClick={changeHtmlMarkdownMod}>
              HTML
            </button>
            <button
              className={classNames(markdownStyle, styles.markdown_button)}
              onClick={changeHtmlMarkdownMod}>
              Markdown
            </button>
            <button className={classNames(editStyle, styles.edit_button)} onClick={changeEditViewMod}>
              <Image_1/>
              <Image_2/>
            </button>
            <button className={classNames(viewStyle, styles.view_button)} onClick={changeEditViewMod}>
              <Image_3/>
            </button>
          </div>
          {modes.editMode ? <CreatePostForm /> : null}
          <div className={styles.footer}>
            <button className={styles.dark_border_button}>Cancel</button>
            <button className={styles.dark_border_button}>Save draft</button>
            <button className={styles.dark_button}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps: (state) => IState = state => ({
  modes: state.createPostReducer.data.modes
});

const mapDispatchToProps: IActions = {
  changeHtmlMarkdownMod: changeHtmlMarkdownMod,
  changeEditViewMod: changeEditViewMod
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
