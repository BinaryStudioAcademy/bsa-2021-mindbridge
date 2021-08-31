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
  fetchTagsRoutine, editPostRoutine, resetImageTagRoutine
} from '../../routines';
import { extractData } from '@screens/PostPage/reducers';
import { IStateProfile } from '@screens/PostPage/models/IStateProfile';
import { Popup } from 'semantic-ui-react';
import LoaderWrapper from '@components/LoaderWrapper';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IPostPR } from '@root/screens/PullRequest/models/IPostPR';
import { editPrRoutine, fetchPrRoutine } from '@root/screens/PullRequest/routines';
import { history } from '@root/helpers/history.helper';

export interface IEditPrProps extends IState, IActions {
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
  preloader: {
    publishButton: boolean;
    draftButton: boolean;
  };
  imageTag: {
    isPresent: boolean;
    url: string;
    preloader: boolean;
  };
  postPR: IPostPR;
}

interface IActions {
  sendImage: IBindingAction;
  resetLoadingImage: IBindingAction;
  fetchData: IBindingCallback1<string>;
  getPostVersions: IBindingAction;
  fetchTags: IBindingAction;
  fetchPostPR: IBindingCallback1<string>;
  editPR: IBindingCallback1<object>;
  editPost: IBindingCallback1<object>;
  resetImageTag: IBindingAction;
}

const EditPrPage: React.FC<IEditPrProps> = (
  {
    savingImage,
    sendImage,
    resetLoadingImage,
    userInfo,
    allTags,
    isLoading,
    currentUserId,
    fetchData,
    fetchTags,
    fetchPostPR,
    getPostVersions,
    preloader,
    imageTag,
    resetImageTag,
    postPR,
    editPR
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
  const [changesExist, setChangesExist] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (postPR) {
      setForm({
        ...form,
        title: postPR.title,
        content: postPR.text,
        tags: Array.from(postPR.tags.map(tag => tag.id)),
        coverImage: {
          title: '',
          url: postPR.coverImage
        }
      });
      setModes({
        ...modes,
        htmlMode: !postPR.markdown,
        markdownMode: postPR.markdown
      });
    }
  }, [postPR]);

  useEffect(() => {
    fetchPostPR(id);
  }, [id]);

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
    setChangesExist(!(data.title === postPR.title
      && data.content === postPR.text
      && data.tags.join() === Array.from(postPR.tags.map(tag => tag.id)).join()
      && data.coverImage.url === postPR.coverImage));
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
      title: postPR.title,
      content: postPR.text,
      tags: Array.from(postPR.tags.map(tag => tag.id)),
      coverImage: {
        title: '',
        url: postPR.coverImage
      }
    });
    history.push(`/pullRequest/${postPR.id}`);
  };

  const handleSendForm = () => {
    if (!form.title || !form.content) {
      setIsTitleEmpty(!form.title);
      setIsContentEmpty(!form.content);
      return;
    }
    setIsContentEmpty(false);
    setIsTitleEmpty(false);
    const prOnEdit = {
      id: postPR.id,
      title: form.title,
      text: form.content,
      tags: form.tags
    };
    editPR(prOnEdit);
  };

  const changeModeWarning = 'You can\'t change the edit mode when post was created';

  const submitButtonName = 'Save pull request';

  if (!postPR.title) {
    return (
      <div>
        <LoaderWrapper loading />
      </div>
    );
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
                { postPR?.markdown ? (
                  <div style={{ display: 'flex' }}>
                    <Popup
                      content={changeModeWarning}
                      on="hover"
                      pinned
                      position="left center"
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
                    postContent={postPR.text}
                    modes={modes}
                    setForm={changeForm}
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
                <DarkBorderButton content="Cancel edition" onClick={handleCancel} />
                <DarkButton
                  content={submitButtonName}
                  disabled={preloader.draftButton || !changesExist}
                  loading={preloader.publishButton}
                  onClick={() => handleSendForm()}
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
  postPR: state.postPageReducer.data.postPR,
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
  fetchPostPR: fetchPrRoutine,
  editPR: editPrRoutine,
  editPost: editPostRoutine,
  getPostVersions: getPostVersionsRoutine,
  resetImageTag: resetImageTagRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPrPage);
