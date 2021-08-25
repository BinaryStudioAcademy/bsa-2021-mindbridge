import React, { FunctionComponent, useState } from 'react';
import { Card, Feed } from 'semantic-ui-react';
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
import TextSelector from 'text-selection-react';
import GetCursorPosition from 'cursor-position';
import HighlightComponent from '@components/HighlightComponent';

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
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };

  // document.addEventListener('mousemove', () => {
  //   const { x, y } = GetCursorPosition();
  //   console.log(x, y);
  // });

  const handleMouseUp = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    const { x, y } = GetCursorPosition();
    setXPos(x);
    setYPos(y);
    console.log(x, y);
  };
  return (
    <Card className={styles.viewCard}>
      <Card.Content>
        <HighlightComponent
          top={xPos}
          left={yPos}
        />
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
        <div onMouseUp={handleMouseUp}>
          <TextRenderer
            className={styles.content}
            markdown={post.markdown}
            content={post.text}
          />
          {/* <TextSelector*/}
          {/*  events={[*/}
          {/*    {*/}
          {/*      text: 'Submit',*/}
          {/*      handler: () => { console.log('Hello'); }*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  color="yellow"*/}
          {/*  colorText*/}
          {/*/ >*/}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ViewPostCard;
