/* eslint-disable max-len */
import React, { FunctionComponent } from 'react';
import { Card, Feed, Container } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';
import TagsMenu from '@screens/ViewPost/components/TagsMenu';
import FavouriteSvg from '@screens/ViewPost/components/svgs/SvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';

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
            src="https://i0.wp.com/vincenttechblog.com/wp-content/uploads/2020/12/computer_designs.jpg?fit=1200,630&ssl=1"
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
          <PostInformation author={post.authorName} date={post.createdAt} />
        </div>
      </Feed>
      <Container text>
        <div className={styles.content}>
          {post.text}
        </div>
      </Container>
    </Card.Content>
  </Card>
);

export default ViewPostCard;
