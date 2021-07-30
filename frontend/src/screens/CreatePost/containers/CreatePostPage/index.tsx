import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}
//use real value
const notificationCount = 3;
const userName = "Charlie Culhane";
const avatar = "https://lh3.googleusercontent.com/proxy/KA7uim8AQvkXZU1zJyDVZAqC9UiYiR3Pf5cf_bzkxisffCmWtY9-JJ6xrCRe7i7eJVxjZenryL2wa4U";
const folloversCount = 6.6 + "K";
const rating = 5.4 + "K";
const postNotificationCount = 4;

const CreatePost: React.FC<ICreatePostProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>
    <Header notificationCount={notificationCount}/>
    <ProfileSidebar 
      userName={userName} 
      avatar={avatar}
      folloversCount={folloversCount}
      rating={rating}
      postNotificationCount={postNotificationCount}
    />
    <div className={styles.create_post_container}>
      <form className={styles.create_post_form}>
        <div className={styles.header}>
          <button className={classNames(styles.colorless_button, styles.html_button) }>HTML</button>
          <button className={classNames(styles.blue_button, styles.markdown_button) }>Markdown</button>
          <button className={styles.edit_button}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <path d="M22.1511 15.0764C21.8209 15.0764 21.5533 15.3439 21.5533 15.6741V20.9812C21.5522 21.9712 20.7501 22.7735 19.7602 22.7744H2.98862C1.99864 22.7735 1.19662 21.9712 1.19545 20.9812V5.40513C1.19662 4.41538 1.99864 3.61312 2.98862 3.61195H8.29576C8.62591 3.61195 8.89348 3.34438 8.89348 3.01423C8.89348 2.68431 8.62591 2.4165 8.29576 2.4165H2.98862C1.33881 2.41837 0.00186789 3.75531 0 5.40513V20.9814C0.00186789 22.6313 1.33881 23.9682 2.98862 23.9701H19.7602C21.41 23.9682 22.7469 22.6313 22.7488 20.9814V15.6741C22.7488 15.3439 22.4812 15.0764 22.1511 15.0764Z" fill="#66B9FF" />
                <path d="M22.5121 0.879149C21.4616 -0.171305 19.7586 -0.171305 18.7081 0.879149L8.04433 11.5429C7.97125 11.616 7.91848 11.7066 7.89093 11.8061L6.48861 16.8687C6.43094 17.0763 6.48954 17.2986 6.64178 17.4511C6.79424 17.6033 7.01652 17.6619 7.22409 17.6045L12.2868 16.2019C12.3862 16.1744 12.4768 16.1216 12.5499 16.0485L23.2135 5.3845C24.2623 4.33334 24.2623 2.6317 23.2135 1.58054L22.5121 0.879149ZM9.34671 11.9314L18.0742 3.20374L20.8889 6.01841L12.1612 14.7461L9.34671 11.9314ZM8.78448 13.0597L11.0332 15.3086L7.92268 16.1704L8.78448 13.0597ZM22.3682 4.53928L21.7343 5.17319L18.9194 2.35828L19.5536 1.72437C20.137 1.14089 21.0831 1.14089 21.6666 1.72437L22.3682 2.42576C22.9508 3.00994 22.9508 3.95533 22.3682 4.53928Z" fill="#66B9FF" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
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
