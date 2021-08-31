import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import { fetchDataRoutine, leaveReactionOnPostViewPageRoutine, saveHighlightRoutine } from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { disLikePostViewRoutine, likePostViewRoutine }
  from '@screens/PostPage/routines';
import { deleteHighlightRoutine, fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import LoaderWrapper from '@root/components/LoaderWrapper';

export interface IViewPostProps extends IState, IActions {
  userInfo: IUserProfile;
  currentUser: ICurrentUser;
  highlights: IHighlight[];
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingCallback1<string>;
  leaveReaction: IBindingCallback1<object>;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  saveHighlight: IBindingCallback1<object>;
  fetchHighlights: IBindingCallback1<string>;
  deleteHighlight: IBindingCallback1<string>;
}

const ViewPost: React.FC<IViewPostProps> = (
  {
    data,
    fetchData,
    currentUser,
    userInfo,
    leaveReaction,
    likePostView,
    disLikePostView,
    saveHighlight,
    fetchHighlights,
    highlights,
    deleteHighlight
  }
) => {
  const { postId } = useParams();

  useEffect(() => {
    fetchData(postId);
  }, [postId]);

  useEffect(() => {
    if (currentUser.id) {
      fetchHighlights(currentUser.id);
    }
  }, [currentUser, fetchHighlights]);

  const handleLikePost = id => {
    const post = {
      postId: id,
      userId: currentUser.id,
      liked: true
    };
    likePostView(id);
    leaveReaction(post);
  };

  const handleDeleteHighlight = id => {
    deleteHighlight(id);
  };

  const handleSaveHighlight = content => {
    const highlight = {
      authorId: currentUser.id,
      postId,
      text: content.startMeta.textOffset === 0 ? (`${content.text}...`) : (`...${content.text}...`),
      tagNameStart: content.startMeta.parentTagName,
      tagNameEnd: content.endMeta.parentTagName,
      indexStart: content.startMeta.parentIndex,
      indexEnd: content.endMeta.parentIndex,
      offSetStart: content.startMeta.textOffset,
      offSetEnd: content.endMeta.textOffset
    };
    saveHighlight(highlight);
  };

  const handleDisLikePost = id => {
    const post = {
      postId: id,
      userId: currentUser.id,
      liked: false
    };
    disLikePostView(id);
    leaveReaction(post);
  };

  if (!data.post.id) {
    return (
      <div className={styles.viewPost}>
        <div className={styles.main}>
          <LoaderWrapper className={styles.loader} loading />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.viewPost}>
      <div className={styles.main}>
        <ViewPostCard
          post={data.post}
          handleLikePost={handleLikePost}
          handleDisLikePost={handleDisLikePost}
          userInfo={userInfo}
          isAuthor={data.post.author.id === currentUser.id}
          handleSaveHighlight={handleSaveHighlight}
          highlights={highlights}
          handleDeleteHighlight={handleDeleteHighlight}
        />
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile,
  highlights: state.highlightsReducer.data.highlights
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  leaveReaction: leaveReactionOnPostViewPageRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine,
  saveHighlight: saveHighlightRoutine,
  fetchHighlights: fetchHighlightsRoutine,
  deleteHighlight: deleteHighlightRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
