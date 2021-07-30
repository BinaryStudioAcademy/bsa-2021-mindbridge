import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/HistorySidebar';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}
//use real value
const notificationCount = 3;
const userName = "Charlie Culhane";
const avatar = "https://lh3.googleusercontent.com/proxy/-bkRSqw6vRpujAkZ8wupHS9ls_2fQvQw8rEBtNch1-5HELvgCrP5hx-k810ntE059vEPmsg4LeSsyh4";
const folloversCount = 6.6 + "K";
const rating = 5.4 + "K";
const postNotificationCount = 4;

const CreatePost: React.FC<ICreatePostProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>
    <div className={styles.header_container}>
      <Header notificationCount={notificationCount}/>
    </div>
    <div className={styles.profile_sidebar_container}>
      <ProfileSidebar 
      userName={userName} 
      avatar={avatar}
      folloversCount={folloversCount}
      rating={rating}
      postNotificationCount={postNotificationCount}
      />
    </div>
    
    <HistorySidebar/>
    <div className={styles.create_post_container}>
      <form className={styles.create_post_form}>
        <div className={styles.header}>
          <button className={classNames(styles.colorless_button, styles.html_button) }>HTML</button>
          <button className={classNames(styles.blue_button, styles.markdown_button) }>Markdown</button>
          <button className={styles.edit_button}>
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.1511 13.0764C21.8209 13.0764 21.5533 13.3439 21.5533 13.6741V18.9812C21.5522 19.9712 20.7501 20.7735 19.7602 20.7744H2.98862C1.99864 20.7735 1.19662 19.9712 1.19545 18.9812V3.40513C1.19662 2.41538 1.99864 1.61312 2.98862 1.61195H8.29576C8.62591 1.61195 8.89348 1.34438 8.89348 1.01423C8.89348 0.684312 8.62591 0.416504 8.29576 0.416504H2.98862C1.33881 0.418372 0.00186789 1.75531 0 3.40513V18.9814C0.00186789 20.6313 1.33881 21.9682 2.98862 21.9701H19.7602C21.41 21.9682 22.7469 20.6313 22.7488 18.9814V13.6741C22.7488 13.3439 22.4812 13.0764 22.1511 13.0764Z" fill="#66B9FF"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5121 0.879149C15.4616 -0.171305 13.7586 -0.171305 12.7081 0.879149L2.04433 11.5429C1.97125 11.616 1.91848 11.7066 1.89093 11.8061L0.488608 16.8687C0.430937 17.0763 0.489542 17.2986 0.641775 17.4511C0.794242 17.6033 1.01652 17.6619 1.22409 17.6045L6.28677 16.2019C6.38624 16.1744 6.47683 16.1216 6.54991 16.0485L17.2135 5.3845C18.2623 4.33334 18.2623 2.6317 17.2135 1.58054L16.5121 0.879149ZM3.34671 11.9314L12.0742 3.20374L14.8889 6.01841L6.16115 14.7461L3.34671 11.9314ZM2.78448 13.0597L5.03318 15.3086L1.92268 16.1704L2.78448 13.0597ZM16.3682 4.53928L15.7343 5.17319L12.9194 2.35828L13.5536 1.72437C14.137 1.14089 15.0831 1.14089 15.6666 1.72437L16.3682 2.42576C16.9508 3.00994 16.9508 3.95533 16.3682 4.53928Z" fill="#66B9FF"/>
            </svg>
          </button>
          <button className={styles.view_button}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.8475 11.5331C23.6331 11.2398 18.5245 4.35156 11.9999 4.35156C5.47529 4.35156 0.366469 11.2398 0.152297 11.5328C-0.0507657 11.8111 -0.0507657 12.1885 0.152297 12.4667C0.366469 12.76 5.47529 19.6483 11.9999 19.6483C18.5245 19.6483 23.6331 12.76 23.8475 12.467C24.0508 12.1888 24.0508 11.8111 23.8475 11.5331ZM11.9999 18.0659C7.19383 18.0659 3.03127 13.494 1.79907 11.9994C3.02968 10.5035 7.18351 5.93397 11.9999 5.93397C16.8057 5.93397 20.968 10.505 22.2007 12.0005C20.9701 13.4963 16.8163 18.0659 11.9999 18.0659Z" fill="#66B9FF" />
              <path d="M12 7.25293C9.38236 7.25293 7.25269 9.3826 7.25269 12.0002C7.25269 14.6178 9.38236 16.7475 12 16.7475C14.6176 16.7475 16.7472 14.6178 16.7472 12.0002C16.7472 9.3826 14.6176 7.25293 12 7.25293ZM12 15.165C10.2548 15.165 8.83514 13.7453 8.83514 12.0002C8.83514 10.2551 10.2548 8.83538 12 8.83538C13.7451 8.83538 15.1648 10.2551 15.1648 12.0002C15.1648 13.7453 13.7451 15.165 12 15.165Z" fill="#66B9FF" />
            </svg>
          </button>
        </div>
        <input placeholder="Add a cover image"></input>
        <input type="text" placeholder="Enter the title of the article"></input>
        <textarea className={styles.content_input}  placeholder="Write your post content"></textarea>
        <input  type="text" placeholder="Enter tags"></input>
        <div className={styles.footer}>
          <button className={styles.dark_border_button}>Cancel</button>
          <button className={styles.dark_border_button}>Save draft</button>
          <button className={styles.dark_button}>Publish</button>
        </div>
      </form>
    </div>
  </div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
