import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import { PrState } from '@root/screens/PullRequest/models/IPostPR';

export interface IContributionsSidebarProps {
  contributions: IContribution[];
  postId: string;
}

const ContributionsSidebar: FunctionComponent<IContributionsSidebarProps> = ({ contributions, postId }) => {
  if (contributions.length === 0) {
    return null;
  }

  const links = [];
  contributions.forEach(contribution => {
    if (contribution.state === PrState.open) {
      links.push(
        <div key={contribution.id} className={styles.link}>
          <Link
            to={`/user/${contribution.author.id}`}
            className={styles.userName}
          >
            @
            {contribution.author.nickname}
          </Link>
          <div className={styles.dot} />
          <Link to={`/pullRequest/${contribution.id}`}>{contribution.createdAt}</Link>
        </div>
      );
    }
  });

  if (links.length === 0) {
    return (
      <div className={styles.contributions_sidebar_container}>
        <div className={styles.title}>
          <Link to={`/post/contributions/${postId}`}>See all contributions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contributions_sidebar_container}>
      <div className={styles.title}>
        <Link to={`/post/contributions/${postId}`}>Contributions</Link>
      </div>
      <div className={styles.pull_request_links}>
        {links}
      </div>
    </div>
  );
};

export default ContributionsSidebar;
