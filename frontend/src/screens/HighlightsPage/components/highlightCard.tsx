import React, { FunctionComponent } from 'react';
import { Card, CardContent } from 'semantic-ui-react';

interface IHighlightCardProps {
  highlight: any;
}
const HighlightCard: FunctionComponent<IHighlightCardProps> = ({ highlight }) => (
  <div>
    <p>{highlight.text}</p>
  </div>
);

export default HighlightCard;
