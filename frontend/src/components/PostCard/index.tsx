import React, { FunctionComponent } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import ShareSvg from '@components/FeedSvgComponents/shareSvg';
import RatingComponent from '@components/RatingIcon';
import FavouriteSvg from '@components/FeedSvgComponents/favouriteSvg';
import TagsMenu from '@components/TagComponent';
import PostHeaderInformation from '@components/PostHeaderInformation';
import CommentSvg from '@components/FeedSvgComponents/commentSvg';
import ViewsSvg from '@components/FeedSvgComponents/viewsSvg';
import LikeSvg from '@components/FeedSvgComponents/likeSvg';
import DisLikeSvg from '@components/FeedSvgComponents/disLikeSvg';
import styles from './styles.module.scss';
import { IPost } from '@screens/FeedPage/models/IPost';
import { Link } from 'react-router-dom';
import TextRenderer from '../TextRenderer';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import readingTime from 'reading-time';
import Image from '@components/Image';
import { defaultCoverImage } from '@images/defaultImages';

interface IPostCardProps {
  post: IPost;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
}

const PostCard: FunctionComponent<IPostCardProps> = ({ post, handleLikePost, handleDisLikePost, userInfo }) => (
  <Card className={styles.postCard}>
    <Card.Content>
      <Feed>
        <div className={styles.cardHeader}>
          {post.author
          && (
          <PostHeaderInformation
            date={post.createdAt}
            timeRead={readingTime(post.text).text}
            author={post.author}
          />
          )}
          <div className={styles.leftSide}>
            <RatingComponent
              postRating={post.postRating}
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
            <FavouriteSvg />
          </div>
        </div>
      </Feed>
      <Card.Description>
        <Image src={post.coverImage ?? defaultCoverImage} />
        <Link to={`/post/${post.id}`} className={styles.postName}>{post.title}</Link>
        <TextRenderer
          className={styles.post_content}
          markdown={post.markdown}
          content={post.text}
        />
        <div className={styles.btnWrapper}>
          {post.tags.map(tag => (
            <TagsMenu
              key={tag.id}
              tag={tag.name}
            />
          ))}
        </div>
      </Card.Description>
    </Card.Content>
    <Card.Content extra className={styles.extraContent}>
      <div className={styles.postIcons}>
        <div className={styles.icon}>
          <CommentSvg />
          <p>{post.commentsCount}</p>
        </div>
        <div className={styles.icon}>
          <ViewsSvg />
          <p>{7}</p>
        </div>
        {}
        <div className={styles.icon}>
          <LikeSvg />
          <p>{post.likesCount}</p>
        </div>
        <div className={styles.icon}>
          <DisLikeSvg />
          <p>{post.disLikesCount}</p>
        </div>
        <div className={styles.icon}>
          <ShareSvg />
        </div>
      </div>
    </Card.Content>
  </Card>
);

export default PostCard;
