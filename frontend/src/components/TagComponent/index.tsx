import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import ReactPlaceholder from 'react-placeholder';

interface ITagsMenuProps {
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag }) => (
  <button type="button" className={styles.tag}>{tag}</button>
);

export default TagsMenu;
