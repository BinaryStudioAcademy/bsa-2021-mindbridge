import React, { FunctionComponent, useState } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '@components/RatingIcon';
import TagsMenu from '@screens/ViewPost/components/TagsMenu';
import FavouriteSvg from '@screens/ViewPost/components/svgs/SvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';
import TextRenderer from '@root/components/TextRenderer';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useHistory } from 'react-router-dom';
import AdvancedCommentsFeed from '@components/AdvancedCommentCard';

interface IViewPostCardProps {
  post: IPost;
  isAuthor: boolean;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
  sendComment: any;
  sendReply: any;
  isAuthorized: boolean;
}
const ViewPostCard: FunctionComponent<IViewPostCardProps> = (
  {
    sendComment,
    post,
    isAuthor,
    handleLikePost,
    handleDisLikePost,
    userInfo,
    sendReply,
    isAuthorized
  }
) => {
  const history = useHistory();

  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };

  return (
    <Card className={styles.viewCard}>
      <Card.Content>
        <Feed>
          <div className={styles.gridColumn}>
            <div className={styles.leftSide}>
              <div className={styles.bgCircle}>
                <div className={styles.ratingComponent}>
                  <RatingComponent
                    postRating={post.rating}
                    handleLikePost={handleLikePost}
                    handleDisLikePost={handleDisLikePost}
                    postId={post.id}
                    userInfo={userInfo}
                    arrowUpColor={userInfo.userReactions.find(postReaction => postReaction.postId === post.id
                    && postReaction.liked)
                      ? ('#8AC858'
                      ) : (
                        '#66B9FF'
                      )}
                    arrowDownColor={userInfo.userReactions.find(postReaction => postReaction.postId === post.id
                    && !postReaction.liked)
                      ? ('#F75C48'
                      ) : (
                        '#66B9FF'
                      )}
                  />
                </div>
              </div>
              <div className={styles.bgCircle}>
                <FavouriteSvg />
              </div>
              <div className={styles.bgCircle}>
                <CommentSvg />
              </div>
              <div className={styles.bgCircle}>
                <ShareSvg />
              </div>
              {isAuthor && (
                <div role="button" tabIndex={0} className={styles.bgCircle} onKeyDown={goToEdit} onClick={goToEdit}>
                  <EditSvg />
                </div>
              )}
            </div>
            <img
              className={styles.image}
              src={post.coverImage ?? 'https://i.imgur.com/KVI8r34.jpg'}
              alt="media"
            />
          </div>

          <div className={styles.postName}>{post.title}</div>
          <div className={styles.btnWrapper}>
            {post.tags.map(tag => (
              <TagsMenu
                key={tag.id}
                tag={tag.name}
              />
            ))}
          </div>
          <div className={styles.cardHeader}>
            <PostInformation
              id={post.author.id}
              firstName={post.author.firstName}
              lastName={post.author.lastName}
              date={post.createdAt}
              avatar={post.author.avatar}
            />
          </div>
        </Feed>
        <TextRenderer
          className={styles.content}
          markdown={post.markdown}
          content={post.text}
        />
      </Card.Content>
      <div>
        <AdvancedCommentsFeed
          comments={post.comments}
          sendComment={sendComment}
          sendReply={sendReply}
          postId={post.id}
          postAuthorId={post.author.id}
          userInfo={userInfo}
          isAuthorized={isAuthorized}
        />
      </div>
    </Card>
  );
};

export default ViewPostCard;
