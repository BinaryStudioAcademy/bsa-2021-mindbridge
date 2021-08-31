import React, { FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface ITagsMenuProps {
  className?: string;
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag, className }) => (
  <Button className={classNames(styles.tagBtn, className)} content={tag} primary />
);

export default TagsMenu;
