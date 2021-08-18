import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import { IComment } from '@screens/ViewPost/models/IComment';
import CommentWithReplay from '@components/BasicCommentCard/components/Reply';

interface ICommentProps {
  commentData: IComment[];
}

const getArrayDepth = arr => {
  if (Array.isArray(arr)) {
    return 1 + Math.max(...arr.map(getArrayDepth));
  }
  if (arr.comments && arr.comments.length) {
    return 1 + Math.max(...arr.comments.map(getArrayDepth));
  }
  return 0;
};

/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
const CommentCard: FunctionComponent<ICommentProps> = ({ commentData }) => (
  <div>
    <div className={styles.main}>
      <p className={styles.commentCounter}> Discussion (58) </p>
      <form className="ui reply form">
        <div className="field">
          <textarea placeholder="Add to the discussion..." />
        </div>
        <DarkBorderButton className={styles.buttonSend} content="Send" />
      </form>
      { getArrayDepth(commentData) <= 0 ? (
        <div className={styles.main}>
          <div className="ui comments">
            <div className="comment">
              <div className={styles.commentInfo}>
                <a href="/" className="avatar">
                  <img src="https://i.imgur.com/LaWyPZF.png" />
                </a>
                <a href="/" className="author">Skylar Botosh</a>
                <DividerSvg />
                <div className="metadata">
                  <span className="date">22 min ago</span>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  Third
                </div>
                <div className="actions">
                  <DarkBorderButton className={styles.btnReplay} content="Reply" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ui comments">
          {commentData.map(data => (
            <CommentWithReplay createdAt={data.createdAt} text={data.text} author={data.author} commentData={data.comments} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default CommentCard;
