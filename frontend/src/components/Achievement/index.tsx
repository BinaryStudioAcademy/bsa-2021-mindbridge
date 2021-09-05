import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { IAchievementToUser } from '@root/screens/ProfilePage/models/IAchievementToUser';
import { Popup } from 'semantic-ui-react';
import WriterSvg from './AchievementsSVGs/WriterSvg';
import Contributor3Svg from './AchievementsSVGs/Contributor_3Svg';
import { AchievementType } from './Types';
import AwesomeSvg from './AchievementsSVGs/AwesomeSvg';
import PopularSvg from './AchievementsSVGs/PopularSvg';
import TimeSvg from './AchievementsSVGs/TimeSvg';
import Writer1Svg from './AchievementsSVGs/Writer_1Svg';
import Writer2Svg from './AchievementsSVGs/Writer_2Svg';
import Writer3Svg from './AchievementsSVGs/Writer_3Svg';
import Writer4Svg from './AchievementsSVGs/Writer_4Svg';
import Contributor1Svg from './AchievementsSVGs/Contributor_1Svg';
import Contributor2Svg from './AchievementsSVGs/Contributor_2Svg';
import Contributor4Svg from './AchievementsSVGs/Contributor_4Svg';
import Awesome1Svg from './AchievementsSVGs/Awesome_1Svg';
import Awesome2Svg from './AchievementsSVGs/Awesome_2Svg';
import Awesome3Svg from './AchievementsSVGs/Awesome_3Svg';
import Awesome4Svg from './AchievementsSVGs/Awesome_4Svg';
import Comments1Svg from './AchievementsSVGs/Comments_1Svg';
import Comments2Svg from './AchievementsSVGs/Comments_2Svg';
import Comments3Svg from './AchievementsSVGs/Comments_3Svg';
import Comments4Svg from './AchievementsSVGs/Comments_4Svg';
import Time1Svg from './AchievementsSVGs/Time_1Svg';
import Time2Svg from './AchievementsSVGs/Time_2Svg';
import Time3Svg from './AchievementsSVGs/Time_3Svg';
import Time4Svg from './AchievementsSVGs/Time_4Svg';
import Popular1Svg from './AchievementsSVGs/Popular_1Svg';
import Popular2Svg from './AchievementsSVGs/Popular_2Svg';
import Popular3Svg from './AchievementsSVGs/Popular_3Svg';
import Popular4Svg from './AchievementsSVGs/Popular_4Svg';

// eslint-disable-next-line max-len
interface IAchievementProps {
  className?: string;
  achievement: IAchievementToUser;
}

const colorBlue = '#66B9FF';

const Achievement = ({ className, achievement }: IAchievementProps) => {
  let svg;
  const fill = '#66B9FF';
  switch (achievement.type) {
    case AchievementType.write:
      switch (achievement.level) {
        case 1:
          svg = <Writer1Svg fill={fill} />;
          break;
        case 2:
          svg = <Writer2Svg fill={fill} />;
          break;
        case 3:
          svg = <Writer3Svg fill={fill} />;
          break;
        case 4:
          svg = <Writer4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
      break;
    case AchievementType.contributor:
      switch (achievement.level) {
        case 1:
          svg = <Contributor1Svg fill={fill} />;
          break;
        case 2:
          svg = <Contributor2Svg fill={fill} />;
          break;
        case 3:
          svg = <Contributor3Svg fill={fill} />;
          break;
        case 4:
          svg = <Contributor4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
      break;
    case AchievementType.popular:
      switch (achievement.level) {
        case 1:
          svg = <Popular1Svg fill={fill} />;
          break;
        case 2:
          svg = <Popular2Svg fill={fill} />;
          break;
        case 3:
          svg = <Popular3Svg fill={fill} />;
          break;
        case 4:
          svg = <Popular4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
      break;
    case AchievementType.awesome:
      switch (achievement.level) {
        case 1:
          svg = <Awesome1Svg fill={fill} />;
          break;
        case 2:
          svg = <Awesome2Svg fill={fill} />;
          break;
        case 3:
          svg = <Awesome3Svg fill={fill} />;
          break;
        case 4:
          svg = <Awesome4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
      break;
    case AchievementType.time:
      switch (achievement.level) {
        case 1:
          svg = <Time1Svg fill={fill} />;
          break;
        case 2:
          svg = <Time2Svg fill={fill} />;
          break;
        case 3:
          svg = <Time3Svg fill={fill} />;
          break;
        case 4:
          svg = <Time4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
      break;
    case AchievementType.comments:
      switch (achievement.level) {
        case 1:
          svg = <Comments1Svg fill={fill} />;
          break;
        case 2:
          svg = <Comments2Svg fill={fill} />;
          break;
        case 3:
          svg = <Comments3Svg fill={fill} />;
          break;
        case 4:
          svg = <Comments4Svg fill={fill} />;
          break;
        default: svg = <TimeSvg />;
      }
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
