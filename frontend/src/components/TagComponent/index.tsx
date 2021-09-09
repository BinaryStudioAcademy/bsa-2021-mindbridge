import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

interface ITagsMenuProps {
  tag: string;
}

const TagsMenu: FunctionComponent<ITagsMenuProps> = ({ tag }) => {
  const history = useHistory();

  return (
    <button
      type="button"
      className={styles.tag}
      onClick={() => {
        history.push(`/search?tags=${tag}&query=`);
      }}
    >
      {tag}
    </button>
  );
};

export default TagsMenu;
