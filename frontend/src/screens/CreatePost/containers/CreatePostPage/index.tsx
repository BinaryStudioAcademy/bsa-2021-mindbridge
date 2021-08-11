import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import {
  sendImageRoutine, sendPostRoutine, resetLoadingImageRoutine, fetchDataRoutine,
  fetchTagsRoutine, fetchPostRoutine, sendPRRoutine
} from '../../routines';
import { extractData } from '@screens/CreatePost/reducers';
import { IStateProfile } from '@screens/CreatePost/models/IStateProfile';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
  userInfo: IStateProfile;
  allTags: [any];
  currentUserId: string;
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
}

interface IActions {
  sendImage: IBindingAction;
  sendPost: IBindingCallback1<object>;
  resetLoadingImage: IBindingAction;
  fetchData: IBindingAction;
  fetchTags: IBindingAction;
  fetchPost: IBindingCallback1<string>;
  sendPR: IBindingCallback1<object>;
}

// use real value
const history = ['22 june, 7:50', '20 june, 13:10', '2 june, 13:50'];

const CreatePost: React.FC<ICreatePostProps> = (
  {
    sendImage,
    sendPost,
    sendPR,
    resetLoadingImage,
    savingImage,
    userInfo,
    allTags,
    post,
    currentUserId,
    fetchData,
    fetchTags,
    fetchPost
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
      url: ''
    },
    title: '',
    content: '',
    tags: [],
    editedTag: ''
  });

  const { postId } = useParams();

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
    fetchPost(postId);
  }, [postId]);

  useEffect(() => {
    fetchData();
    fetchTags();
  }, [fetchData, fetchTags]);

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
      handleCancel();
      return;
    }
    if (currentUserId === post.author.id) {
      // TODO edit post (add new version)
      const postOnEdit = {
        title: form.title,
        text: form.content,
        coverImage: form.coverImage.url,
        markdown: modes.markdownMode,
        tags: form.tags,
        postId,
        draft: isDraft
      };
      // sendPost(postOnEdit);
      handleCancel();
      return;
    }
    const postOnPR = {
      title: form.title,
      text: form.content,
      coverImage: form.coverImage.url,
      markdown: modes.markdownMode,
      tags: form.tags,
      postId,
      contributorId: currentUserId
    };
    sendPR(postOnPR);
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
                sendImage={sendImage}
                allTags={allTags}
              />
            )
            : <PostPreview form={form} modes={modes} allTags={allTags} />}
          <div className={styles.footer}>
            <DarkBorderButton content="Cancel" onClick={handleCancel} />
            <DarkBorderButton content="Save draft" onClick={() => handleSendForm(true)} />
            <DarkButton content="Publish" onClick={() => handleSendForm(false)} />
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
  post: state.createPostReducer.data.post,
  currentUserId: state.auth.auth.user.id
});

const mapDispatchToProps: IActions = {
  sendImage: sendImageRoutine,
  sendPost: sendPostRoutine,
  resetLoadingImage: resetLoadingImageRoutine,
  fetchData: fetchDataRoutine,
  fetchTags: fetchTagsRoutine,
  fetchPost: fetchPostRoutine,
  sendPR: sendPRRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
