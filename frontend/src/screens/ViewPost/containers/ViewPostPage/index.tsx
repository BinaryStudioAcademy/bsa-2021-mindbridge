import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import { fetchDataRoutine } from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import SuggestChangesCard from '@screens/ViewPost/components/SuggestChangesCard';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from "react-router-dom";

export interface IViewPostProps extends IState, IActions {
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingCallback1<string>;
}

const ViewPost: React.FC<IViewPostProps> = (
  { data, fetchData }
) => {
  let { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [0]);

  return (
    <div className={styles.viewPost}>
      <div className={styles.main}>
        <ViewPostCard post={data.post} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.logInSideBar}>
          <FeedLogInSidebar />
        </div>
        <div className={styles.suggestChanges}>
          <SuggestChangesCard />
        </div>
        <div className={styles.tagsSideBar}>
          <FeedTagsSideBar />
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
