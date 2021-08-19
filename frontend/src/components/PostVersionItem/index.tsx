/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Link, useHistory } from 'react-router-dom';

export interface IPostVersionItemProps {
  postVersion: IPostVersion;
}

const PostVersionItem: FunctionComponent<IPostVersionItemProps> = ({ postVersion }) => {
  const history = useHistory();

  const goToVersion = () => {
    history.push(`/postVersion/${postVersion.id}`);
    history.go();
  };

  return (
    <div className={styles.versionItem}>
      <Link to={`/user/${postVersion.author?.id}`} className={styles.userName}>
        <Image
          src={postVersion.author?.avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
          avatar
          size="small"
        />
        <span>{postVersion.author?.nickname}</span>
        <DividerSvg />
      </Link>
      <div role="button" tabIndex={0} className={styles.another} onClick={goToVersion}>
        <span className={styles.postHeaderInfo}>{postVersion.createdAt}</span>
      </div>
    </div>
  );
};

export default PostVersionItem;
