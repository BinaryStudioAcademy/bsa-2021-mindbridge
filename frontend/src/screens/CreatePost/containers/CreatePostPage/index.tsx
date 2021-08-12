import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
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
import { sendImageRoutine, sendPostRoutine, resetLoadingImageRoutine, fetchUserProfileRoutine, getPostVersionsRoutine,
  fetchTagsRoutine } from '../../routines';
import { extractData } from '@screens/CreatePost/reducers';
import { IStateProfile } from '@screens/CreatePost/models/IStateProfile';
import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';

export interface ICreatePostProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
}

interface IState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
  userInfo: IStateProfile;
  versionsOfPost: IPostVersions[];
  allTags: [any];
}

interface IActions {
  sendImage: IBindingAction;
  sendPost: IBindingCallback1<object>;
  resetLoadingImage: IBindingAction;
  fetchData: IBindingCallback1<string>;
  getPostVersions: IBindingAction;
  fetchTags: IBindingAction;
}

const CreatePost: React.FC<ICreatePostProps> = ({
  sendImage, sendPost, resetLoadingImage, savingImage, userInfo, allTags, fetchData,
  fetchTags, getPostVersions, versionsOfPost, currentUser }) => {
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

  useEffect(() => {
    fetchData(currentUser.id);
    fetchTags();
    getPostVersions();
  }, [currentUser, fetchTags, getPostVersions]);
  useEffect(() => {
    if (savingImage.isLoaded) {
      if (!savingImage.isInContent) {
        setForm({
          ...form,
          coverImage: {
            url: savingImage.url,
            title: savingImage.title
          }
        });
      } else if (modes.htmlMode) {
        setForm({
          ...form,
          content: `${form.content
          }\n<img  height="100" width="" src=${savingImage.url} alt="image" />\n`
        });
      } else {
        setForm({
          ...form,
          content: `${form.content
          }\n![Alt Text](${savingImage.url})\n`
        });
      }
      resetLoadingImage();
    }
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
  const handleCancel = () => {
    setForm({
      coverImage: {
        title: '',
        url: ''
      },
      title: '',
      content: '',
      tags: [],
      editedTag: ''
    });
  };

  const handleDraft = () => {
    const post = {
      title: form.title,
      text: form.content,
      coverImage: form.coverImage.url,
      markdown: modes.markdownMode,
      // use current user id as author
      author: currentUser.id,
      tags: form.tags,
      draft: true
    };
    sendPost(post);
    handleCancel();
  };

  const handlePublish = () => {
    const post = {
      title: form.title,
      text: form.content,
      coverImage: form.coverImage.url,
      markdown: modes.markdownMode,
      // use current user id as author
      author: currentUser.id,
      tags: form.tags,
      draft: false
    };
    sendPost(post);
    handleCancel();
  };
  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.form_and_sidebar_container}>
        <div className={styles.profile_sidebar_container}>
          <ProfileSidebar
            userName={userInfo.profile.fullName}
            avatar={userInfo.profile.avatar}
            folloversCount={userInfo.profile.followersQuantity}
            rating={userInfo.profile.rating}
            postNotificationCount={userInfo.profile.postsQuantity}
          />
        </div>
        {/* We need this component only if we edit post*/}
        {/* <div className={styles.history_sidebar_container}>*/}
        {/*  <HistorySidebar history={versionsOfPost} />*/}
        {/* </div>*/}
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
                sendImage={sendImage}
                allTags={allTags}
              />
            )
            : <PostPreview form={form} modes={modes} allTags={allTags} />}
          <div className={styles.footer}>
            <DarkBorderButton content="Cancel" onClick={handleCancel} />
            <DarkBorderButton content="Save draft" onClick={handleDraft} />
            <DarkButton content="Publish" onClick={handlePublish} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  savingImage: state.createPostReducer.data.savingImage,
  userInfo: extractData(state),
  allTags: state.createPostReducer.data.allTags,
  versionsOfPost: state.createPostReducer.data.versionsOfPost,
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine,
  sendPost: sendPostRoutine,
  resetLoadingImage: resetLoadingImageRoutine,
  fetchData: fetchUserProfileRoutine,
  fetchTags: fetchTagsRoutine,
  getPostVersions: getPostVersionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
