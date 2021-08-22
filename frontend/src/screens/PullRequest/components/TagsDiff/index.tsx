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

const isEqual = (oldTags, newTags) => {
  if (oldTags.length !== newTags.length) return false;
  oldTags.forEach(element1 => {
    newTags.forEach(element2 => {
      if (element1.id !== element2.id) {
        return false;
      } return true;
    });
  });
  return true;
};

const TagsDiff = ({ className, oldTags, newTags }: ITagsDiffProps) => {
  if (isEqual(oldTags, newTags)) {
    return (
      <div className={classNames(className, styles.tagsDiff)}>
        <div className={styles.new}>
          <span>Tags:</span>
          {newTags && newTags.map(tag => (
            <TagsMenu
              key={tag.id}
              tag={tag.name}
            />
          ))}
        </div>
      </div>
    );
  }
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
  );
};
export default TagsDiff;
