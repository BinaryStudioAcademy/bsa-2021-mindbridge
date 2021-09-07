import React, { FunctionComponent, useState } from 'react';
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
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import { Link } from 'react-router-dom';
import TextRenderer from '../TextRenderer';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import readingTime from 'reading-time';
import Image from '@components/Image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SharePopup from '@screens/ViewPost/components/Popups/SharePopup';

interface IPostCardProps {
  post: IPostFeed;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
  handleFavouriteAction: any;
}

const PostCard: FunctionComponent<IPostCardProps> = ({
  post,
  handleLikePost,
  handleDisLikePost,
  userInfo,
  handleFavouriteAction
}) => {
  const [popupContent, setPopupContent] = useState('Copy link');
  const handleShare = () => {
    setPopupContent('Copied');
  };

  const handleOnClose = () => {
    setPopupContent('Copy link');
  };

  const getFavouriteAction = () => {
    handleFavouriteAction(post);
  };

  return (
    <Card className={styles.postCard}>
      <Card.Content>
        <Feed>
          <div className={styles.cardHeader}>
            <PostHeaderInformation
              authorId={post.authorId}
              date={post.createdAt}
              timeRead={readingTime(post.text).text}
              authorName={post.nickname}
              avatar={post.avatar}
            />
            <div className={styles.leftSide}>
              <RatingComponent
                postRating={post.postRating}
                handleLikePost={handleLikePost}
                handleDisLikePost={handleDisLikePost}
                postId={post.id}
                userInfo={userInfo}
                arrowUpColor={
                  post.reacted && post.isLiked
                    ? ('#8AC858')
                    : ('#66B9FF')
                }
                arrowDownColor={
                  post.reacted && !post.isLiked
                    ? ('#F75C48')
                    : ('#66B9FF')
                }
              />
              <FavouriteSvg handleFavouriteAction={getFavouriteAction} color={post.isFavourite ? 'green' : '#66B9FF'} />
            </div>
          </div>
        </Feed>
        <Card.Description>
          <Image
            style={{
              floated: 'right',
              size: 'mini'
            }}
            src={post.coverImage ?? 'https://i.imgur.com/KVI8r34.jpg'}
          />
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
            <SharePopup
              triggerContent={(
                <CopyToClipboard text={`${window.location.href}post/${post.id}`}>
                  <button style={{ background: 'none' }} type="button" onClick={handleShare}>
                    <ShareSvg />
                  </button>
                </CopyToClipboard>
              )}
              popupContent={popupContent}
              handleOnClose={handleOnClose}
            />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
