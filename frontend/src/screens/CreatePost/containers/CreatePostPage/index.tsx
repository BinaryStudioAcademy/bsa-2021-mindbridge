import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import EditSvgPart1 from './svg/editSvgPart1';
import EditSvgPart2 from './svg/editSvgPart2';
import ViewSvg from './svg/viewSvg';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import PostPreview from '@root/components/PostPreview';
import { IForm } from '../../models/IData';
import { IBindingAction } from '@root/models/Callbacks';
import { sendImageRoutine } from '../../routines';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
  savingImage: {
    title: string;
    url: string;
  };
}

interface IActions {
  sendImage: IBindingAction;
}

// use real value
const notificationCount = 3;
const userName = 'Charlie Culhane';
const avatar = '';
const folloversCount = `${6.6}K`;
const rating = `${5.4}K`;
const postNotificationCount = 4;
const history = ['22 june, 7:50', '20 june, 13:10', '2 june, 13:50'];

const CreatePost: React.FC<ICreatePostProps> = ({ sendImage, savingImage }) => {
  console.log(savingImage);
  const [modes, setModes] = useState({
    htmlMode: true,
    markdownMode: false,
    editMode: true,
    viewMode: false
  });

  const [form, setForm] = useState<IForm>({
    coverImage: {
      title: '',
      url: ''
    },
    title: '',
    content: '',
    tags: [],
    editedTag: ''
  });

  const changeHtmlMarkdownMode = () => {
    setModes({
      ...modes,
      htmlMode: !modes.htmlMode,
      markdownMode: !modes.markdownMode
    });
  };

  const changeEditViewMode = () => {
    setModes({
      ...modes,
      editMode: !modes.editMode,
      viewMode: !modes.viewMode
    });
  };

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
                      <EditSvgPart1 />
                      <EditSvgPart2 />
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
                      <EditSvgPart1 />
                      <EditSvgPart2 />
                    </div>
                  )}
                  onClick={changeEditViewMode}
                  className={styles.edit_button}
                />
              )}
            {modes.viewMode
              ? (
                <BlueButton
                  content={<ViewSvg />}
                  className={classNames(styles.view_button)}
                  onClick={changeEditViewMode}
                />
              )
              : (
                <ColorlessButton
                  content={<ViewSvg />}
                  className={classNames(styles.view_button)}
                  onClick={changeEditViewMode}
                />
              )}
          </div>
          {modes.editMode
            ? (
              <CreatePostForm
                form={form}
                modes={modes}
                setForm={setForm}
                savingImage={savingImage}
                sendImage={sendImage}
              />
            )
            : <PostPreview form={form} modes={modes} />}
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
  savingImage: state.createPostReducer.data.savingImage
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
