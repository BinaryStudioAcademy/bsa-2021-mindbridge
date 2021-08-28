import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';
import HighlightCard from '@screens/HighlightsPage/components/highlightCard';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';

export interface IHighlightsProps extends IState, IActions {
}

interface IState {
  highlights: any;
  currentUser: ICurrentUser;
}

interface IActions {
  fetchHighlights: IBindingCallback1<string>;
}

const HighlightsPage: React.FC<IHighlightsProps> = (
  { fetchHighlights, highlights, currentUser }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchHighlights(currentUser.id);
    }
  }, [currentUser, fetchHighlights]);
  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <div className={styles.pageTitle}>
        Your highlights
      </div>
      {highlights
          && highlights.map(highlight => (
            <HighlightCard key={highlight.id} highlight={highlight} />))}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  highlights: state.highlightsReducer.data.highlights,
  currentUser: state.auth.auth.user
});

const mapDispatchToProps: IActions = {
  fetchHighlights: fetchHighlightsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPage);
