import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import { Loader } from 'semantic-ui-react';
import LoaderWrapper from "@components/LoaderWrapper";

export interface IFeedPageProps extends IState, IActions {
}

interface IState {
  data: IPostList;
  dataLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  fetchData: IBindingAction;
}

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading }
) => {
  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading === true) {
    return (
      <LoaderWrapper loading={dataLoading} />
    );
  }

  return (
    <div className={styles.feedPage}>
      <div className={styles.main}>
        {data.posts[0].id ? (
          data.posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <p>
            🔍 Seems like there are no posts...
            Please try another query
          </p>
        )}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.logInSideBar}>
          <FeedLogInSidebar />
        </div>
        <div className={styles.tagsSideBar}>
          <FeedTagsSideBar />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  dataLoading: extractFetchDataLoading(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
