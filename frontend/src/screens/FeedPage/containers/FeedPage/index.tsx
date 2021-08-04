import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IData } from '@screens/FeedPage/models/IData';
import { IBindingAction } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/FeedPage/reducers';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';

export interface IFeedPageProps extends IState, IActions {
}

interface IState {
  data: IData;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  fetchData: IBindingAction;
}

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData }
) => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.feedPage}>
      <div className={styles.header}>
        <h1>Header</h1>
      </div>
      <div className={styles.main}>
        <PostCard post={data.posts[0]} />
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
  data: extractData(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
