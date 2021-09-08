import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading, extractSearchPostsLoading } from '@screens/FeedPage/reducers';
import {
  addMorePostsRoutine,
  fetchDataRoutine,
  likePostRoutine,
  loadCountResultsRoutine,
  searchPostsRoutine
} from '@screens/FeedPage/routines';
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import LoaderWrapper from '@components/LoaderWrapper';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { loadCurrentUserRoutine } from '@screens/Login/routines';
import { useHistory } from 'react-router-dom';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { deleteFavouritePostRoutine, saveFavouritePostRoutine } from '@screens/FavouritesPage/routines';
import { useLocation } from 'react-use';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import SearchSvg from '@components/Header/svg/searchSvg';
import FoundPostsList from '@components/FoundPostsList';
import { useDebouncedCallback } from 'use-debounce';
import { IPost } from '@screens/Header/models/IPost';

import { searchPostsByElasticRoutine } from '@screens/Header/routines';
import { fetchUserRoutine } from '@screens/ProfilePage/routines';

export interface IFeedPageProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
}

interface IState {
  data: IPostFeed[];
  dataLoading: boolean;
  hasMore: boolean;
  loadMore: boolean;
  searchPosts: IPost[];
  countResults: number;
}

interface IActions {
  fetchData: IBindingCallback1<object>;
  likePost: IBindingCallback1<object>;
  fetchUserProfile: IBindingCallback1<string>;
  setLoadMorePosts: IBindingCallback1<boolean>;
  searchTitlesByElastic: IBindingCallback1<string>;
  loadUser: IBindingAction;
  saveFavouritePost: IBindingCallback1<object>;
  deleteFavouritePost: IBindingCallback1<object>;
  searchPostsByElastic: IBindingCallback1<object>;
  loadCountResults: IBindingCallback1<string>;
  fetchUserData: IBindingCallback1<string>;
}

const params = {
  from: 0,
  count: 10,
  userId: ''
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore,
    currentUser, userInfo, likePost, searchTitlesByElastic, countResults,
    searchPostsByElastic, searchPosts, loadCountResults, saveFavouritePost, deleteFavouritePost }
) => {
  const location = useLocation();
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');
  const [isSearchInputFilled, setIsSearchInputFilled] = useState(false);
  const [elasticContent, setElasticContent] = useState('');

  useEffect(() => {
    params.from = 0;
    setLoadMorePosts(false);
    window.scrollTo(0, 0);
    if (location.search) {
      const query = decodeURI(location.search.replace('?query=', ''));
      setElasticContent(query);
      loadCountResults(query);
      searchPostsByElastic({ query, params });
      setSearchRequest(query);
      setIsSearch(true);
    } else {
      setSearchRequest('');
      if (currentUser) {
        fetchData({ from: 0, count: 10, userId: currentUser.id });
      } else {
        fetchData(params);
      }
      setIsSearch(false);
    }
  }, [fetchData, location, currentUser]);

  const handleLoadMorePosts = filtersPayload => {
    fetchData(filtersPayload);
  };

  const handleSearchMorePosts = filtersPayload => {
    searchPostsByElastic({ query: elasticContent, params: filtersPayload });
  };

  const debounced = useDebouncedCallback(value => {
    searchTitlesByElastic(value);
  }, 400);

  const handleLikePost = postId => {
    if (currentUser.id) {
      const post = {
        postId,
        userId: currentUser.id,
        liked: true
      };
      likePost(post);
    } else {
      history.push('/login');
    }
  };

  const handleFavouriteAction = post => {
    if (!currentUser?.id) {
      history.push('/login');
      return;
    }
    if (!post.isFavourite) {
      saveFavouritePost({ userId: currentUser.id, postId: post.id });
    } else {
      deleteFavouritePost({ userId: currentUser.id, postId: post.id });
    }
  };

  const handleDisLikePost = postId => {
    if (currentUser.id) {
      const post = {
        postId,
        userId: currentUser.id,
        liked: false
      };
      likePost(post);
    } else {
      history.push('/login');
    }
  };

  const getMorePosts = () => {
    setLoadMorePosts(true);
    const { from, count } = params;
    params.from = from + count;
    if (isSearch) {
      handleSearchMorePosts(params);
    } else {
      handleLoadMorePosts(params);
    }
  };

  // if (dataLoading && !loadMore) {
  //   return (
  //     <div className={styles.feedPage}>
  //       <div className={styles.main}>
  //         <LoaderWrapper className={styles.loader} loading={dataLoading} />
  //       </div>
  //     </div>
  //   );
  // }

  const handleLinkClick = () => {
    setIsSearchInputFilled(false);
    searchTitlesByElastic('');
    setElasticContent('');
  };

  const handleInputContent = (event: any) => {
    debounced(event.target.value);
    setElasticContent(event.target.value);
    if (event.target.value) {
      setIsSearchInputFilled(true);
    } else {
      setIsSearchInputFilled(false);
    }
  };

  const goToSearchPage = () => {
    setIsSearchInputFilled(false);
    history.push(`/search?query=${elasticContent}`);
  };

  const handleBlur = (event: any) => {
    if (!event.relatedTarget) {
      setIsSearchInputFilled(false);
    }
  };

  return (
    <div className={styles.feedPage}>
      <div className={styles.searchTitle}>
        {isSearch && (
          <div className={styles.search_input} onBlur={handleBlur}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleInputContent}
              value={elasticContent}
            />
            {isSearchInputFilled
            && <button type="button" className={styles.close_image} onClick={handleLinkClick}>✖</button>}
            <button type="button" onClick={goToSearchPage}>
              <SearchSvg />
            </button>
            {isSearchInputFilled
            && (
              <div className={styles.foundPosts}>
                <ul>
                  {searchPosts[0]
                  && searchPosts.map(post => (
                    <FoundPostsList
                      linkClick={handleLinkClick}
                      key={post.sourceId}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {isSearch && data && (
          <h4>
            {`On your request "${searchRequest}" found `}
            <span className={styles.countPosts}>{countResults}</span>
            {' articles'}
          </h4>
        )}
      </div>

      <div className={styles.main}>
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={data.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={' '}
          scrollThreshold={0.9}
        >
          {data.map(post => (
            <PostCard
              dataLoading={dataLoading}
              key={post.id}
              handleLikePost={handleLikePost}
              handleDisLikePost={handleDisLikePost}
              handleFavouriteAction={handleFavouriteAction}
              post={post}
              userInfo={userInfo}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: state.feedPageReducer.data.posts,
  dataLoading: extractFetchDataLoading(state) || extractSearchPostsLoading(state),
  hasMore: state.feedPageReducer.data.hasMore,
  countResults: state.feedPageReducer.data.countResults,
  loadMore: state.feedPageReducer.data.loadMore,
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile,
  searchPosts: state.headerReducer.data.posts
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  setLoadMorePosts: addMorePostsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  likePost: likePostRoutine,
  loadUser: loadCurrentUserRoutine,
  saveFavouritePost: saveFavouritePostRoutine,
  deleteFavouritePost: deleteFavouritePostRoutine,
  searchPostsByElastic: searchPostsRoutine,
  searchTitlesByElastic: searchPostsByElasticRoutine,
  loadCountResults: loadCountResultsRoutine,
  fetchUserData: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
