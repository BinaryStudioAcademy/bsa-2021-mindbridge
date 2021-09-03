import React, { FunctionComponent } from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import Highlighter from 'react-highlight-words';

interface IHighlightCardProps {
  highlight: IHighlight;
  handleDeleteHighlight: any;
}
const HighlightCard: FunctionComponent<IHighlightCardProps> = ({ highlight, handleDeleteHighlight }) => {
  const deleteHighlight = () => {
    handleDeleteHighlight(highlight.id);
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardContent className={styles.highlightCard}>
          <div className={styles.postHeader}>
            From
            {' '}
            <Link to={`/post/${highlight.postId}`}><span className={styles.title}>{highlight.postTitle}</span></Link>
            <button type="button" className={styles.deleteHighlight} onClick={deleteHighlight}>✖</button>
          </div>
          <Link to={`/post/${highlight.postId}`}>
            <div className={styles.quoteText}>
              <Highlighter
                highlightClassName={styles.highlightQuotes}
                searchWords={[highlight.text]}
                autoEscape
                textToHighlight={highlight.text}
              />
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default HighlightCard;
