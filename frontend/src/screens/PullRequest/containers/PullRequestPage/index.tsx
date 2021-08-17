import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { fetchPrRoutine } from '../../routines';
import TextDiff from '@root/components/TextDiff';
import { IPostPR } from '../../models/IPostPR';
import Tab from '../../components/Tab';

export interface IPullRequestProps extends IState, IActions {
}

interface IState {
  currentUser: ICurrentUser;
  postPR: IPostPR;
}

interface IActions {
  fetchPR: IBindingCallback1<string>
}

const PullRequest: React.FC<IPullRequestProps> = (
  { currentUser, fetchPR, postPR }
) => {
  const { id } = useParams();
  
  useEffect(() => {
    console.log(id)
    fetchPR(id);
  }, [id]);

  const previewContent = null;
  const diffContent = <TextDiff className={styles.text_diff} oldText={postPR.post.text} newText ={postPR.text}/>

  return (
  <div className={classNames('content_wrapper', styles.container)}>
    <Tab previewContent={previewContent} diffContent={diffContent} />
    
    
  </div>
);
  }

const mapStateToProps: (state) => IState = state => ({
  currentUser: state.auth.auth.user,
  postPR: state.pullRequestReducer.data.postPR
});

const mapDispatchToProps: IActions = {
  fetchPR: fetchPrRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest);
