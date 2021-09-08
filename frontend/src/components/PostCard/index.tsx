import React, { FunctionComponent, useState } from 'react';
import { Card, Feed, Placeholder, PlaceholderLine } from 'semantic-ui-react';
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
import ReactPlaceholder from 'react-placeholder';
import { RectShape } from 'react-placeholder/lib/placeholders';

interface IPostCardProps {
  post: IPostFeed;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
  handleFavouriteAction: any;
  dataLoading: boolean;
}

const PostCard: FunctionComponent<IPostCardProps> = ({
  post,
  handleLikePost,
  handleDisLikePost,
  userInfo,
  handleFavouriteAction,
  dataLoading
}) => {
  const [popupContent, setPopupContent] = useState('Copy link');
  const handleShare = () => {
    setPopupContent('Copied');
  };

  const tagPlaceholderStyle = {
    width: 30,
    height: 20,
    display: 'inline-block',
    borderRadius: '.28571429rem'
  };

  const iconPlaceholderStyle = {
    width: 30,
    height: 20,
    display: 'inline-block'
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
          {!dataLoading ? (
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
                <FavouriteSvg handleFavouriteAction={getFavouriteAction} isFavourite={post.isFavourite} />
              </div>
            </div>
          ) : (
            <div className={styles.headerPlaceholder} style={{ marginLeft: '1rem' }}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </div>
          )}
        </Feed>
        <Card.Description>
          {!dataLoading ? (
            <div>
              <Image
                className={styles.postImage}
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
            </div>
          ) : (
            <div>
              <Placeholder className={styles.imagePlaceHolder}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
              <div className={styles.tagsPlaceholder}>
                <RectShape
                  color="#E0E0E0"
                  style={tagPlaceholderStyle}
                />
                <RectShape
                  color="#E0E0E0"
                  style={tagPlaceholderStyle}
                />
                <RectShape
                  color="#E0E0E0"
                  style={{ width: 30,
                    height: 20,
                    display: 'inline-block',
                    borderRadius: '.28571429rem' }}
                />
                <RectShape
                  color="#E0E0E0"
                  style={tagPlaceholderStyle}
                />
                <RectShape
                  color="#E0E0E0"
                  style={tagPlaceholderStyle}
                />
              </div>
            </div>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra className={styles.extraContent}>
        {!dataLoading ? (
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
        ) : (
          <div className={styles.iconsPlaceholder}>
            <RectShape color="#E0E0E0" style={iconPlaceholderStyle} />
            <RectShape color="#E0E0E0" style={iconPlaceholderStyle} />
            <RectShape color="#E0E0E0" style={iconPlaceholderStyle} />
            <RectShape color="#E0E0E0" style={iconPlaceholderStyle} />
            <RectShape color="#E0E0E0" style={iconPlaceholderStyle} />
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
