import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileSidebar from '@root/components/ProfileSidebar';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import EditSvgPart1 from '@screens/PostPage/components/svg/editSvgPart1';
import EditSvgPart2 from '@screens/PostPage/components/svg/editSvgPart2';
import ViewSvg from '@screens/PostPage/components/svg/viewSvg';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import PostPreview from '@root/components/PostPreview';
import { IForm } from '../../models/IData';
import {
  sendImageRoutine, resetLoadingImageRoutine, fetchUserProfileRoutine, getPostVersionsRoutine,
  fetchTagsRoutine, fetchPostRoutine, sendPRRoutine, editPostRoutine, resetImageTagRoutine
} from '../../routines';
import { extractData } from '@screens/PostPage/reducers';
import { IStateProfile } from '@screens/PostPage/models/IStateProfile';
import { Popup } from 'semantic-ui-react';
import LoaderWrapper from '@components/LoaderWrapper';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { history } from '@helpers/history.helper';

export interface IEditPostProps extends IState, IActions {
  isAuthorized: boolean;
}

interface IState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
  userInfo: IStateProfile;
  versionsOfPost: IPostVersion[];
  allTags: [any];
  currentUserId: string;
  isLoading: boolean;
  post?: {
    id: string;
    author: any;
    title: string;
    text: string;
    tags: [{
      id: string;
      name: string;
    }];
    coverImage: string;
    markdown: boolean;
  };
  preloader: {
    publishButton: boolean;
    draftButton: boolean;
  };
  imageTag: {
    isPresent: boolean;
    url: string;
    preloader: boolean;
  };
}

interface IActions {
  sendImage: IBindingAction;
  resetLoadingImage: IBindingAction;
  fetchData: IBindingCallback1<string>;
  getPostVersions: IBindingAction;
  fetchTags: IBindingAction;
  fetchPost: IBindingCallback1<string>;
  sendPR: IBindingCallback1<object>;
  editPost: IBindingCallback1<object>;
  resetImageTag: IBindingAction;
}

