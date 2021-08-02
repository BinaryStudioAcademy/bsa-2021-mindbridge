import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface ITagsMenuProps {
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag }) => (
      <button className={styles.tag}>{tag}</button>
);

export default TagsMenu;
