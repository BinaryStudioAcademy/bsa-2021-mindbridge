/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Link, useHistory } from 'react-router-dom';
import { IContribution } from '@root/screens/ViewPost/models/IContribution';
import Image from '@components/Image';

export interface IPostContributionItemProps {
  postContribution: IContribution;
}

const PostContributionItem: FunctionComponent<IPostContributionItemProps> = ({ postContribution }) => {
  const history = useHistory();

  const goToVersion = () => {
    history.push(`/pullRequest/${postContribution.id}`);
  };

  const handleClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={styles.versionItem} onClick={goToVersion}>
      <div>
        <Link onClick={e => handleClick(e)} to={`/user/${postContribution.author?.id}`} className={styles.userName}>
          <Image src={postContribution.author?.avatar ?? 'https://i.imgur.com/LaWyPZF.png'} />
          {postContribution.author?.nickname}
        </Link>
        <DividerSvg />
        <span className={styles.postHeaderInfo}>{postContribution.createdAt}</span>
      </div>
      <div className={styles.state}>{postContribution.state}</div>
    </div>
  );
};

export default PostContributionItem;
