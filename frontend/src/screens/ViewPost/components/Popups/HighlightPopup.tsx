import React, { FunctionComponent } from 'react';
import styles from '@screens/ViewPost/components/ViewPostCard/styles.module.scss';
import { Button, Popup } from 'semantic-ui-react';
import TextRenderer from '@components/TextRenderer';

interface IHighlightPopupProps {
  isPopUpShown: any;
  xPos: number;
  yPos: number;
  handleClosePopUp: any;
  markdown: boolean;
  text: string;
  isDeletion: boolean;
}
const HighlightPopup: FunctionComponent<IHighlightPopupProps> = ({ isPopUpShown, xPos, yPos,
  handleClosePopUp, isDeletion, markdown, text }) => (
    <Popup
      open={isPopUpShown}
      className={styles.highlightPopup}
      style={{
        transform: `translate3d(${xPos}px, ${yPos - 60}px, 0px)`,
        backgroundColor: '#f4f9ff',
        cursor: 'pointer',
        padding: !isDeletion ? '0' : undefined
      }}
      position="top center"
      content={!isDeletion ? (
        <Button
          style={{ backgroundColor: '#f4f9ff' }}
          icon="quote left"
          onClick={() => handleClosePopUp()}
        />
      ) : (
        <span className={styles.deleteLabel}>Click to unhighlight</span>
      )}
      pinned
      trigger={(
        <TextRenderer
          className={styles.content}
          markdown={markdown}
          content={text}
        />
    )}
    />
);

export default HighlightPopup;
