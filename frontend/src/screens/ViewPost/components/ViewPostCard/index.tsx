import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card, Feed, Popup, Placeholder, PlaceholderImage, PlaceholderLine } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import RatingComponent from '../svgs/RatingIcon';
import TagsMenu from '@components/TagComponent';
import FavouriteSvg from '@components/FeedSvgComponents/favouriteSvg';
import ShareSvg from '@screens/ViewPost/components/svgs/SvgComponents/shareSvg';
import CommentSvg from '@screens/ViewPost/components/svgs/SvgComponents/commentSvg';
import { IPost } from '@screens/ViewPost/models/IPost';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useHistory } from 'react-router-dom';
import Highlighter from 'web-highlighter';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import HighlightPopup from '@screens/ViewPost/components/Popups/HighlightPopup';
import { validateSelection } from '@screens/ViewPost/helpers/validateSelection';
import { cursorPosition } from '@screens/ViewPost/helpers/cursorPosition';
import AdvancedCommentsFeed from '@components/AdvancedCommentCard';
import readingTime from 'reading-time';
import RelatedPosts from '@screens/ViewPost/components/RelatedPosts';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { useDebouncedCallback } from 'use-debounce';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import Image from '@components/Image';
import { defaultCoverImage } from '@images/defaultImages';
import SharePopup from '@screens/ViewPost/components/Popups/SharePopup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

interface IViewPostCardProps {
  post: IPost;
  isAuthor: boolean;
  handleLikePost: any;
  handleDisLikePost: any;
  userInfo: IUserProfile;
  handleSaveHighlight: any;
  highlights: IHighlight[];
  handleDeleteHighlight: any;
  sendComment: IBindingCallback1<object>;
  sendReply: IBindingCallback1<object>;
  isAuthorized: boolean;
  handleLikeComment: IBindingCallback1<string>;
  handleDislikeComment: IBindingCallback1<string>;
  searchUsersByNickname: any;
  users: IMentionsUser[];
  editComment: IBindingCallback1<object>;
  handleFavouriteAction: any;
  postId: string;
  className?: string;
  resetSendingComment: IBindingAction;
  sendingEditComment: boolean;
}

const commentBlockId = 'commentsFeed';

