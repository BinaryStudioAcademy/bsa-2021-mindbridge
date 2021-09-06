import React, { FunctionComponent } from 'react';
import { Popup } from 'semantic-ui-react';

interface ISharePopup {
  triggerContent: any;
  popupContent: string;
  handleOnClose: any;
}

const SharePopup: FunctionComponent<ISharePopup> = ({ triggerContent, popupContent, handleOnClose }) => (
  <Popup
    content={popupContent}
    mouseEnterDelay={1000}
    onClose={handleOnClose}
    on="hover"
    position="top center"
    style={{ width: '6.4286rem', textAlign: 'center' }}
    trigger={triggerContent}
  />
);

export default SharePopup;
