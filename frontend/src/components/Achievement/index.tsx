import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { IAchievement } from '@root/screens/ProfilePage/models/IAchievement';
import { Popup } from 'semantic-ui-react';
import WriterSvg from './AchievementsSVGs/WriterSvg';
import ContributorSvg from './AchievementsSVGs/ContributorSvg';

// eslint-disable-next-line max-len
interface IAchievementProps {
  className?: string;
  achievement: IAchievement;
}

const Achievement = ({ className, achievement }: IAchievementProps) => {

  let svg;
  switch (achievement.type) {
    case "Write": svg = <WriterSvg />
      break;
    case "Contributor": svg = <ContributorSvg />
      break;
  }

  return (
    <div className={classNames(className, styles.achievement)}>
      <Popup
        trigger={<div>
          <div className={styles.svg}>{svg}</div>
          <div>{achievement.title}</div>
        </div>}
        content={achievement.text}
        position='bottom center'
      />
    </div>
  );
}

export default Achievement;