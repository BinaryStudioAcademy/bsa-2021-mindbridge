import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IDraft } from '@screens/Drafts/models/IDraft';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchDraftsRoutine } from '@screens/Drafts/routines';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import DraftListItem from '@screens/Drafts/components/DraftListItem/DraftListItem';
import NoResultsSvg from "@components/svgs/NoResultsSvg";

export interface IDraftsProps extends IState, IActions {
}

interface IState {
  drafts: IDraft[];
  currentUser: ICurrentUser;
}

interface IActions {
  fetchDrafts: IBindingCallback1<string>;
}

const Drafts: React.FC<IDraftsProps> = (
  { fetchDrafts, drafts, currentUser }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchDrafts(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.draftsPage}>
      <div className={styles.main}>
        {drafts.length ? (
          drafts.map(draft => (
            <DraftListItem
              key={draft.id}
              id={draft.id}
              title={draft.title}
              tags={draft.tags}
              createdAt={draft.createdAt}
              coverImage={draft.coverImage}
            />
          ))
        ) : (
          <div className={styles.emptyList}>
            <NoResultsSvg width="35%" height="35%" />
            <p>🔍 Seems like there are no drafts...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  drafts: state.draftsReducer.data.drafts,
  currentUser: state.auth.auth.user
});

const mapDispatchToProps: IActions = {
  fetchDrafts: fetchDraftsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
