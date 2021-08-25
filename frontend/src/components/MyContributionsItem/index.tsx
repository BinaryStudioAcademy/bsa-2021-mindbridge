/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { useHistory } from 'react-router-dom';
import { IPostPR } from '@root/screens/PullRequest/models/IPostPR';
import { timeToLocal } from '@helpers/dataTimeToLocalData';

export interface IMyContributionsItemProps {
  contribution: IPostPR;
}

const MyContributionItem: FunctionComponent<IMyContributionsItemProps> = ({ contribution }) => {
  const history = useHistory();

  const goToVersion = () => {
    history.push(`/pullRequest/${contribution.id}`);
  };

  return (
    <div className={styles.versionItem} onClick={goToVersion}>
      <span className={styles.postHeaderInfo}>{timeToLocal(contribution.createdAt)}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{contribution.title}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{contribution.state}</span>
    </div>
  );
};

export default MyContributionItem;
