import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import { IForm } from '../../models/IData';
import {
  sendImageRoutine, sendPostRoutine, resetLoadingImageRoutine, fetchUserProfileRoutine,
  fetchTagsRoutine, resetImageTagRoutine
} from '../../routines';
import EditSvgPart1 from '@screens/PostPage/components/svg/editSvgPart1';
import EditSvgPart2 from '@screens/PostPage/components/svg/editSvgPart2';
import ViewSvg from '@screens/PostPage/components/svg/viewSvg';
import PostPreview from '@components/PostPreview';

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
  allTags: [any];
  currentUserId: string;
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
  fetchTags: IBindingAction;
  resetImageTag: IBindingAction;
}

const CreatePost: React.FC<ICreatePostProps> = (
  {
    sendImage,
    sendPost,
    resetLoadingImage,
    savingImage,
    allTags,
    currentUserId,
    fetchData,
    fetchTags,
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

  useEffect(() => {
    if (currentUserId) {
      fetchData(currentUserId);
    }
    fetchTags();
  }, [currentUserId, fetchTags]);

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
    if (!form.title || !form.content) {
      setIsTitleEmpty(!form.title);
      setIsContentEmpty(!form.content);
      return;
    }
    setIsContentEmpty(false);
    setIsTitleEmpty(false);
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
  };

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.form_and_sidebar_container}>
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
                isCreateForm
                form={form}
                initialPostContent=""
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
            <DarkBorderButton
              content="Save draft"
              disabled={preloader.publishButton}
              loading={preloader.draftButton}
              onClick={() => handleSendForm(true)}
            />
            <DarkButton
              content="Publish"
              disabled={preloader.draftButton}
              loading={preloader.publishButton}
              onClick={() => handleSendForm(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  savingImage: state.postPageReducer.data.savingImage,
  allTags: state.postPageReducer.data.allTags,
  isAuthorized: state.auth.auth.isAuthorized,
  currentUserId: state.auth.auth.user.id,
  preloader: state.postPageReducer.data.preloader,
  imageTag: state.postPageReducer.data.imageTag
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine,
  sendPost: sendPostRoutine,
  resetLoadingImage: resetLoadingImageRoutine,
  fetchData: fetchUserProfileRoutine,
  fetchTags: fetchTagsRoutine,
  resetImageTag: resetImageTagRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
