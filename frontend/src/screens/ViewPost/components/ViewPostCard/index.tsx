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
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useHistory } from 'react-router-dom';

interface IViewPostCardProps {
  post: IPost;
  isAuthor: boolean;
}
const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({ post, isAuthor }) => {
  const history = useHistory();

  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
    history.go();
  };

  return (
    <Card className={styles.viewCard}>
      <Card.Content>
        <Feed>
          <div className={styles.gridColumn}>
            <div className={styles.leftSide}>
              <div className={styles.bgCircle}>
                <RatingComponent postRating={post.rating} />
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
    </Card>
  );
};

export default ViewPostCard;