const ViewPostCard: FunctionComponent<IViewPostCardProps> = ({
  post,
  postId,
  isAuthor,
  handleLikePost,
  handleDisLikePost,
  userInfo,
  handleSaveHighlight,
  highlights,
  handleDeleteHighlight,
  sendComment,
  sendReply,
  isAuthorized,
  handleLikeComment,
  handleDislikeComment,
  searchUsersByNickname,
  users,
  className,
  editComment,
  handleFavouriteAction,
  resetSendingComment,
  sendingEditComment
}) => {
  const highlighter = new Highlighter({
    wrapTag: 'i',
    exceptSelectors: ['span', '.tagsSd'],
    style: {
      className: styles.highlightWrapper
    }
  });

  const history = useHistory();
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);

  const deleteHighlight = highlightId => {
    handleDeleteHighlight(highlightId);
    highlighter.remove(highlightId);
  };

  const [popupContent, setPopupContent] = useState('Copy link');
  const handleShare = () => {
    setPopupContent('Copied');
  };

  const handleOnClose = () => {
    setPopupContent('Copy link');
  };

  const debounced = useDebouncedCallback(
    () => {
      if (isDeletion) {
        setIsPopUpShown(true);
      }
    },
    400
  );

  const handleHoverAction = highlightId => {
    highlighter.addClass(styles.highlightWrapperHover, highlightId);
    setXPos(cursorPosition().x - 75);
    setYPos(cursorPosition().y);
  };

  const handleHoverOutAction = highlightId => {
    highlighter.removeClass(styles.highlightWrapperHover, highlightId);
    setIsDeletion(false);
    setIsPopUpShown(false);
  };

  useEffect(() => {
    if (highlights) {
      highlights.forEach(highlight => highlight.postId === post.id && highlighter.getDoms(highlight.id).length === 0
        && highlighter.fromStore({
          parentTagName: highlight.tagNameStart,
          parentIndex: highlight.indexStart,
          textOffset: highlight.offSetStart
        }, {
          parentTagName: highlight.tagNameEnd,
          parentIndex: highlight.indexEnd,
          textOffset: highlight.offSetEnd
        }, highlight.text, highlight.id));
    }
  }, [highlights, post.id]);

  useEffect(() => {
    highlighter
      .on(Highlighter.event.CLICK, ({ id }) => {
        deleteHighlight(id);
      })
      .on(Highlighter.event.HOVER, ({ id }) => {
        handleHoverAction(id);
        setIsDeletion(true);
        debounced();
      })
      .on(Highlighter.event.HOVER_OUT, ({ id }) => {
        handleHoverOutAction(id);
      });
  }, []);
  const goToEdit = () => {
    history.push(`/post/edit/${post.id}`);
  };

  const handleMouseUp = () => {
    setIsDeletion(false);
    if (!window.getSelection().toString().trim()) {
      setIsPopUpShown(false);
    } else {
      const elements = Array.prototype.slice.call(window.getSelection().getRangeAt(0).cloneContents().children);
      if (validateSelection(elements)) {
        setYPos(cursorPosition().y);
        setXPos(cursorPosition().x - 25);
        setIsPopUpShown(true);
      }
    }
  };

  const handleClosePopUp = () => {
    const highlighterObject = highlighter.fromRange(window.getSelection().getRangeAt(0));
    handleSaveHighlight(highlighterObject);
    highlighter.remove(highlighterObject.id);
    window.getSelection().removeAllRanges();
    setIsPopUpShown(false);
  };

  const getFavouriteAction = () => {
    handleFavouriteAction(post);
  };

  const stubOnClickIconsDraftPage = () => 'Hello :)';

  return (
    <div className={classNames(styles.container, className)}>
      <Card className={styles.viewCard}>
        <div className={styles.cardContent}>
          <Card.Content>
            <Feed>
              {postId === post.id ? (
                <div className={styles.gridColumn}>
                  <div className={styles.leftSide}>
                    <div className={styles.bgCircle}>
                      <div className={styles.ratingComponent}>
                        <RatingComponent
                          postRating={post.rating}
                          handleLikePost={handleLikePost}
                          handleDisLikePost={handleDisLikePost}
                          post={post}
                          userInfo={userInfo}
                          arrowUpColor={post.reacted && post.isLiked
                            ? ('#8AC858'
                            ) : (
                              '#66B9FF'
                            )}
                          arrowDownColor={post.reacted && !post.isLiked
                            ? ('#F75C48'
                            ) : (
                              '#66B9FF'
                            )}
                        />
                      </div>
                    </div>
                    {!post.draft ? (
                      <div className={styles.bgCircle}>
                        <FavouriteSvg
                          handleFavouriteAction={getFavouriteAction}
                          isFavourite={post.isFavourite}
                          color="#66B9FF"
                        />
                      </div>
                    ) : (
                      <Popup
                        content="This is a draft"
                        trigger={(
                          <div className={styles.bgCircle}>
                            <FavouriteSvg
                              handleFavouriteAction={stubOnClickIconsDraftPage}
                              isFavourite={post.isFavourite}
                              color="#808080"
                            />
                          </div>
                      )}
                      />
                    )}
                    {!post.draft ? (
                      <a href={`#${commentBlockId}`} className={styles.bgCircle}>
                        <CommentSvg color="#66B9FF" />
                      </a>
                    ) : (
                      <Popup
                        content="This is a draft"
                        trigger={(
                          <div className={styles.bgCircle}>
                            <CommentSvg color="#808080" />
                          </div>
                      )}
                      />
                    )}
                    {!post.draft ? (
                      <div className={styles.bgCircle}>
                        <SharePopup
                          triggerContent={(
                            <CopyToClipboard text={`${window.location.href}`}>
                              <button style={{ background: 'none' }} type="button" onClick={handleShare}>
                                <ShareSvg color="#66B9FF" />
                              </button>
                            </CopyToClipboard>
                        )}
                          popupContent={popupContent}
                          handleOnClose={handleOnClose}
                        />
                      </div>
                    ) : (
                      <Popup
                        content="This is a draft"
                        trigger={(
                          <div className={styles.bgCircle}>
                            <button style={{ background: 'none' }} type="button" onClick={stubOnClickIconsDraftPage}>
                              <ShareSvg color="#808080" />
                            </button>
                          </div>
                      )}
                      />
                    )}
                    {isAuthor && (
                    <div role="button" tabIndex={0} className={styles.bgCircle} onKeyDown={goToEdit} onClick={goToEdit}>
                      <EditSvg />
                    </div>
                    )}
                  </div>
                  <Image
                    className={styles.image}
                    src={post.coverImage ?? defaultCoverImage}
                    alt="media"
                  />
                </div>
              ) : (
                <div className={styles.imgPlaceHolder}>
                  <Placeholder>
                    <Placeholder.Image rectangular />
                  </Placeholder>
                </div>
              )}
              {postId === post.id ? (
                <div>
                  <div className={styles.postName}>
                    {post.title}
                  </div>
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
                      author={post.author}
                      date={post.createdAt}
                      readTime={readingTime(post.text).text}
                      draft={post.draft}
                    />
                  </div>
                </div>
              ) : (
                <Placeholder className={styles.titlePlaceholder}>
                  <PlaceholderLine length="full" />
                  <PlaceholderLine length="long" />
                </Placeholder>
              )}
            </Feed>
            {postId === post.id ? (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div className={styles.postBody} onMouseUp={handleMouseUp}>
                <HighlightPopup
                  isDeletion={isDeletion}
                  isPopUpShown={isPopUpShown}
                  xPos={xPos}
                  yPos={yPos}
                  handleClosePopUp={handleClosePopUp}
                  markdown={post.markdown}
                  text={post.text}
                />
              </div>
            ) : (
              <div>
                <Placeholder className={styles.postPlaceholder}>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
                <Placeholder className={styles.postBodyPlaceHolder}>
                  <div>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="very long" />
                      <Placeholder.Line length="long" />
                      <Placeholder.Line length="short" />
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="very long" />
                      <Placeholder.Line length="long" />
                      <Placeholder.Line length="short" />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </div>
                </Placeholder>
              </div>
            )}
          </Card.Content>
        </div>
        {!post.draft && (
          <div>
            {post.relatedPosts.length !== 0 && <RelatedPosts relatedPosts={post.relatedPosts} />}
            <AdvancedCommentsFeed
              comments={post.comments}
              sendComment={sendComment}
              sendReply={sendReply}
              postId={post.id}
              postAuthorId={post.author.id}
              userInfo={userInfo}
              isAuthorized={isAuthorized}
              handleDislikeComment={handleDislikeComment}
              handleLikeComment={handleLikeComment}
              users={users}
              searchUsersByNickname={searchUsersByNickname}
              editComment={editComment}
              resetSendingComment={resetSendingComment}
              sendingEditComment={sendingEditComment}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ViewPostCard;
