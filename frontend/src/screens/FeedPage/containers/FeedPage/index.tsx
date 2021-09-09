import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractFetchDataLoading, extractSearchPostsLoading } from '@screens/FeedPage/reducers';
import {
  addMorePostsRoutine,
  fetchDataRoutine,
  likePostRoutine,
  loadCountResultsRoutine, resetDataRoutine,
  searchPostsRoutine
} from '@screens/FeedPage/routines';
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import LoaderWrapper from '@components/LoaderWrapper';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { loadCurrentUserRoutine } from '@screens/Login/routines';
import { useHistory } from 'react-router-dom';
import {
  disLikePostViewRoutine,
  fetchTagsRoutine,
  fetchUserProfileRoutine,
  likePostViewRoutine
} from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { deleteFavouritePostRoutine, saveFavouritePostRoutine } from '@screens/FavouritesPage/routines';
import { useLocation } from 'react-use';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import SearchSvg from '@components/Header/svg/searchSvg';
import FoundPostsList from '@components/FoundPostsList';
import { useDebouncedCallback } from 'use-debounce';
import { IPost } from '@screens/Header/models/IPost';

import { searchPostsByElasticRoutine } from '@screens/Header/routines';
import TagsDropdown from '@components/TagsDropdown';
import { Popup } from 'semantic-ui-react';

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
  allTags: any[];
}

interface IActions {
  fetchData: IBindingCallback1<object>;
  likePost: IBindingCallback1<object>;
  resetList: IBindingAction;
  fetchUserProfile: IBindingCallback1<string>;
  setLoadMorePosts: IBindingCallback1<boolean>;
  searchTitlesByElastic: IBindingCallback1<string>;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  loadUser: IBindingAction;
  saveFavouritePost: IBindingCallback1<object>;
  deleteFavouritePost: IBindingCallback1<string>;
  searchPostsByElastic: IBindingCallback1<object>;
  loadCountResults: IBindingCallback1<object>;
  fetchTags: IBindingAction;
}

const params = {
  from: 0,
  count: 10,
  userId: ''
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore,
    currentUser, userInfo, likePost, likePostView, searchTitlesByElastic, countResults,
    disLikePostView, searchPostsByElastic, searchPosts, loadCountResults,
    saveFavouritePost, deleteFavouritePost, resetList, fetchTags, allTags }
) => {
  const location = useLocation();
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');
  const [isSearchInputFilled, setIsSearchInputFilled] = useState(false);
  const [elasticContent, setElasticContent] = useState('');
  const [tagsContent, setTagsContent] = useState([]);
  const [initialTags, setInitialTags] = useState([]);

  const filter = location.pathname.substring(1, location.pathname.length);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    params.from = 0;
    setLoadMorePosts(false);
    window.scrollTo(0, 0);
    const regex = /\\?tags=(.*)&query=(.*)/;

    if (regex.exec(location.search)) {
      const urlParams = new URLSearchParams(location.search);

      const query = urlParams.get('query');
      const tags = urlParams.get('tags');

      if (query === '' && tags === '') {
        history.push('/');
        return;
      }
      setIsSearch(true);
      setElasticContent(query);

      if (allTags.length !== 0 && tags !== '') {
        setTagsContent(tags.split(','));
        setInitialTags(tags.split(',').map(val => allTags.find(tag => val === tag.text).key));
      }

      loadCountResults({ query, tags });
      searchPostsByElastic({ query, tags, params });
      setSearchRequest(query);
    } else {
      setSearchRequest('');
      if (currentUser) {
        fetchData({ from: 0, count: 10, userId: currentUser.id, filter });
      } else {
        fetchData({ params, filter });
      }
      setIsSearch(false);
    }
  }, [fetchData, location, currentUser, allTags]);

  const handleLoadMorePosts = filtersPayload => {
    fetchData({ params: filtersPayload, filter });
  };

  const handleSearchMorePosts = filtersPayload => {
    searchPostsByElastic({
      query: elasticContent,
      tags: tagsContent.toString(),
      params: filtersPayload
    });
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
      likePostView(postId);
      likePost(post);
    }
  };

  const handleFavouriteAction = post => {
    if (!post.isFavourite) {
      saveFavouritePost({ userId: currentUser.id, postId: post.id });
    } else {
      deleteFavouritePost(post.id);
    }
  };

  const handleDisLikePost = postId => {
    if (currentUser.id) {
      const post = {
        postId,
        userId: currentUser.id,
        liked: false
      };
      disLikePostView(postId);
      likePost(post);
    } else {
      history.push('/login');
    }
  };

  const handleTags = (event: any, tags: any) => {
    if (tags.value.length <= 5) {
      const tagNames = tags.value.map(val => tags.options.find(o => o.value === val).text);
      setTagsContent(tagNames);
      setInitialTags(tags.value);
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

  if (dataLoading && !loadMore) {
    return (
      <div className={styles.feedPage}>
        <div className={styles.main}>
          <LoaderWrapper className={styles.loader} loading={dataLoading} />
        </div>
      </div>
    );
  }

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
    history.push(`/search?tags=${tagsContent}&query=${elasticContent}`);
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
            <Popup
              trigger={(
                <TagsDropdown
                  className={styles.tagsDropdown}
                  onChange={handleTags}
                  data={initialTags}
                  allTags={allTags}
                />
              )}
              content="Max amount of tags has reached"
              open={tagsContent.length === 5}
              position="left center"
            />
            {isSearch && data && (
              <div className={styles.requestInfo}>
                <h4>
                  {'Found '}
                  <span className={styles.countPosts}>{countResults}</span>
                  { countResults === 1 ? ' article.' : ' articles.'}
                </h4>
              </div>
            )}
          </div>
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
          {data.length !== 0 ? (
            data.map(post => (
              <PostCard
                key={post.id}
                handleLikePost={handleLikePost}
                handleDisLikePost={handleDisLikePost}
                handleFavouriteAction={handleFavouriteAction}
                post={post}
                userInfo={userInfo}
              />
            ))
          ) : (
            <div className={styles.emptyList}>
              <NoResultsSvg width="35%" height="35%" />
              <p>
                No results were found for your request
              </p>
            </div>
          )}
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
  searchPosts: state.headerReducer.data.posts,
  allTags: state.postPageReducer.data.allTags
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  resetList: resetDataRoutine,
  setLoadMorePosts: addMorePostsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  likePost: likePostRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine,
  loadUser: loadCurrentUserRoutine,
  saveFavouritePost: saveFavouritePostRoutine,
  deleteFavouritePost: deleteFavouritePostRoutine,
  searchPostsByElastic: searchPostsRoutine,
  searchTitlesByElastic: searchPostsByElasticRoutine,
  loadCountResults: loadCountResultsRoutine,
  fetchTags: fetchTagsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
