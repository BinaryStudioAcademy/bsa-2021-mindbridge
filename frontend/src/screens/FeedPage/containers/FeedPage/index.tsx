import React, { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroller';
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
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  fetchData: IBindingCallback1<Record<string, number>>;
  addMorePosts: IBindingAction;
}

const params = {
  from: 0,
  count: 5
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, addMorePosts }
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(params);
  }, []);

  const handleLoadMorePosts = filtersPayload => {
    // addMorePosts();
    // const { from, count } = params;
    // params.from = from + count;
    // fetchData(params);
    dispatch(fetchData(filtersPayload));
  };

  const getMorePosts = () => {
    addMorePosts();
    const { from, count } = params;
    params.from = from + count;
    handleLoadMorePosts(params);
  };

  // if (dataLoading === true) {
  //   return (
  //     <LoaderWrapper loading={dataLoading} />
  //   );
  // }

  return (
    <div className={styles.feedPage}>
      <div className={styles.main}>
        <InfiniteScroll
          pageStart={0}
          loadMore={getMorePosts}
          loader={<LoaderWrapper loading={dataLoading} key={0} />}
          hasMore={hasMore}
        >
          {data.posts ? (
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
  addMorePosts: addMorePostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
