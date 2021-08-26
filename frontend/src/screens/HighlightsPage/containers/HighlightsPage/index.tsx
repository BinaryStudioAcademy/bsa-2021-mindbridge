import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Card, CardContent } from 'semantic-ui-react';
import { IBindingAction } from '@models/Callbacks';
import { fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';
import { highlightsReducer } from '@screens/HighlightsPage/containers/HighlightsPage/reducer';
import HighlightCard from '@screens/HighlightsPage/components/highlightCard';

export interface IHighlightsProps extends IState, IActions {
}

interface IState {
  highlights: any;
}

interface IActions {
  fetchHighlights: IBindingAction;
}

const HighlightsPage: React.FC<IHighlightsProps> = (
  { fetchHighlights, highlights }
) => {
  useEffect(() => {
    fetchHighlights();
  }, []);
  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <Card>
        <CardContent className={styles.highlightCard}>
          {highlights[0]
          && <HighlightCard highlight={highlights[0]} /> }
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  highlights: state.highlightsReducer.data.highlights
});

const mapDispatchToProps: IActions = {
  fetchHighlights: fetchHighlightsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPage);
