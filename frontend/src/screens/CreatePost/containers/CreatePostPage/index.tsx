import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';
import { IBindingAction } from '@root/models/Callbacks';
import {
  changeEditViewModeRoutine,
  changeHtmlMarkdownModeRoutine,
  fetchDataRoutine,
  getPostVersionsRoutine
} from '../../routines';
import CreatePostForm from '@root/components/CreatePostForm/CreatePostForm';
import EditSvgPart1 from './svg/editSvgPart1';
import EditSvgPart2 from './svg/editSvgPart2';
import ViewSvg from './svg/viewSvg';
import BlueButton from '@root/components/buttons/Blue_button';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import DarkButton from '@root/components/buttons/DarcButton';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import { extractData } from '@screens/CreatePost/reducers';
import { IStateProfile } from '@screens/CreatePost/models/IStateProfile';
import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
  modes: {
    htmlMode: boolean;
    markdownMode: boolean;
    editMode: boolean;
    viewMode: boolean;
  };
  userInfo: IStateProfile;
  versionsOfPost: [IPostVersions];
}

interface IActions {
  changeHtmlMarkdownMode: IBindingAction;
  changeEditViewMode: IBindingAction;
  fetchData: IBindingAction;
  getPostVersions: IBindingAction;
}

const CreatePost: React.FC<ICreatePostProps> = (
  { modes, changeHtmlMarkdownMode, changeEditViewMode, userInfo, fetchData, getPostVersions, versionsOfPost }
) => {
  useEffect(() => {
    fetchData();
    getPostVersions();
  }, [fetchData, getPostVersions]);
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
          <HistorySidebar history={versionsOfPost} />
        </div>
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
            {modes.editMode ? <CreatePostForm /> : null}
            <div className={styles.footer}>
              <DarkBorderButton content="Cancel" />
              <DarkBorderButton content="Save draft" />
              <DarkButton content="Publish" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  modes: state.createPostReducer.data.modes,
  userInfo: extractData(state),
  versionsOfPost: state.createPostReducer.data.versionsOfPost
});

const mapDispatchToProps: IActions = {
  changeHtmlMarkdownMode: changeHtmlMarkdownModeRoutine,
  changeEditViewMode: changeEditViewModeRoutine,
  fetchData: fetchDataRoutine,
  getPostVersions: getPostVersionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