const EditPost: React.FC<IEditPostProps> = (
  {
    sendImage,
    sendPR,
    resetLoadingImage,
    savingImage,
    userInfo,
    allTags,
    isLoading,
    post,
    currentUserId,
    fetchData,
    fetchTags,
    fetchPost,
    editPost,
    getPostVersions,
    preloader,
    imageTag,
    resetImageTag
  }
) => {
  const [modes, setModes] = useState({
    htmlMode: true,
    markdownMode: false,
    editMode: true,
    viewMode: false
  });
  const [form, setForm] = useState<IForm>({
    coverImage: {
      title: '',
      url: null
    },
    title: '',
    content: '',
    tags: [],
    editedTag: ''
  });
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isContentEmpty, setIsContentEmpty] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (post) {
      setForm({
        ...form,
        title: post.title,
        content: post.text,
        tags: Array.from(post.tags.map(tag => tag.id)),
        coverImage: {
          title: '',
          url: post.coverImage
        }
      });
      setModes({
        ...modes,
        htmlMode: !post.markdown,
        markdownMode: post.markdown
      });
    }
  }, [post]);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  useEffect(() => {
    if (currentUserId) {
      fetchData(currentUserId);
    }
    fetchTags();
    getPostVersions();
  }, [currentUserId, fetchTags, getPostVersions]);

  useEffect(() => {
    if (savingImage.isLoaded) {
      if (!savingImage.isInContent) {
        if (savingImage.url !== '0') {
          setForm({
            ...form,
            coverImage: {
              url: savingImage.url,
              title: savingImage.title
            }
          });
        } else {
          setForm({
            ...form,
            coverImage: {
              url: '',
              title: ''
            }
          });
        }
      }
      resetLoadingImage();
    }
  });

  const changeEditViewMode = () => {
    setModes({
      ...modes,
      editMode: !modes.editMode,
      viewMode: !modes.viewMode
    });
  };
  const handleCancel = () => {
    setForm({
      ...form,
      title: post.title,
      content: post.text,
      tags: Array.from(post.tags.map(tag => tag.id)),
      coverImage: {
        title: '',
        url: post.coverImage
      }
    });
    history.push(`/post/${post.id}`);
  };

  const handleSendForm = isDraft => {
    if (!form.title || !form.content) {
      setIsTitleEmpty(!form.title);
      setIsContentEmpty(!form.content);
      return;
    }
    setIsContentEmpty(false);
    setIsTitleEmpty(false);
    if (currentUserId === post.author.id) {
      const postOnEdit = {
        title: form.title,
        text: form.content,
        coverImage: form.coverImage.url,
        markdown: modes.markdownMode,
        tags: form.tags,
        postId: id,
        editorId: currentUserId,
        draft: isDraft
      };
      editPost(postOnEdit);
      return;
    }
    const postOnPR = {
      title: form.title,
      text: form.content,
      coverImage: form.coverImage.url,
      markdown: modes.markdownMode,
      author: currentUserId,
      tags: form.tags,
      postId: id,
      contributorId: currentUserId
    };
    sendPR(postOnPR);
  };

  let submitButtonName: string;
  const changeModeWarning = 'You can\'t change the edit mode when post was created';
  if (currentUserId === post?.author?.id) {
    submitButtonName = 'Save changes';
  } else {
    submitButtonName = 'Create pull request';
  }

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.form_and_sidebar_container}>
        {
          isLoading ? (
            <form className={styles.create_post_container}>
              <LoaderWrapper loading={isLoading} />
            </form>
          ) : (
            <form className={styles.create_post_container}>
              <div className={styles.header}>
                { post?.markdown ? (
                  <div style={{ display: 'flex' }}>
                    <Popup
                      content={changeModeWarning}
                      on="hover"
                      pinned
                      position="top center"
                      trigger={(
                        <ColorlessButton
                          content="HTML"
                          className={styles.disabled_html_button}
                        />
                      )}
                    />
                    <BlueButton
                      content="Markdown"
                      className={styles.markdown_button}
                      style={{ cursor: 'not-allowed' }}
                    />
                  </div>
              ) : (
                <div style={{ display: 'flex' }}>
                  <BlueButton content="HTML" className={styles.html_button} style={{ cursor: 'not-allowed' }} />
                  <Popup
                    content={changeModeWarning}
                    on="hover"
                    pinned
                    position="right center"
                    trigger={(
                      <ColorlessButton
                        content="Markdown"
                        className={styles.disabled_markdown_button}
                      />
                    )}
                  />
                </div>
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
                    isCreateForm={false}
                    form={form}
                    modes={modes}
                    setForm={setForm}
                    sendImage={sendImage}
                    allTags={allTags}
                    imageTag={imageTag}
                    resetImageTag={resetImageTag}
                    isTitleEmpty={isTitleEmpty}
                    isContentEmpty={isContentEmpty}
                  />
                )
                : <PostPreview form={form} modes={modes} allTags={allTags} />}
              <div className={styles.footer}>
                <DarkBorderButton content="Cancel" onClick={handleCancel} />
                <DarkButton
                  content={submitButtonName}
                  disabled={preloader.draftButton}
                  loading={preloader.publishButton}
                  onClick={() => handleSendForm(false)}
                />
              </div>
            </form>
          )
        }
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  savingImage: state.postPageReducer.data.savingImage,
  userInfo: extractData(state),
  isLoading: state.postPageReducer.data.postLoading,
  allTags: state.postPageReducer.data.allTags,
  isAuthorized: state.auth.auth.isAuthorized,
  post: state.postPageReducer.data.post,
  currentUserId: state.auth.auth.user.id,
  versionsOfPost: state.postPageReducer.data.versionsOfPost,
  preloader: state.postPageReducer.data.preloader,
  imageTag: state.postPageReducer.data.imageTag
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine,
  resetLoadingImage: resetLoadingImageRoutine,
  fetchData: fetchUserProfileRoutine,
  fetchTags: fetchTagsRoutine,
  fetchPost: fetchPostRoutine,
  sendPR: sendPRRoutine,
  editPost: editPostRoutine,
  getPostVersions: getPostVersionsRoutine,
  resetImageTag: resetImageTagRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
