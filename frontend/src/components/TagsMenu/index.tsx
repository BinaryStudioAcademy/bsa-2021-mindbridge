import React, { FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';

interface ITagsMenuProps {
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag }) => (
  <Button content={tag} primary />
);

export default TagsMenu;
