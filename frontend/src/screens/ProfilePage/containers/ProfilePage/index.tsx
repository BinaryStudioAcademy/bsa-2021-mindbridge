import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingAction } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import LoaderWrapper from '@components/LoaderWrapper';
import ProfileCard from '@components/ProfileCard';

export interface IProfilePageProps extends IState, IActions {
}

interface IState {
   data: IPostList;
  dataLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
   fetchData: IBindingAction;
}

const FeedPage: React.FC<IProfilePageProps> = (
  /* { data, fetchData, dataLoading }*/
) => (
  /* useEffect(() => {
      fetchData();
    }, []);

    if (dataLoading === true) {
      return (
        <LoaderWrapper loading={dataLoading} />
      );
    }*/

  (
    <div className={styles.feedPage}>
      <div className={styles.main}>
        <ProfileCard />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.tagsSideBar}>
          <FeedTagsSideBar />
        </div>
      </div>
    </div>
  )
);
const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  dataLoading: extractFetchDataLoading(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
