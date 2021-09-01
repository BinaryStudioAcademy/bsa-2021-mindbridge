import React, { FunctionComponent } from 'react';
import styles from '@screens/ViewPost/components/ViewPostCard/styles.module.scss';
import { Button, Popup } from 'semantic-ui-react';
import TextRenderer from '@components/TextRenderer';
import { IPost } from '@screens/ViewPost/models/IPost';

interface IHighlightPopupProps {
  isPopUpShown: any;
  xPos: number;
  yPos: number;
  handleClosePopUp: any;
  post: IPost;
  isDeletion: boolean;
}
const HighlightPopup: FunctionComponent<IHighlightPopupProps> = ({ isPopUpShown, xPos, yPos,
  handleClosePopUp, post, isDeletion }) => (
    <Popup
      open={isPopUpShown}
      className={styles.highlightPopup}
      style={!isDeletion ? {
        transform: `translate3d(${xPos}px, ${yPos - 60}px, 0px)`,
        backgroundColor: '#f4f9ff',
        cursor: 'pointer',
        padding: '0'
      } : {
        transform: `translate3d(${xPos}px, ${yPos - 60}px, 0px)`,
        backgroundColor: '#f4f9ff',
        cursor: 'pointer'
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
          markdown={post.markdown}
          content={post.text}
        />
    )}
    />
);

export default HighlightPopup;