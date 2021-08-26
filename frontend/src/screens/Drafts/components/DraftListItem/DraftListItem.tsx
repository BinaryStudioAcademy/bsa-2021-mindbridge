import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IDraft } from '@screens/Drafts/models/IDraft';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import TagsMenu from '@components/TagComponent';
import { ITag } from '@screens/FeedPage/models/ITag';
import { Link } from 'react-router-dom';
import DraftLabel from '@components/DraftLabel';

interface IDraftListItemProps {
  id: string;
  title: string;
  tags: ITag[];
  createdAt: string;
  coverImage: string;
}

const DraftListItem: FunctionComponent<IDraftListItemProps> = (
  {
    id,
    title,
    tags,
    createdAt,
    coverImage
  }
) => (
  <div className={styles.draftItem}>
    <div className={styles.upper}>
      <div className={styles.leftSide}>
        <Link to={`/post/${id}`}>{title}</Link>
        <DividerSvg />
        <span className={styles.createdAt}>{createdAt}</span>
      </div>
      <div>
        <DraftLabel />
        <DividerSvg />
        <img src={coverImage ?? 'https://i.imgur.com/KVI8r34.jpg'} alt="Preview" />
      </div>
    </div>
    <div className={styles.btnWrapper}>
      {tags.map(tag => (
        <TagsMenu
          key={tag.id}
          tag={tag.name}
        />
      ))}
    </div>
  </div>
);

export default DraftListItem;
