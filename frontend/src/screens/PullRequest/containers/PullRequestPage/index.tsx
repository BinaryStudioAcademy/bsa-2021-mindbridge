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
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import DarkButton from '@root/components/buttons/DarcButton';
import LoaderWrapper from '@root/components/LoaderWrapper';

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
  console.log(postPR.tags);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    fetchPR(id);
  }, [id]);

  const previewContent = (
    <div >
      <AuthorAndDate
        className={styles.contributor}
        avatar={postPR.contributor.avatar}
        nickname={postPR.contributor.nickname}
        date={postPR.createdAt}
        readTime="2 min" // TODO: add real time
      />
      <div className={styles.diff_container}>
        <Preview
          coverImage={postPR.coverImage}
          title={postPR.title}
          text={postPR.text}
          markdown={postPR.markdown}
          tags={postPR.tags}
        />
      </div>
    </div>
  );

  const diffContent = (
    <div >
      <AuthorAndDate
        className={styles.contributor}
        avatar={postPR.contributor.avatar}
        nickname={postPR.contributor.nickname}
        date={postPR.createdAt}
        readTime="2 min" // TODO: add real time
      />
      <div className={styles.diff_container}>
        <div className={styles.divider}></div>
        <TitleDiff className={styles.field} oldTitle={postPR.post.title} newTitle={postPR.title} />
        <TagsDiff className={styles.field} oldTags={postPR.post.tags} newTags={postPR.tags} />
        <div className={styles.grey_label}>Changes in content:</div>
        <TextDiff
          className={classNames(styles.field, styles.text_diff)}
          oldText={postPR.post.text}
          newText={postPR.text}
        />
      </div>
    </div>
  );

  if (!postPR.title){
    return (
      <LoaderWrapper loading={true} />
    )
  }

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <Tab previewContent={previewContent} diffContent={diffContent} />
      <div className={styles.footer}>
        <DarkBorderButton content="Deny" />
        <DarkButton content="Accept" />
      </div>
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
