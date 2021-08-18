import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { ITag } from '@root/screens/ViewPost/models/ITag';
import TagsMenu from '@root/screens/ViewPost/components/TagsMenu';

// eslint-disable-next-line max-len
interface ITagsDiffProps {
  className?: string;
  oldTags: ITag[];
  newTags: ITag[];
}

const TagsDiff = ({ className, oldTags, newTags }: ITagsDiffProps) => {

  return (
    <div className={classNames(className, styles.tagsDiff)}>
      <div className={styles.new}>
        <span>New tags:</span>
        {newTags && newTags.map(tag => (
          <TagsMenu
            key={tag.id}
            tag={tag.name}
          />
        ))}
      </div>
      <div className={styles.old}>
      <span>Old tags:</span>
        {oldTags && oldTags.map(tag => (
          <TagsMenu
            key={tag.id}
            tag={tag.name}
          />
        ))}
      </div>
    </div>
  )
}
export default TagsDiff;