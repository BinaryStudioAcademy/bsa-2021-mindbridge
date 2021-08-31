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
}
const HighlightPopup: FunctionComponent<IHighlightPopupProps> = ({ isPopUpShown, xPos, yPos,
  handleClosePopUp, post }) => (
    <Popup
      open={isPopUpShown}
      className={styles.highlightPopup}
      style={{
        transform: `translate3d(${xPos}px, ${yPos - 60}px, 0px)`,
        backgroundColor: '#f4f9ff',
        cursor: 'pointer',
        padding: '0'
      }}
      position="top center"
      content={(
        <Button
          style={{ backgroundColor: '#f4f9ff' }}
          icon="quote left"
          onClick={() => handleClosePopUp()}
        />
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
