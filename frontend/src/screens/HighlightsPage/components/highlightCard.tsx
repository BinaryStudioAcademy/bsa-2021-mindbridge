import React, { FunctionComponent, useState } from 'react';
import { Button, Card, CardContent, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import Highlighter from 'react-highlight-words';

interface IHighlightCardProps {
  highlight: IHighlight;
  handleDeleteHighlight: any;
}
const HighlightCard: FunctionComponent<IHighlightCardProps> = ({ highlight, handleDeleteHighlight }) => {
  const [eventsEnabled, setEventsEnabled] = useState(true);
  const [open, setOpen] = useState(false);

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
          </div>
          <Link to={`/post/${highlight.postId}`}>
            <div className={styles.quoteText}>
              <Highlighter
                highlightClassName={styles.highlightQuotes}
                searchWords={[highlight.text]}
                autoEscape
                textToHighlight={highlight.text}
              />
              {/* {highlight.text} */}
            </div>
          </Link>
          <Popup
            content={(<Button style={{ backgroundColor: 'white' }} onClick={deleteHighlight}>Unhighlight</Button>)}
            eventsEnabled={eventsEnabled}
            on="click"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            position="bottom center"
            style={{ left: '23.1rem', top: '-0.7rem', cursor: 'pointer' }}
            trigger={(
              <div className={styles.arrowDown}>
                <svg width="21" height="21" viewBox="0 0 21 21" className="jh">
                  <path
                    d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"
                    fill="rgba(53, 53, 53, 0.4)"
                  />
                </svg>
              </div>
          )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HighlightCard;
