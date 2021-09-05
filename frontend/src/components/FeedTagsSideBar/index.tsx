import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { ITag } from '@screens/FeedPage/models/ITag';
import LoaderWrapper from '@components/LoaderWrapper';
import { useHistory } from 'react-router-dom';

interface IFeedTagsSideBarProps {
  initialTagsData: {
    popularTags: ITag[];
    isTagsLoaded: true;
  };
}

const FeedTagsSideBar: FunctionComponent<IFeedTagsSideBarProps> = ({
  initialTagsData
}) => {
  const history = useHistory();

  return (
    <div className={styles.tagsSideBar}>
      <div className={styles.title}>
        Popular tags
      </div>
      <div className={styles.btnWrapper}>
        {initialTagsData.isTagsLoaded ? (
          <div>
            {initialTagsData.popularTags.map(tag => (
              <button
                type="button"
                key={tag.id}
                className={styles.tag}
                onClick={() => {
                  history.push(`/tag/${tag.name}`);
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        ) : <LoaderWrapper loading />}
      </div>
    </div>
  );
};

export default FeedTagsSideBar;
