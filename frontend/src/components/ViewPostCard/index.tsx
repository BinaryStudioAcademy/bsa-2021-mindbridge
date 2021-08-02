import React, { FunctionComponent } from 'react';
import { Card, Feed, Image, Grid, Container } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@components/PostInformation/PostInformation';
import RatingComponent from '@components/RatingIcon';
import TagsMenu from '@components/TagsMenu';
import FavouriteSvg from "@components/SvgComponents/favouriteSvg";
import ShareSvg from "@components/SvgComponents/shareSvg";

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
            <svg className={styles.icon} width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7742 12.9202C14.7597 12.9119 13.4139 12.1483 12.4583 11.0924C13.1342 10.0187 13.4899 8.78631 13.4899 7.50663C13.4899 5.70499 12.7882 4.01114 11.5143 2.73719C10.2403 1.46334 8.54646 0.761703 6.74493 0.761703C4.94328 0.761703 3.24944 1.46334 1.9756 2.73719C0.701639 4.01114 0 5.70499 0 7.50663C0 9.30817 0.701639 11.002 1.9756 12.276C3.24944 13.5499 4.94328 14.2514 6.74493 14.2514C7.89483 14.2514 9.02094 13.9594 10.0189 13.4047C11.9855 14.4981 14.5679 13.7644 14.6812 13.7313C14.8523 13.6813 14.9768 13.5337 14.9971 13.3566C15.0174 13.1795 14.9296 13.0076 14.7742 12.9202ZM10.2647 12.5192C10.1217 12.4258 9.93772 12.423 9.79193 12.5119C8.87663 13.0704 7.82297 13.3657 6.74493 13.3657C3.51426 13.3657 0.885774 10.7373 0.885774 7.50663C0.885774 4.27585 3.51426 1.64748 6.74493 1.64748C9.9756 1.64748 12.604 4.27585 12.604 7.50663C12.604 8.71902 12.2367 9.88255 11.5417 10.8713C11.4281 11.033 11.4353 11.2506 11.5596 11.4043C12.1095 12.0851 12.819 12.6651 13.384 13.0709C12.5026 13.167 11.2351 13.1526 10.2647 12.5192Z" fill="#66B9FF" />
              <path d="M9.74751 9.03249H3.74233C3.49765 9.03249 3.29944 9.23081 3.29944 9.47537C3.29944 9.71993 3.49765 9.91826 3.74233 9.91826H9.74751C9.99207 9.91826 10.1904 9.71993 10.1904 9.47537C10.1904 9.23081 9.99207 9.03249 9.74751 9.03249Z" fill="#66B9FF" />
              <path d="M9.74751 7.06375H3.74233C3.49765 7.06375 3.29944 7.26208 3.29944 7.50675C3.29944 7.75131 3.49765 7.94964 3.74233 7.94964H9.74751C9.99207 7.94964 10.1904 7.75131 10.1904 7.50675C10.1904 7.26208 9.99207 7.06375 9.74751 7.06375Z" fill="#66B9FF" />
              <path d="M9.74751 5.09514H3.74233C3.49765 5.09514 3.29944 5.29346 3.29944 5.53803C3.29944 5.7827 3.49765 5.98091 3.74233 5.98091H9.74751C9.99207 5.98091 10.1904 5.7827 10.1904 5.53803C10.1904 5.29346 9.99207 5.09514 9.74751 5.09514Z" fill="#66B9FF" />
            </svg>
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
