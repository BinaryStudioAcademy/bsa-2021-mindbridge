import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';
import { IBindingAction } from '@root/models/Callbacks';
import { changeEditViewModeRoutine, changeHtmlMarkdownModeRoutine } from '../../routines';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import Svg1 from './svg/svg1';
import Svg2 from './svg/svg2';
import Svg3 from './svg/svg3';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
  modes: {
    htmlMode: boolean;
    markdownMode: boolean;
    editMode: boolean;
    viewMode: boolean;
  };
}

interface IActions {
  changeHtmlMarkdownMode: IBindingAction;
  changeEditViewMode: IBindingAction;
}

// use real value
const notificationCount = 3;
const userName = 'Charlie Culhane';
const avatar = '';
const folloversCount = `${6.6}K`;
const rating = `${5.4}K`;
const postNotificationCount = 4;
const history = ['22 june, 7:50', '20 june, 13:10', '2 june, 13:50'];

const CreatePost: React.FC<ICreatePostProps> = (
  { modes, changeHtmlMarkdownMode, changeEditViewMode }
) => {
  // const markdownStyle = modes.markdownMode ? styles.blue_button : styles.colorless_button;
  const editStyle = modes.editMode ? styles.blue_button : styles.colorless_button;
  const viewStyle = modes.viewMode ? styles.blue_button : styles.colorless_button;

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
            {modes.htmlMode
              ? <BlueButton content="HTML" onClick={changeHtmlMarkdownMode} className={styles.html_button} />
              : <ColorlessButton content="HTML" onClick={changeHtmlMarkdownMode} className={styles.html_button} />}
            {modes.markdownMode
              ? <BlueButton content="Markdown" onClick={changeHtmlMarkdownMode} className={styles.markdown_button} />
              : (
                <ColorlessButton
                  content="Markdown"
                  onClick={changeHtmlMarkdownMode}
                  className={styles.markdown_button}
                />
              )}
            {modes.editMode
              ? (
                <BlueButton
                  content={(
                    <div>
                      <Svg1 />
                      <Svg2 />
                    </div>
              )}
                  onClick={changeEditViewMode}
                  className={styles.edit_button}
                />
              )
              : (
                <ColorlessButton
                  content={(
                    <div>
                      <Svg1 />
                      <Svg2 />
                    </div>
              )}
                  onClick={changeEditViewMode}
                  className={styles.edit_button}
                />
              )}
            {modes.viewMode
              ? (
                <BlueButton
                  content={<Svg3 />}
                  className={classNames(styles.view_button)}
                  onClick={changeEditViewMode}
                />
              )
              : (
                <ColorlessButton
                  content={<Svg3 />}
                  className={classNames(styles.view_button)}
                  onClick={changeEditViewMode}
                />
              )}
          </div>
          {modes.editMode ? <CreatePostForm /> : null}
          <div className={styles.footer}>
            <DarkBorderButton content="Cancel" />
            <DarkBorderButton content="Save draft" />
            <DarkButton content="Publish" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  modes: state.createPostReducer.data.modes
});

const mapDispatchToProps: IActions = {
  changeHtmlMarkdownMode: changeHtmlMarkdownModeRoutine,
  changeEditViewMode: changeEditViewModeRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
