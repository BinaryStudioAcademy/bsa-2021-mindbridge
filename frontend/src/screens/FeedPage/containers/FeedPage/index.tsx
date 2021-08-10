import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { addMorePostsRoutine, fetchDataRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import LoaderWrapper from '@components/LoaderWrapper';

export interface IFeedPageProps extends IState, IActions {
}

interface IState {
  data: IPostList;
  dataLoading: boolean;
  hasMore: boolean;
  loadMore: boolean;
}

interface IActions {
  fetchData: IBindingCallback1<Record<string, number>>;
  setLoadMorePosts: IBindingAction;
}

const params = {
  from: 0,
  count: 10
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore }
) => {
  useEffect(() => {
    fetchData(params);
  }, []);

  const handleLoadMorePosts = filtersPayload => {
    fetchData(filtersPayload);
  };

  const getMorePosts = () => {
    setLoadMorePosts();
    const { from, count } = params;
    params.from = from + count;
    handleLoadMorePosts(params);
  };

  if (dataLoading === true && loadMore === false) {
    return (
      <LoaderWrapper loading={dataLoading} />
    );
  }

  return (
    <div className={styles.feedPage}>
      <div className={styles.main}>
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={data.posts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={' '}
          scrollThreshold={0.9}
        >
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
        </InfiniteScroll>
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
  dataLoading: extractFetchDataLoading(state),
  hasMore: state.feedPageReducer.data.hasMore,
  loadMore: state.feedPageReducer.data.loadMore
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  setLoadMorePosts: addMorePostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
