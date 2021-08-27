import React, { FunctionComponent, useState } from 'react';
import { Card, CardContent, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface IHighlightCardProps {
  highlight: any;
}
const HighlightCard: FunctionComponent<IHighlightCardProps> = ({ highlight }) => {
  const [eventsEnabled, setEventsEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Card>
        <CardContent className={styles.highlightCard}>
          <div className={styles.postTitle}>
            {highlight.postTitle}
          </div>
          <div className={styles.quoteText}>
            {highlight.text}
          </div>
          <Popup
            content="Unhighlight"
            eventsEnabled={eventsEnabled}
            on="click"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            position="bottom center"
            style={{ left: '23.1rem', top: '-0.7rem' }}
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
