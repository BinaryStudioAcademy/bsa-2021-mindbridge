import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import EditSvgPart1 from '@screens/PostPage/components/svg/editSvgPart1';
import EditSvgPart2 from '@screens/PostPage/components/svg/editSvgPart2';
import ViewSvg from '@screens/PostPage/components/svg/viewSvg';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
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
import Checkbox from '@root/screens/PullRequest/components/Checkbox';
import Preview from '@root/screens/PullRequest/components/Preview';
import { ITag } from '@root/screens/FeedPage/models/ITag';

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
  post: {
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
    draft: boolean;
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
    allTags,
    isLoading,
    post,
    currentUserId,
    fetchTags,
    fetchPost,
    editPost,
    preloader,
    imageTag,
    resetImageTag
  }
) => {
  const [seeDiff, setSeeDiff] = useState(false);

  const handleCheckbox = () => {
    setSeeDiff(!seeDiff);
  };

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
  const [isTagsEmpty, setIsTagsEmpty] = useState(false);
  const [changesExist, setChangesExist] = useState(false);

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
    fetchTags();
  }, [fetchTags]);

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

  const changeForm = data => {
    setForm(data);
    setChangesExist(!(data.title === post.title
      && data.content === post.text
      && data.tags.join() === Array.from(post.tags.map(tag => tag.id)).join()
      && data.coverImage.url === post.coverImage));
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
    if (!form.title || !form.content || !form.tags.length || form.content === '<p><br></p>') {
      setIsTitleEmpty(!form.title);
      setIsContentEmpty(!form.content || form.content === '<p><br></p>');
      setIsTagsEmpty(!form.tags.length);
      return;
    }
    setIsContentEmpty(false);
    setIsTitleEmpty(false);
    setIsTagsEmpty(false);
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

  const tags: ITag[] = [];
  form.tags.forEach(tagId => {
    let tagName = '';
    allTags.forEach(tag => {
      if (tag.key === tagId) {
        tagName = tag.text;
      }
    });
    tags.push({ id: tagId, name: tagName });
  });

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
              {currentUserId === post?.author?.id ? (
                <h3>Edit post</h3>
              ) : (
                <h3>Pull request to</h3>
              )}
              <h2 className={styles.postName}>{post?.title}</h2>
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
                {modes.viewMode
              && (
              <Checkbox
                className={styles.checkbox}
                seeDiff={seeDiff}
                handleCheckbox={handleCheckbox}
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
                    isCreateForm={false}
                    initialPostContent={post?.text}
                    form={form}
                    modes={modes}
                    setForm={changeForm}
                    sendImage={sendImage}
                    allTags={allTags}
                    imageTag={imageTag}
                    resetImageTag={resetImageTag}
                    isTitleEmpty={isTitleEmpty}
                    isContentEmpty={isContentEmpty}
                    isTagsEmpty={isTagsEmpty}
                  />
                )
                : (
                  <Preview
                    seeDiff={seeDiff}
                    markdown={post?.markdown}
                    coverImage={post?.coverImage}
                    title={form.title}
                    oldTitle={post?.title}
                    text={form.content}
                    oldText={post?.text}
                    tags={tags}
                    oldTags={post?.tags}
                  />
                )}
              <div className={styles.footer}>
                <DarkBorderButton content="Cancel" onClick={handleCancel} />
                <DarkButton
                  content={submitButtonName}
                  disabled={preloader.draftButton || !changesExist}
                  loading={preloader.publishButton}
                  onClick={() => handleSendForm(post?.draft)}
                />
                {post?.draft && (
                  <DarkButton
                    content="Publish"
                    disabled={preloader.draftButton}
                    loading={preloader.publishButton}
                    onClick={() => handleSendForm(!post.draft)}
                  />
                )}
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
