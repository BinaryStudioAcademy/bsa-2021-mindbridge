import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { fetchPrRoutine } from '../../routines';
import TextDiff from '@root/components/TextDiff';
import { IPostPR } from '../../models/IPostPR';
import Tab from '../../components/Tab';
import Preview from '../../components/Preview';
import AuthorAndDate from '../../components/AuthorAndDate';
import TitleDiff from '../../components/TitleDiff';
import TagsDiff from '../../components/TagsDiff';

export interface IPullRequestProps extends IState, IActions {
}

interface IState {
  currentUser: ICurrentUser;
  postPR: IPostPR;
}

interface IActions {
  fetchPR: IBindingCallback1<string>;
}

const PullRequest: React.FC<IPullRequestProps> = (
  { currentUser, fetchPR, postPR }
) => {
  console.log(postPR);
  console.log(postPR.tags)
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    fetchPR(id);
  }, [id]);

  const previewContent =
    <Preview
      coverImage={postPR.coverImage}
      title={postPR.title}
      text={postPR.text}
      markdown={postPR.markdown}
      tags={postPR.tags}
    />

  const diffContent = (
    <div>
      <AuthorAndDate
        avatar={postPR.contributor.avatar}
        nickname={postPR.contributor.nickname}
        date={postPR.createdAt}
      />
      <TitleDiff oldTitle={postPR.post.title} newTitle={postPR.title} />
      <TagsDiff oldTags={postPR.post.tags} newTags={postPR.tags} />
      <TextDiff className={styles.text_diff} oldText={postPR.post.text} newText={postPR.text} />
    </div>
  );

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <Tab previewContent={previewContent} diffContent={diffContent} />

    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  currentUser: state.auth.auth.user,
  postPR: state.pullRequestReducer.data.postPR
});

const mapDispatchToProps: IActions = {
  fetchPR: fetchPrRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest);
