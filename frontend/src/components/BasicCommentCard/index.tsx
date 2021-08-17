import React from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';

/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
export const CommentCard = () => (
  <div className={styles.main}>
    <p className={styles.commentCounter}> Discussion (58) </p>
    <form className="ui reply form">
      <div className="field">
        <textarea placeholder="Add to the discussion..." />
      </div>
      <DarkBorderButton className={styles.buttonSend} content="Send" />
    </form>
    <div className="ui comments">
      <div className="comment">
        <div className={styles.commentInfo}>
          <a href="/" className="avatar">
            <img src="https://i.imgur.com/LaWyPZF.png" />
          </a>
          <a href="/" className="author">Jaxson Botosh</a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">2 hour ago</span>
          </div>
        </div>
        <div className="content">
          <div className="text">
            First
          </div>
          <div className="actions">
            <DarkBorderButton className={styles.btnReplay} content="Replay" />
          </div>
        </div>
      </div>
      <div className="comment">
        <div className={styles.commentInfo}>
          <a href="/" className="avatar">
            <img src="https://i.imgur.com/LaWyPZF.png" />
          </a>
          <a href="/" className="author">Kaylynn Philips</a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">3 hour ago</span>
          </div>
        </div>
        <div className="content">
          <div className="text">
            Second
          </div>
          <div className="actions">
            <DarkBorderButton className={styles.btnReplay} content="Replay" />
          </div>
        </div>
        <div className="comments">
          <div className="comment">
            <div className={styles.commentInfo}>
              <a href="/" className="avatar">
                <img src="https://i.imgur.com/LaWyPZF.png" />
              </a>
              <a href="/" className="author">Davis Vaccaro</a>
              <DividerSvg />
              <div className="metadata">
                <span className="date">22 min ago</span>
              </div>
            </div>
            <div className="content">
              <div className="text">
                First comment
              </div>
              <div className="actions">
                <DarkBorderButton className={styles.btnReplay} content="Replay" />
              </div>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              <div className={styles.commentInfo}>
                <a href="/" className="avatar">
                  <img src="https://i.imgur.com/LaWyPZF.png" />
                </a>
                <a href="/" className="author">Talan Rhiel Madsen</a>
                <DividerSvg />
                <div className="metadata">
                  <span className="date">15 min ago</span>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  Comment on first answer
                </div>
                <div className="actions">
                  <DarkBorderButton className={styles.btnReplay} content="Replay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <div className={styles.commentInfo}>
          <a href="/" className="avatar">
            <img src="https://i.imgur.com/LaWyPZF.png" />
          </a>
          <a href="/" className="author">Skylar Botosh</a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">22 min ago</span>
          </div>
        </div>
        <div className="content">
          <div className="text">
            Third
          </div>
          <div className="actions">
            <DarkBorderButton className={styles.btnReplay} content="Replay" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
