import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const SuggestChangesBtn = ({ postId, isAuthor }) => {
  const history = useHistory();

  const handleGoToLink = () => {
    history.push(`/post/edit/${postId}`);
    history.go();
  };

  return (
    <Button onClick={handleGoToLink} className={styles.btnSuggest}>
      {isAuthor ? ('Edit post') : ('Suggest changes')}
    </Button>
  );
};

export default SuggestChangesBtn;
