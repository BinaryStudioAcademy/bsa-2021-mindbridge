import React, { FunctionComponent } from 'react';
import { Card, Feed, Grid, Container } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@components/PostInformation/PostInformation';
import RatingComponent from '@components/RatingIcon';
import TagsMenu from '@components/TagsMenu';
import FavouriteSvg from '@components/SvgComponents/favouriteSvg';
import ShareSvg from '@components/SvgComponents/shareSvg';
import CommentSvg from '@components/SvgComponents/commentSvg';

interface IViewPostCardProps {
  post: any;
}

const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({ post }) => (
  <Card className={styles.viewCard}>
    <Card.Content>
      <Grid.Column className={styles.gridColumn}>
        <div className={styles.leftSide}>
          <div className={styles.backgroundRatingCircle}>
            <RatingComponent />
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
          src={post.imgSource}
          alt="media"
        />
      </Grid.Column>
      <Feed>
        <div className={styles.postName}>{post.title}</div>
        <div className={styles.btnWrapper}>
          {post.tags.map(tag => (
            <TagsMenu tag={tag} />
          ))}
        </div>
        <div className={styles.cardHeader}>
          <PostInformation author={post.userName} date={post.date} timeRead={post.timeRead} />
        </div>
      </Feed>
      <Container text>
        <div className={styles.content}>
          Envision this: there is a technology currently undergoing testing that, when released
          to the public, will become a long-awaited revolution in energy. This new technology
          promises to be safer and more efficient than anything we have on the market now. It
          will affect that which we consider mundane — power tools, toys, laptops, smartphones —
          and that which we consider exceptional — medical devices, spacecraft, and the innovative
          new vehicle designs needed to wean us off of fossil fuels. We have known about this
          technology for centuries, yet until now we have only been able to take small steps towards
          its creation. Billions of dollars are pouring into research and billions more will be made once the
          technology has been perfected and released.
          <br />
          <br />
          This description may sound a lot like that of fusion power. Yet it’s actually referring to the
          upcoming innovations in the realm of battery technology — specifically that of solid-state
          batteries. And while both fusion power and solid-state batteries have been labeled
          technologies of the future but never of today, advancements and investments in solid-state
          materials have increased tremendously over the years. Today not only are there many major
          companies and credible researchers involved, it seems we may finally start seeing these
          batteries released in just the next few years.
          <br />
          <br />
          What can we expect once this elusive, transformative technology is finally ready for mass production?
        </div>
      </Container>
    </Card.Content>

  </Card>
);

export default ViewPostCard;
