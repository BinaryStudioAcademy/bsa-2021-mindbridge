import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';
import HistorySidebar from '@root/components/PostHistorySidebar';

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
const history = ["22 june, 7:50", "20 june, 13:10", "2 june, 13:50"]

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
    <div className={styles.history_sidebar_container}>
      <HistorySidebar history={history}/>
    </div>
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
        <label className={styles.file_input_rectangle}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0833 0H1.91675C0.859834 0 0 0.859863 0 1.91678V13.0833C0 14.1401 0.859834 15 1.91675 15H13.0833C14.1402 15 15 14.1401 15 13.0832V1.91678C15 0.859863 14.1402 0 13.0833 0ZM14.1165 13.0833C14.1165 13.653 13.653 14.1165 13.0833 14.1165H1.91675C1.34701 14.1165 0.883506 13.653 0.883506 13.0833V11.4717L3.79137 8.99757C3.89748 8.90728 4.05229 8.90643 4.15939 8.99537L5.9809 10.5079C6.15653 10.6537 6.41435 10.6418 6.57574 10.4802L10.9037 6.14561C10.982 6.06724 11.0732 6.05962 11.1208 6.06205C11.1682 6.06448 11.2583 6.08142 11.3281 6.1674L14.1165 9.6007V13.0833H14.1165ZM14.1165 8.19917L12.0139 5.61032C11.8054 5.35356 11.4964 5.19659 11.166 5.17963C10.8359 5.16293 10.5122 5.28721 10.2785 5.52129L6.23531 9.57073L4.72389 8.31568C4.28563 7.95176 3.65271 7.95554 3.21882 8.32471L0.883506 10.3117V1.91678C0.883506 1.34704 1.34701 0.883535 1.91675 0.883535H13.0833C13.653 0.883535 14.1165 1.34704 14.1165 1.91678V8.19917Z" fill="#9AA4B2" />
            <path d="M4.72206 1.84521C3.5474 1.84521 2.5918 2.80088 2.5918 3.97548C2.5918 5.15011 3.54743 6.10574 4.72206 6.10574C5.89669 6.10574 6.85232 5.15011 6.85232 3.97548C6.85232 2.80085 5.89672 1.84521 4.72206 1.84521ZM4.72206 5.22224C4.03458 5.22224 3.4753 4.66293 3.4753 3.97548C3.4753 3.288 4.03458 2.72872 4.72206 2.72872C5.40954 2.72872 5.96882 3.28803 5.96882 3.97548C5.96882 4.66293 5.40954 5.22224 4.72206 5.22224Z" fill="#9AA4B2" />
          </svg>
          <span>Add a cover image</span>
          <input className={styles.invisible} type="file"></input>
        </label>
        <input type="text" placeholder="Enter the title of the article"></input>
        <div className={styles.content_input_container}>
          <label className={styles.file_input_round}>
            <svg width="15" height="15" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5721 0H2.42788C1.08912 0 0 1.08916 0 2.42792V16.5721C0 17.9108 1.08912 19 2.42788 19H16.5721C17.9109 19 19 17.9108 19 16.5721V2.42792C19 1.08916 17.9109 0 16.5721 0ZM17.8809 16.5721C17.8809 17.2938 17.2937 17.8809 16.5721 17.8809H2.42788C1.70621 17.8809 1.11911 17.2937 1.11911 16.5721V14.5308L4.8024 11.3969C4.93681 11.2825 5.13289 11.2815 5.26857 11.3941L7.5758 13.31C7.79827 13.4947 8.12484 13.4796 8.32927 13.2749L13.8114 7.78443C13.9105 7.68517 14.026 7.67552 14.0863 7.6786C14.1464 7.68168 14.2605 7.70313 14.349 7.81204L17.8809 12.1609V16.5721H17.8809ZM17.8809 10.3856L15.2177 7.10641C14.9536 6.78118 14.5621 6.58235 14.1436 6.56086C13.7255 6.53971 13.3155 6.69713 13.0195 6.99363L7.89806 12.1229L5.98359 10.5332C5.42847 10.0722 4.62676 10.077 4.07717 10.5446L1.11911 13.0615V2.42792C1.11911 1.70625 1.70621 1.11914 2.42788 1.11914H16.5721C17.2938 1.11914 17.8809 1.70625 17.8809 2.42792V10.3856Z" fill="#66B9FF" />
              <path d="M5.98105 2.3374C4.49315 2.3374 3.28271 3.54791 3.28271 5.03574C3.28271 6.5236 4.49319 7.73407 5.98105 7.73407C7.46891 7.73407 8.67938 6.5236 8.67938 5.03574C8.67938 3.54787 7.46895 2.3374 5.98105 2.3374ZM5.98105 6.61496C5.11024 6.61496 4.40182 5.90651 4.40182 5.03574C4.40182 4.16493 5.11024 3.45651 5.98105 3.45651C6.85186 3.45651 7.56028 4.16496 7.56028 5.03574C7.56028 5.90651 6.85186 6.61496 5.98105 6.61496Z" fill="#66B9FF" />
            </svg>
            <input className={styles.invisible} type="file"></input>
          </label>
          <textarea className={styles.content_input} placeholder="Write your post content"></textarea>
        </div>
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
