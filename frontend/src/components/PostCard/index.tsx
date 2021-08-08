import React, { FunctionComponent } from 'react';
import { Card, Feed, Image } from 'semantic-ui-react';
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
import marked from 'marked';

interface IPostCardProps {
  post: IPost;
}

const styleObj = {
  color: 'red',
  wight: 300
};

const PostCard: FunctionComponent<IPostCardProps> = ({ post }) => (
  <Card className={styles.postCard}>
    <Card.Content>
      <Feed>
        <div className={styles.cardHeader}>
          <PostHeaderInformation
            date={post.createdAt}
            timeRead="7 min read"
            authorName={post.authorName}
            avatar={post.avatar}
          />
          <div className={styles.leftSide}>
            <RatingComponent postRating={post.postRating} />
            <FavouriteSvg />
          </div>
        </div>
      </Feed>
      <Card.Description>
        {post.coverImage ?
          <Image
            floated="right"
            size="mini"
            src={post.coverImage}
          />
          : null
        }
        <p className={styles.postName}>{post.title}</p>
        <p className={styles.post_content}
          dangerouslySetInnerHTML={
            post.markdown ?
              { __html: marked(post.text) }
              : { __html: post.text }}
              style={styleObj} />
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
