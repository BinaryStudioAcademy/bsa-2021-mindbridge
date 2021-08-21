import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileSidebar from '@root/components/ProfileSidebar';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import PostPreview from '@root/components/PostPreview';
import { IForm } from '../../models/IData';
import {
  sendImageRoutine, sendPostRoutine, resetLoadingImageRoutine, fetchUserProfileRoutine, getPostVersionsRoutine,
  fetchTagsRoutine, fetchPostRoutine, sendPRRoutine, editPostRoutine, resetImageTagRoutine
} from '../../routines';
import { extractData } from '@screens/CreatePost/reducers';
import { IStateProfile } from '@screens/CreatePost/models/IStateProfile';
import LoaderWrapper from '@components/LoaderWrapper';
import HistorySidebar from '@components/PostHistorySidebar';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';

export interface ICreatePostProps extends IState, IActions {
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
    markdown: string;
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
  sendPost: IBindingCallback1<object>;
  resetLoadingImage: IBindingAction;
  fetchData: IBindingCallback1<string>;
  getPostVersions: IBindingCallback1<object>;
  fetchTags: IBindingAction;
  fetchPost: IBindingCallback1<string>;
  sendPR: IBindingCallback1<object>;
  editPost: IBindingCallback1<object>;
  resetImageTag: IBindingAction;
}

const CreatePost: React.FC<ICreatePostProps> = (
  {
    sendImage,
    sendPost,
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
    versionsOfPost,
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
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
    getPostVersions({ postId });
  }, [postId, fetchPost]);

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
    }
  }, [post]);

  useEffect(() => {
    if (currentUserId) {
      fetchData(currentUserId);
    }
    fetchTags();
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

  const handleSendForm = isDraft => {
    if (!postId) {
      const postOnAdd = {
        title: form.title,
        text: form.content,
        coverImage: form.coverImage.url,
        markdown: modes.markdownMode,
        tags: form.tags,
        draft: isDraft,
        author: currentUserId
      };
      sendPost(postOnAdd);
      return;
    }
    if (currentUserId === post.author.id) {
      const postOnEdit = {
        title: form.title,
        text: form.content,
        coverImage: form.coverImage.url,
        markdown: modes.markdownMode,
        tags: form.tags,
        postId,
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
      postId,
      contributorId: currentUserId
    };
    sendPR(postOnPR);
  };

  let submitButtonName = '';
  if (!post) {
    submitButtonName = 'Publish';
  } else if (currentUserId === post?.author?.id) {
    submitButtonName = 'Save changes';
  } else {
    submitButtonName = 'Create pull request';
  }
  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.form_and_sidebar_container}>
        <div className={styles.profile_sidebar_container}>
          <ProfileSidebar
            id={userInfo.profile.id}
            userName={userInfo.profile.fullName}
            avatar={userInfo.profile.avatar}
            folloversCount={userInfo.profile.followersQuantity}
            rating={userInfo.profile.rating}
            postNotificationCount={userInfo.profile.postsQuantity}
          />
        </div>
        {currentUserId === post?.author?.id && (
          <div className={styles.history_sidebar_container}>
            <HistorySidebar history={versionsOfPost} postId={postId} />
          </div>
        )}
        {isLoading ? (
          <form className={styles.create_post_container}>
            <LoaderWrapper loading={isLoading} />
          </form>
        ) : (
          <form className={styles.create_post_container}>
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
            </div>
            {modes.editMode
              ? (
                <CreatePostForm
                  form={form}
                  modes={modes}
                  setForm={setForm}
                  sendImage={sendImage}
                  allTags={allTags}
                  imageTag={imageTag}
                  resetImageTag={resetImageTag}
                />
              )
              : <PostPreview form={form} modes={modes} allTags={allTags} />}
            <div className={styles.footer}>
              <DarkBorderButton content="Cancel" onClick={handleCancel} />
              {!(post)
              && (
                <DarkBorderButton
                  content="Save draft"
                  disabled={preloader.publishButton}
                  loading={preloader.draftButton}
                  onClick={() => handleSendForm(true)}
                />
              )}
              <DarkButton
                content={submitButtonName}
                disabled={preloader.draftButton}
                loading={preloader.publishButton}
                onClick={() => handleSendForm(false)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  savingImage: state.createPostReducer.data.savingImage,
  userInfo: extractData(state),
  isLoading: state.createPostReducer.data.postLoading,
  allTags: state.createPostReducer.data.allTags,
  isAuthorized: state.auth.auth.isAuthorized,
  post: state.createPostReducer.data.post,
  currentUserId: state.auth.auth.user.id,
  versionsOfPost: state.createPostReducer.data.versionsOfPost,
  preloader: state.createPostReducer.data.preloader,
  imageTag: state.createPostReducer.data.imageTag
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine,
  sendPost: sendPostRoutine,
  resetLoadingImage: resetLoadingImageRoutine,
  fetchData: fetchUserProfileRoutine,
  fetchTags: fetchTagsRoutine,
  fetchPost: fetchPostRoutine,
  sendPR: sendPRRoutine,
  editPost: editPostRoutine,
  getPostVersions: getPostVersionsRoutine,
  resetImageTag: resetImageTagRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
