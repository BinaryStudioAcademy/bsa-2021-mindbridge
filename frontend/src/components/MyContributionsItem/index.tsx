/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { useHistory } from 'react-router-dom';
import { IPostPR, PrState } from '@root/screens/PullRequest/models/IPostPR';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import AcceptedSvg from './svg/acceptedSvg';
import ClosedPRSvg from './svg/closedPrSvg';
import OpenSvg from './svg/openSvg';
import { Popup } from 'semantic-ui-react';

export interface IMyContributionsItemProps {
  contribution: IPostPR;
}

const MyContributionItem: FunctionComponent<IMyContributionsItemProps> = ({ contribution }) => {
  const history = useHistory();

  const goToVersion = () => {
    history.push(`/pullRequest/${contribution.id}`);
  };

  let stateImg;
  switch (contribution.state) {
    case PrState.closed:
      stateImg = <div className={styles.round_image}><ClosedPRSvg /></div>;
      break;
    case PrState.accepted:
      stateImg = (
        <div className={styles.round_image}>
          <AcceptedSvg />
          {' '}
        </div>
      );
      break;
    case PrState.open:
      stateImg = (
        <div className={styles.round_image}>
          <OpenSvg />
          {' '}
        </div>
      );
      break;
    default:
      stateImg = null;
  }

  return (
    <div className={styles.versionItem} onClick={goToVersion}>
      <div className={styles.left}>
        {stateImg}
        <span className={styles.postHeaderInfo}>{timeToLocal(contribution.createdAt)}</span>
        <div className={styles.dot}><DividerSvg /></div>
        <span className={styles.postHeaderInfo}>{contribution.title}</span>
      </div>
      <div>{contribution.state}</div>
    </div>
  );
};

export default MyContributionItem;
