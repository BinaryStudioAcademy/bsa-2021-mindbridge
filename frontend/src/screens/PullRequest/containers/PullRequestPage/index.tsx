import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import { acceptPrRoutine, closePrRoutine, fetchPrRoutine, resetEndSendingDataRoutine } from '../../routines';
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
  endSendingDada: boolean;
}

interface IActions {
  fetchPR: IBindingCallback1<string>;
  closePR: IBindingCallback1<IPostPR>;
  resetEndSendingDada: IBindingAction;
  acceptPR: IBindingCallback1<IPostPR>;
}

const PullRequest: React.FC<IPullRequestProps> = (
  { currentUser, fetchPR, closePR, acceptPR, resetEndSendingDada, postPR, endSendingDada }
) => {
  console.log(postPR);
  console.log(postPR.tags);
  const { id } = useParams();

  const [preloader, setPreloader] = useState({ firstButton: false, secondButton: false });

  useEffect(() => {
    fetchPR(id);
  }, [id]);

  useEffect(() => {
    if (endSendingDada) {
      setPreloader({ firstButton: false, secondButton: false });
      resetEndSendingDada();
    }
  });

  const handleClosePR = () => {
    setPreloader({
      ...preloader,
      firstButton: true
    });
    closePR(postPR);
  }

  const handleAcceptPR = () => {
    setPreloader({
      ...preloader,
      secondButton: true
    });
    acceptPR(postPR);
  }

  const contributor =
    <AuthorAndDate
      className={styles.contributor}
      avatar={postPR.contributor.avatar}
      nickname={postPR.contributor.nickname}
      lastName={postPR.contributor.lastName}
      firstName={postPR.contributor.firstName}
      date={postPR.createdAt}
      readTime="2 min" // TODO: add real time
    />

  const previewContent = (
    <div >
      {contributor}
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
      {contributor}
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

  if (!postPR.title) {
    return (
      <LoaderWrapper loading={true} />
    )
  }

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <Tab previewContent={previewContent} diffContent={diffContent} />
      <div className={styles.footer}>
        <DarkBorderButton
          loading={preloader.firstButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Deny"
          onClick={handleClosePR} />
        <DarkButton
          loading={preloader.secondButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Accept"
          onClick={handleAcceptPR} />
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  currentUser: state.auth.auth.user,
  postPR: state.pullRequestReducer.data.postPR,
  endSendingDada: state.pullRequestReducer.data.endSendingData
});

const mapDispatchToProps: IActions = {
  fetchPR: fetchPrRoutine,
  closePR: closePrRoutine,
  resetEndSendingDada: resetEndSendingDataRoutine,
  acceptPR: acceptPrRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest);
