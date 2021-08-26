import React, { FunctionComponent, useState } from 'react';
import { Button, Card, Feed, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '@components/RatingIcon';
import TagsMenu from '@screens/ViewPost/components/TagsMenu';
import FavouriteSvg from '@screens/ViewPost/components/svgs/SvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';
import TextRenderer from '@root/components/TextRenderer';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useHistory } from 'react-router-dom';
import GetCursorPosition from 'cursor-position';

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
  const [xStart, setXStart] = useState(0);
  const [xEnd, setXEnd] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };

  const handleMouseUp = () => {
    const { x } = GetCursorPosition({ scroll: true });
    if (!window.getSelection().toString()) {
      setIsPopUpShown(false);
    } else {
      setYPos(yStart);
      const dist = (xStart - 98) + (x - xStart) / 2;
      console.log(dist);
      setXPos(dist);
      setIsPopUpShown(true);
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpShown(false);
  };

  const handleMouseDown = () => {
    const { x, y } = GetCursorPosition({ scroll: true });
    setXStart(x);
    setYStart(y);
  };
  return (
    <Card className={styles.viewCard}>
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
              firstName={post.author.firstName}
              lastName={post.author.lastName}
              date={post.createdAt}
              avatar={post.author.avatar}
            />
          </div>
        </Feed>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
          <Popup
            open={isPopUpShown}
            style={{ transform: `translate3d(${xPos}px, ${yPos - 85}px, 0px)` }}
            position="top center"
            content={<Button color="green" content="Confirm the launch" onClick={handleClosePopUp} />}
            pinned
            trigger={(
              <TextRenderer
                className={styles.content}
                markdown={post.markdown}
                content={post.text}
              />
            )}
          />
          {/* <TextRenderer*/}
          {/*  className={styles.content}*/}
          {/*  markdown={post.markdown}*/}
          {/*  content={post.text}*/}
          {/*/ >*/}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ViewPostCard;
