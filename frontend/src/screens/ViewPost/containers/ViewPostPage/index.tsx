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
  sendReplyRoutine,
  saveHighlightRoutine
} from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { deleteHighlightRoutine, fetchHighlightsRoutine,
  fetchHighlightsWithoutPaginationRoutine } from '@screens/HighlightsPage/routines';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import LoaderWrapper from '@root/components/LoaderWrapper';
import { extractHighlightDeletion } from '@screens/HighlightsPage/reducers';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import { deleteFavouritePostRoutine, saveFavouritePostRoutine } from '@screens/FavouritesPage/routines';

export interface IViewPostProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  highlights: IHighlight[];
  userInfo: IUserProfile;
}

interface IState {
  data: IData;
  dataDeleting: boolean;
  users: IMentionsUser[];
}

interface IActions {
  fetchData: IBindingCallback1<string>;
  leaveReaction: IBindingCallback1<object>;
  saveHighlight: IBindingCallback1<object>;
  fetchHighlights: IBindingCallback1<string>;
  deleteHighlight: IBindingCallback1<string>;
  sendComment: IBindingCallback1<object>;
  sendReply: IBindingCallback1<object>;
  leaveReactionOnComment: IBindingCallback1<object>;
  searchUsersByNickname: IBindingCallback1<string>;
  saveFavouritePost: IBindingCallback1<object>;
  deleteFavouritePost: IBindingCallback1<string>;
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
    saveHighlight,
    fetchHighlights,
    highlights,
    deleteHighlight,
    isAuthorized,
    leaveReactionOnComment,
    searchUsersByNickname,
    users,
    saveFavouritePost,
    deleteFavouritePost
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
    if (currentUser.id) {
      const post = {
        postId: id,
        userId: currentUser.id,
        liked: true
      };
      leaveReaction(post);
    }
  };

  const handleDeleteHighlight = id => {
    if (id.length !== 0) {
      deleteHighlight(id);
    }
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
    if (currentUser.id) {
      const post = {
        postId: id,
        userId: currentUser.id,
        liked: false
      };
      leaveReaction(post);
    }
  };

  const handleLikeComment = id => {
    if (currentUser.id && currentUser.id !== data.post.author.id) {
      const comment = {
        commentId: id,
        userId: currentUser.id,
        liked: true
      };
      leaveReactionOnComment(comment);
    }
  };

  const handleDisLikeComment = id => {
    if (currentUser.id) {
      const comment = {
        commentId: id,
        userId: currentUser.id,
        liked: false
      };
      leaveReactionOnComment(comment);
    }
  };

  if (postId !== data.post.id) {
    return (
      <div className={styles.viewPost}>
        <div className={styles.main}>
          <LoaderWrapper className={styles.loader} loading />
        </div>
      </div>
    );
  }

  const handleFavouriteAction = post => {
    if (!post.isFavourite) {
      saveFavouritePost({ userId: currentUser.id, postId: post.id });
    } else {
      deleteFavouritePost(post.id);
    }
  };

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
          handleSaveHighlight={handleSaveHighlight}
          highlights={highlights}
          handleDeleteHighlight={handleDeleteHighlight}
          sendComment={sendComment}
          sendReply={sendReply}
          isAuthorized={isAuthorized}
          users={users}
          searchUsersByNickname={searchUsersByNickname}
          handleFavouriteAction={handleFavouriteAction}
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
  highlights: state.highlightsReducer.data.highlights,
  dataDeleting: extractHighlightDeletion(state),
  users: extractData(state).users
});

const mapDispatchToProps: IActions = {
  sendComment: sendCommentRoutine,
  sendReply: sendReplyRoutine,
  fetchData: fetchDataRoutine,
  leaveReaction: leaveReactionOnPostViewPageRoutine,
  saveHighlight: saveHighlightRoutine,
  fetchHighlights: fetchHighlightsWithoutPaginationRoutine,
  deleteHighlight: deleteHighlightRoutine,
  leaveReactionOnComment: leaveReactionOnCommentRoutine,
  searchUsersByNickname: searchUserByNicknameRoutine,
  saveFavouritePost: saveFavouritePostRoutine,
  deleteFavouritePost: deleteFavouritePostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
