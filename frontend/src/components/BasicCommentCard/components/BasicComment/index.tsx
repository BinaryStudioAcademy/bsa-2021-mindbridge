import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';
import parse from 'html-react-parser';
import { Popup } from 'semantic-ui-react';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: ICommentAuthor;
  prCommentId: string;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({
  createdAt,
  text,
  author,
  prCommentId
}) => {
  // eslint-disable-next-line max-len
  const checkForNickname = (textComment: string) => textComment.replace(/@\[([^()]+)\]\(([^()]+)\)/g, '<a href=/user/$2>$1</a>');

  const getLinkToComment = (url: string) => url.split('#')[0];

  return (
    <div className={styles.basicComment}>
      <div className={styles.header}>
        <div className={styles.commentAuthor}>
          <a href={`/user/${author.id}`} className="avatar">
            <Image alt="avatar" src={author.avatar ?? defaultAvatar} />
          </a>
          <a href={`/user/${author.id}`} className="author">
            {author.nickname}
          </a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">{moment(createdAt).fromNow()}</span>
          </div>
          <div className={styles.commentRightAction}>
            <Popup
              content="Copy link"
              mouseEnterDelay={1000}
              closeOnTriggerClick
              position="top center"
              on="hover"
              trigger={(
                <span>
                  <Popup
                    content="Copied!"
                    on="click"
                    closeOnTriggerMouseLeave
                    position="top center"
                    trigger={(
                      <span>
                        <CopyToClipboard text={`${getLinkToComment(window.location.href)}#${prCommentId}`}>
                          <button style={{ background: 'none' }} type="button">
                            <LinkSvg />
                          </button>
                        </CopyToClipboard>
                      </span>
                    )}
                  />
                </span>
              )}
            />
          </div>
        </div>
      </div>
      <div className="text">
        {parse(checkForNickname(text))}
      </div>
    </div>
  );
};

export default BasicComment;
