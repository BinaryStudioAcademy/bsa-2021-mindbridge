import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import RatingComponent from '@components/RatingIcon';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import ShareSvg from '@components/FeedSvgComponents/shareSvg';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentRating: number;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({ createdAt, text, author, commentRating }) => (
  <div className={styles.basicComment}>
    <div className={styles.commentLeftAction}>
      <RatingComponent postRating={commentRating} />
      <LinkSvg />
      <ShareSvg />
    </div>
    <div className={styles.commentAuthor}>
      <a href="/" className="avatar">
        <img alt="avatar" src="https://i.imgur.com/LaWyPZF.png" />
      </a>
      <a href="/" className="author">
        {author.lastName}
        {' '}
        {author.lastName}
      </a>
      <DividerSvg />
      <div className="metadata">
        <span className="date">{ moment(createdAt).fromNow() }</span>
      </div>
    </div>
    <div className="content">
      <div className="text">
        { text }
      </div>
      <div className="actions">
        <DarkBorderButton className={styles.btnReplay} content="Reply" />
      </div>
    </div>
  </div>
);

export default BasicComment;
