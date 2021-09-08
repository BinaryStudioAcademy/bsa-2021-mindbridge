import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  addMoreHighlightsRoutine,
  deleteHighlightRoutine,
  fetchHighlightsRoutine
} from '@screens/HighlightsPage/routines';
import HighlightCard from '@screens/HighlightsPage/components/highlightCard';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import InfiniteScroll from 'react-infinite-scroll-component';
import { extractHighlightsLoading } from '@screens/HighlightsPage/reducers';
import NotFoundContent from '@components/NotFoundContetn';
import { isEmptyArray } from 'formik';

export interface IHighlightsProps extends IState, IActions {
}

interface IState {
  highlights: IHighlight[];
  currentUser: ICurrentUser;
  hasMore: boolean;
  loadMore: boolean;
  dataLoading: boolean;
}

interface IActions {
  fetchHighlights: IBindingCallback1<object>;
  deleteHighlight: IBindingCallback1<string>;
  setLoadMoreHighlights: IBindingCallback1<boolean>;
}

const params = {
  from: 0,
  count: 10,
  user: ''
};

const HighlightsPage: React.FC<IHighlightsProps> = (
  { fetchHighlights, highlights, currentUser, deleteHighlight, hasMore,
    setLoadMoreHighlights, dataLoading }
) => {
  useEffect(() => {
    if (currentUser.id) {
      params.from = 0;
      setLoadMoreHighlights(false);
      fetchHighlights({ from: 0, count: 10, user: currentUser.id });
    }
  }, [currentUser, fetchHighlights]);

  const handleDeleteHighlight = id => {
    deleteHighlight(id);
  };

  const handleLoadMoreHighlights = filtersPayload => {
    fetchHighlights(filtersPayload);
  };

  const getMorePosts = () => {
    if (!dataLoading) {
      setLoadMoreHighlights(true);
      const { from, count } = params;
      params.from = from + count;
      params.user = currentUser.id;
      handleLoadMoreHighlights(params);
    }
  };

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.pageTitle}>
        Your highlights
      </div>
      {!isEmptyArray(highlights) && highlights ? (
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={highlights ? highlights.length : 0}
          next={getMorePosts}
          hasMore
          loader={' '}
          scrollThreshold={0.9}
        >
          {highlights && highlights.map(highlight => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              handleDeleteHighlight={handleDeleteHighlight}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <NotFoundContent />
      )}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  highlights: state.highlightsReducer.data.highlights,
  currentUser: state.auth.auth.user,
  hasMore: state.highlightsReducer.data.hasMore,
  loadMore: state.highlightsReducer.data.loadMore,
  dataLoading: extractHighlightsLoading(state)
});

const mapDispatchToProps: IActions = {
  fetchHighlights: fetchHighlightsRoutine,
  deleteHighlight: deleteHighlightRoutine,
  setLoadMoreHighlights: addMoreHighlightsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPage);
