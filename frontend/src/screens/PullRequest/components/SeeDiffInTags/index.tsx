import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { ITag } from '@root/screens/ViewPost/models/ITag';
import TagsMenu from '@root/screens/ViewPost/components/TagsMenu';

// eslint-disable-next-line max-len
interface ISeeDiffTagsProps {
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
  return false;
};

const SeeDiffTags = ({ className, oldTags, newTags }: ISeeDiffTagsProps) => {
  const tagArray = [];
  oldTags.forEach(element1 => {
    let isChanged = true;
    newTags.forEach(element2 => {
      if (element1.id === element2.id) {
        tagArray.push(
          <TagsMenu
            key={element1.id}
            tag={element1.name}
          />
        );
        isChanged = false;
      }
    });
    if (isChanged) {
      tagArray.push(
        <TagsMenu
          className={styles.redTag}
          key={element1.id}
          tag={element1.name}
        />
      );
    }
  });
  newTags.forEach(element1 => {
    let isChanged = true;
    oldTags.forEach(element2 => {
      if (element1.id === element2.id) {
        isChanged = false;
      }
    });
    if (isChanged) {
      tagArray.push(
        <TagsMenu
          className={styles.greenTag}
          key={element1.id}
          tag={element1.name}
        />
      );
    }
  });

  if (isEqual(oldTags, newTags)) {
    return (
      <div className={classNames(className, styles.tagsDiff)}>
        {newTags && newTags.map(tag => (
          <TagsMenu
            key={tag.id}
            tag={tag.name}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classNames(className, styles.tagsDiff)}>
      {tagArray}
    </div>
  );
};
export default SeeDiffTags;
