import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Card, Feed } from 'semantic-ui-react';
import { IRelatedPost } from '@screens/ViewPost/models/IRelatedPost';
import readingTime from 'reading-time';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import { Link } from 'react-router-dom';
import Image from '@components/Image';
import { defaultAvatar, defaultCoverImage } from '@images/defaultImages';

interface IRelatedPostsProps {
  relatedPosts: IRelatedPost[];
}

const RelatedPosts: FunctionComponent<IRelatedPostsProps> = ({ relatedPosts }) => (
  <div className={styles.relatedPostsWrp}>
    <div className={styles.headerTitle}>Similar posts</div>
    <Card.Group>
      {relatedPosts.map(relatedPost => (
        <Card>
          <Image
            className={styles.coverImage}
            src={relatedPost.coverImage ?? defaultCoverImage}
            alt="media"
          />
          <Card.Content>
            <Feed>
              <Link to={`/post/${relatedPost.id}`}>
                <div className={styles.title}>{relatedPost.title}</div>
              </Link>
              <div className={styles.authorInfo}>

                <div className={styles.userBlock}>
                  <Link to={`/user/${relatedPost.author.id}`}>
                    <Image src={relatedPost.author.avatar ?? defaultAvatar} />
                  </Link>
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
