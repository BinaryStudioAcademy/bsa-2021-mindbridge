import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Card, Feed, Image } from 'semantic-ui-react';
import { IRelatedPost } from '@screens/ViewPost/models/IRelatedPost';
import PostInformation from '@screens/ViewPost/components/PostInformation/PostInformation';
import readingTime from 'reading-time';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import DraftLabel from '@components/DraftLabel';
import { Link } from 'react-router-dom';

interface IRelatedPostsProps {
  relatedPosts: IRelatedPost[];
}

const RelatedPosts: FunctionComponent<IRelatedPostsProps> = ({ relatedPosts }) => (
  <div className={styles.relatedPostsWrp}>
    <div className={styles.headerTitle}>Related posts</div>
    <Card.Group>
      {relatedPosts.map(relatedPost => (
        <Card>
          <img
            className={styles.coverImage}
            src={relatedPost.coverImage ?? 'https://i.imgur.com/KVI8r34.jpg'}
            alt="media"
          />
          <Card.Content>
            <Feed>
              <Link to={`/post/${relatedPost.id}`}>
                <div className={styles.title}>{relatedPost.title}</div>
              </Link>
              <div className={styles.authorInfo}>

                <div className={styles.userBlock}>
                  <Image src={relatedPost.author.avatar ?? 'https://i.imgur.com/LaWyPZF.png'} avatar size="big" />
                  <div className={styles.headerInfo}>
                    <Link to={`/user/${relatedPost.author.id}`}>
                      <span className={styles.userName}>
                        { relatedPost.author.nickname }
                      </span>
                    </Link>
                    <div>
                      <span className={styles.addInfo}>
                        { timeToLocal(relatedPost.createdAt) }
                      </span>
                      <DividerSvg />
                      <span className={styles.addInfo}>
                        {readingTime(relatedPost.text).text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Feed>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </div>
);

export default RelatedPosts;
