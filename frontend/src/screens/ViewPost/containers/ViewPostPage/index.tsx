import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import {
  fetchDataRoutine,
  leaveReactionOnPostViewPageRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { disLikePostViewRoutine, likePostViewRoutine }
  from '@screens/PostPage/routines';
import LoaderWrapper from '@root/components/LoaderWrapper';

export interface IViewPostProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingCallback1<string>;
  leaveReaction: IBindingCallback1<object>;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  sendComment: IBindingCallback1<object>;
  sendReply: IBindingCallback1<object>;
}

const ViewPost: React.FC<IViewPostProps> = (
  {
    data,
    sendComment,
    sendReply,
    fetchData,
    currentUser,
    userInfo,
    leaveReaction,
    likePostView,
    disLikePostView,
    isAuthorized
  }
) => {
  const { postId } = useParams();

  useEffect(() => {
    fetchData(postId);
  }, [postId]);

  const handleLikePost = id => {
    const post = {
      postId: id,
      userId: currentUser.id,
      liked: true
    };
    likePostView(id);
    leaveReaction(post);
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
          sendComment={sendComment}
          sendReply={sendReply}
          isAuthorized={isAuthorized}
        />
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile
});

const mapDispatchToProps: IActions = {
  sendComment: sendCommentRoutine,
  sendReply: sendReplyRoutine,
  fetchData: fetchDataRoutine,
  leaveReaction: leaveReactionOnPostViewPageRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
