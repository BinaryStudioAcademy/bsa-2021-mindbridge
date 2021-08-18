import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const SuggestChangesBtn = ({ postId }) => {
  const history = useHistory();

  const handleSuggestChangesClick = id => {
    history.push(`/post/edit/${id}`);
    history.go();
  };
  return (
    <Button className={styles.btnSuggest} onClick={() => handleSuggestChangesClick(postId)}>
      Suggest Change
    </Button>
  );
};

export default SuggestChangesBtn;
