import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import {
  fetchDataRoutine, leaveReactionOnCommentRoutine,
  leaveReactionOnPostViewPageRoutine, searchUserByNicknameRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { disLikeCommentViewRoutine, disLikePostViewRoutine, likeCommentViewRoutine, likePostViewRoutine }
  from '@screens/PostPage/routines';
import LoaderWrapper from '@root/components/LoaderWrapper';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import { history } from '@helpers/history.helper';
import {toastr} from "react-redux-toastr";

export interface IViewPostProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
}

interface IState {
  data: IData;
  users: IMentionsUser[];
}

interface IActions {
  fetchData: IBindingCallback1<string>;
  leaveReaction: IBindingCallback1<object>;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  sendComment: IBindingCallback1<object>;
  sendReply: IBindingCallback1<object>;
  likeComment: IBindingCallback1<string>;
  dislikeComment: IBindingCallback1<string>;
  leaveReactionOnComment: IBindingCallback1<object>;
  searchUsersByNickname: IBindingCallback1<string>;
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
    isAuthorized,
    likeComment,
    dislikeComment,
    leaveReactionOnComment,
    searchUsersByNickname,
    users
  }
) => {
  const { postId } = useParams();

  useEffect(() => {
    fetchData(postId);
  }, [postId]);

  const handleLikePost = id => {
    if (currentUser.id) {
      const post = {
        postId: id,
        userId: currentUser.id,
        liked: true
      };
      likePostView(id);
      leaveReaction(post);
    } else {
      history.push('/login');
      toastr.error('Error', 'Please log in to perform that action');
    }
  };

  const handleDisLikePost = id => {
    if (currentUser.id) {
      const post = {
        postId: id,
        userId: currentUser.id,
        liked: false
      };
      disLikePostView(id);
      leaveReaction(post);
    } else {
      history.push('/login');
      toastr.error('Error', 'Please log in to perform that action');
    }
  };

  const handleLikeComment = id => {
    if (currentUser.id) {
      const comment = {
        commentId: id,
        userId: currentUser.id,
        liked: true
      };
      likeComment(id);
      leaveReactionOnComment(comment);
    } else {
      history.push('/login');
      toastr.error('Error', 'Please log in to perform that action');
    }
  };

  const handleDisLikeComment = id => {
    if (currentUser.id) {
      const comment = {
        commentId: id,
        userId: currentUser.id,
        liked: false
      };
      dislikeComment(id);
      leaveReactionOnComment(comment); {
        history.push('/login');
        toastr.error('Error', 'Please log in to perform that action');
      }
    }
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
          handleLikeComment={handleLikeComment}
          handleDislikeComment={handleDisLikeComment}
          userInfo={userInfo}
          isAuthor={data.post.author.id === currentUser.id}
          sendComment={sendComment}
          sendReply={sendReply}
          isAuthorized={isAuthorized}
          users={users}
          searchUsersByNickname={searchUsersByNickname}
        />
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  relatedPosts: extractData(state),
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile,
  users: extractData(state).users
});

const mapDispatchToProps: IActions = {
  sendComment: sendCommentRoutine,
  sendReply: sendReplyRoutine,
  fetchData: fetchDataRoutine,
  leaveReaction: leaveReactionOnPostViewPageRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine,
  likeComment: likeCommentViewRoutine,
  dislikeComment: disLikeCommentViewRoutine,
  leaveReactionOnComment: leaveReactionOnCommentRoutine,
  searchUsersByNickname: searchUserByNicknameRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
