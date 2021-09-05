import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { IAchievementToUser } from '@root/screens/ProfilePage/models/IAchievementToUser';
import { Popup } from 'semantic-ui-react';
import WriterSvg from './AchievementsSVGs/WriterSvg';
import ContributorSvg from './AchievementsSVGs/ContributorSvg';
import { AchievementType } from './Types';
import AwesomeSvg from './AchievementsSVGs/AwesomeSvg';
import PopularSvg from './AchievementsSVGs/PopularSvg';
import TimeSvg from './AchievementsSVGs/TimeSvg';

// eslint-disable-next-line max-len
interface IAchievementProps {
  className?: string;
  achievement: IAchievementToUser;
}

const Achievement = ({ className, achievement }: IAchievementProps) => {
  let svg;
  switch (achievement.type) {
    case AchievementType.write: svg = <WriterSvg />;
      break;
    case AchievementType.contributor: svg = <ContributorSvg />;
      break;
    case AchievementType.awesome: svg = <AwesomeSvg />;
      break;
    case AchievementType.popular: svg = <PopularSvg />;
      break;
    case AchievementType.time: svg = <TimeSvg />;
      break;
    default: svg = <TimeSvg />;
  }

  return (
    <div className={classNames(className, styles.achievement)}>
      <Popup
        trigger={(
          <div>
            <div className={styles.svg}>{svg}</div>
            {!achievement.hasAchievement && 'has not'}
          </div>
        )}
        content={(
          <div>
            <div className={styles.title}>{achievement.title}</div>
            <div>{achievement.text}</div>
          </div>
        )}
        position="bottom center"
        mouseEnterDelay={500}
        mouseLeaveDelay={500}
      />
    </div>
  );
};

export default Achievement;
