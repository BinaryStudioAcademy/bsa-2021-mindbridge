import React, { FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface ITagsMenuProps {
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag }) => (
  <Button content={tag} primary />
);

export default TagsMenu;
