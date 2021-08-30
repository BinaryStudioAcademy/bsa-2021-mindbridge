import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Card, Feed, Popup } from 'semantic-ui-react';
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
import GetCursorPosition from 'cursor-position';
import Highlighter from 'web-highlighter';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';

interface IViewPostCardProps {
  post: IPost;
  isAuthor: boolean;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
  handleSaveHighlight: any;
  highlights: IHighlight[];
}

const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({
  post,
  isAuthor,
  handleLikePost,
  handleDisLikePost,
  userInfo,
  handleSaveHighlight,
  highlights
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const highlighter = new Highlighter({
    wrapTag: 'i',
    exceptSelectors: ['span', '.tagsSd'],
    style: {
      className: styles.highlightWrapper
    }
  });

  // useEffect(() => {
  //   if (highlights) {
  //     highlights.forEach(hs => hs.postId === post.id && highlighter.fromStore({
  //       parentTagName: hs.tagNameStart,
  //       parentIndex: hs.indexStart,
  //       textOffset: hs.offSetStart
  //     }, {
  //       parentTagName: hs.tagNameEnd,
  //       parentIndex: hs.indexEnd,
  //       textOffset: hs.offSetEnd
  //     }, hs.text, hs.id));
  //   }
  // }, [highlights]);

  if (highlights && !isHighlighted) {
    console.log('Highlight');
    highlights.forEach(hs => hs.postId === post.id && highlighter.fromStore({
      parentTagName: hs.tagNameStart,
      parentIndex: hs.indexStart,
      textOffset: hs.offSetStart
    }, {
      parentTagName: hs.tagNameEnd,
      parentIndex: hs.indexEnd,
      textOffset: hs.offSetEnd
    }, hs.text, hs.id));
    setIsHighlighted(true);
  }
  const history = useHistory();
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };
  const handleMouseUp = () => {
    const { x, y } = GetCursorPosition({ scroll: true });
    if (!window.getSelection().toString().trim()) {
      setIsPopUpShown(false);
    } else {
      const elements = Array.prototype.slice.call(window.getSelection().getRangeAt(0).cloneContents().children);
      if (!elements.find(element => element.localName === 'br')) {
        setYPos(y);
        setXPos(x - 25);
        setIsPopUpShown(true);
      }
    }
  };

  if (highlights) {
    highlights.forEach(hs => hs.postId === post.id && highlighter.fromStore({
      parentTagName: hs.tagNameStart,
      parentIndex: hs.indexStart,
      textOffset: hs.offSetStart
    }, {
      parentTagName: hs.tagNameEnd,
      parentIndex: hs.indexEnd,
      textOffset: hs.offSetEnd
    }, hs.text, hs.id));
    // const start = {
    //   parentTagName: 'P',
    //   parentIndex: 1,
    //   textOffset: 0
    // };
    //
    // const end = {
    //   parentTagName: 'P',
    //   parentIndex: 1,
    //   textOffset: 6
    // };
    // highlighter.fromStore(start, end, highlights[0].text, highlights[0].postId);
  }

  const handleClosePopUp = () => {
    handleSaveHighlight(highlighter.fromRange(window.getSelection().getRangeAt(0)));
    console.log(highlighter.fromRange(window.getSelection().getRangeAt(0)));
    window.getSelection().removeAllRanges();
    setIsPopUpShown(false);
  };

  return (
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
              />
            </div>
          </Feed>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className={styles.postBody} onMouseUp={handleMouseUp}>
            <Popup
              open={isPopUpShown}
              style={{
                transform: `translate3d(${xPos}px, ${yPos - 60}px, 0px)`,
                backgroundColor: '#f4f9ff',
                cursor: 'pointer',
                padding: '0'
              }}
              position="top center"
              content={(
                <Button
                  style={{ backgroundColor: '#f4f9ff' }}
                  icon="quote left"
                  onClick={() => handleClosePopUp()}
                />
              )}
              pinned
              trigger={(
                <TextRenderer
                  className={styles.content}
                  markdown={post.markdown}
                  content={post.text}
                />
              )}
            />
          </div>
        </Card.Content>
      </div>
    </Card>
  );
};

export default ViewPostCard;
