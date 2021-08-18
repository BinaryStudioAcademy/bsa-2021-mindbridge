/* eslint-disable max-len */
import React, { FunctionComponent } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';
import TagsMenu from '@screens/ViewPost/components/TagsMenu';
import FavouriteSvg from '@screens/ViewPost/components/svgs/SvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';
import TextRenderer from '@root/components/TextRenderer';
import CommentCard from '@components/BasicCommentCard';

interface IViewPostCardProps {
  post: IPost;
}
const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({ post }) => (
  <Card className={styles.viewCard}>
    <Card.Content>
      <Feed>
        <div className={styles.gridColumn}>
          <div className={styles.leftSide}>
            <div className={styles.backgroundRatingCircle}>
              <RatingComponent postRating={post.rating} />
            </div>
            <div className={styles.backgroundFavouriteCircle}>
              <FavouriteSvg />
            </div>
            <div className={styles.backgroundCommentCircle}>
              <CommentSvg />
            </div>
            <div className={styles.backgroundShareCircle}>
              <ShareSvg />
            </div>
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
          <PostInformation firstName={post.author.firstName} lastName={post.author.lastName} date={post.createdAt} avatar={post.author.avatar} />
        </div>
      </Feed>
      <TextRenderer
        className={styles.contentArticle}
        markdown={post.markdown}
        content={post.text}
      />
    </Card.Content>
    <div>
      <CommentCard commentData={post.comments} />
    </div>
  </Card>
);

export default ViewPostCard;
