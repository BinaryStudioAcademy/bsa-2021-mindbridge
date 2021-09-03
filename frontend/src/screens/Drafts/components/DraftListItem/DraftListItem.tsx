import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import TagsMenu from '@components/TagComponent';
import { ITag } from '@screens/FeedPage/models/ITag';
import { Link } from 'react-router-dom';
import DraftLabel from '@components/DraftLabel';
import Image from '@components/Image';
import {defaultCoverImage} from "@images/defaultImages";

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
    <DraftLabel />
    <div className={styles.upper}>
      <div className={styles.leftSide}>
        <Link to={`/post/${id}`}>{title}</Link>
        <DividerSvg />
        <span className={styles.createdAt}>{createdAt}</span>
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
    <Image src={coverImage ?? defaultCoverImage} alt="Preview" />
  </div>
);

export default DraftListItem;
