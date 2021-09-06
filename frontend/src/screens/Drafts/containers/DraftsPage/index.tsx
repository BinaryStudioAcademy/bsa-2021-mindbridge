import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IDraft } from '@screens/Drafts/models/IDraft';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchDraftsRoutine } from '@screens/Drafts/routines';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import DraftListItem from '@screens/Drafts/components/DraftListItem/DraftListItem';
import { extractFetchDraftsLoading } from '@screens/Drafts/reducers';
import LoaderWrapper from '@components/LoaderWrapper';
import NoResultsSvg from '@components/svgs/NoResultsSvg';

export interface IDraftsProps extends IState, IActions {
}

interface IState {
  drafts: IDraft[];
  currentUser: ICurrentUser;
  isDataLoading: boolean;
}

interface IActions {
  fetchDrafts: IBindingCallback1<object>;
}

const Drafts: React.FC<IDraftsProps> = (
  { fetchDrafts, drafts, currentUser, isDataLoading }
) => {
  const [draftsOnly, setDraftsOnly] = useState(false);

  useEffect(() => {
    if (currentUser.id) {
      fetchDrafts({ userId: currentUser.id, draftsOnly });
    }
  }, [currentUser]);

  const handleTogglePostsType = () => {
    fetchDrafts({ userId: currentUser.id, draftsOnly: !draftsOnly });
    setDraftsOnly(!draftsOnly);
  };

  if (isDataLoading) {
    return (
      <div className={styles.draftsPage}>
        <div className={styles.togglePosts}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
          <div onClick={handleTogglePostsType} className={draftsOnly ? styles.checked : styles.checkbox} />
          <span>Drafts only</span>
        </div>
        <div className={styles.main}>
          <LoaderWrapper className={styles.loader} loading={isDataLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.draftsPage}>
      <div className={styles.togglePosts}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div onClick={handleTogglePostsType} className={draftsOnly ? styles.checked : styles.checkbox} />
        <span>Drafts only</span>
      </div>
      <div className={styles.main}>
        {drafts.length ? (
          drafts.map(draft => (
            <DraftListItem
              key={draft.id}
              id={draft.id}
              title={draft.title}
              tags={draft.tags}
              isDraft={draft.draft}
              createdAt={draft.createdAt}
              coverImage={draft.coverImage}
            />
          ))) : (
            <div className={styles.emptyList}>
              <NoResultsSvg width="35%" height="35%" />
              <p>You have no posts</p>
            </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  drafts: state.draftsReducer.data.drafts,
  currentUser: state.auth.auth.user,
  isDataLoading: extractFetchDraftsLoading(state)
});

const mapDispatchToProps: IActions = {
  fetchDrafts: fetchDraftsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
