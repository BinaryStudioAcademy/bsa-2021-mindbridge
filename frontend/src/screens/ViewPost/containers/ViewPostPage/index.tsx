import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingAction } from '@models/Callbacks';
import { IData } from '@screens/ViewPost/models/IData';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import { fetchDataRoutine } from '@screens/ViewPost/routines';
import ViewPostCard from '@components/ViewPostCard';
import SuggestChangesCard from "@components/SuggestChangesCard";

export interface IViewPostProps extends IState, IActions {
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingAction;
}

const ViewPost: React.FC<IViewPostProps> = (
  { data, fetchData }
) => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.viewPost}>
      <div className={styles.header}>
        <h1>Header</h1>
      </div>
      <div className={styles.main}>
        <ViewPostCard post={data.posts[0]} />
      </div>
      <div className={styles.sidebar}>
        <h1>Sidebar</h1>
        <div className={styles.suggestChanges}>
          <SuggestChangesCard />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
