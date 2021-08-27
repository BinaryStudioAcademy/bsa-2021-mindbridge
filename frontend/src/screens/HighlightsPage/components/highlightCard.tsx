import React, { FunctionComponent } from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface IHighlightCardProps {
  highlight: any;
}
const HighlightCard: FunctionComponent<IHighlightCardProps> = ({ highlight }) => (
  <Card>
    <CardContent className={styles.highlightCard}>
      {highlight.text}
    </CardContent>
  </Card>
);

export default HighlightCard;
