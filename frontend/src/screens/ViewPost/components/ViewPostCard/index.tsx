import React, { FunctionComponent } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '../svgs/RatingIcon';
import TagsMenu from '@components/TagComponent';
import FavouriteSvg from '@screens/ViewPost/components/svgs/SvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';
import TextRenderer from '@root/components/TextRenderer';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useHistory } from 'react-router-dom';
import readingTime from 'reading-time';
import RelatedPosts from '@screens/ViewPost/components/RelatedPosts';

interface IViewPostCardProps {
  post: IPost;
  isAuthor: boolean;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
}
const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({ post, isAuthor, handleLikePost,
  handleDisLikePost, userInfo }) => {
  const history = useHistory();

  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.viewCard}>
        <div className={styles.cardContent}>
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
                  nickname={post.author.nickname}
                  date={post.createdAt}
                  avatar={post.author.avatar}
                  readTime={readingTime(post.text).text}
                  draft={post.draft}
                />
              </div>
            </Feed>
            <div className={styles.postBody}>
              <TextRenderer
                className={styles.content}
                markdown={post.markdown}
                content={post.text}
              />
            </div>
          </Card.Content>
        </div>
        { post.relatedPosts.length !== 0 && <RelatedPosts relatedPosts={post.relatedPosts} /> }
      </Card>
    </div>
  );
};

export default ViewPostCard;
