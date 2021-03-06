import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingAction, IBindingCallback1 } from '@root/models/Callbacks';
import {
  acceptPrRoutine,
  closePrRoutine,
  editPrCommentRoutine,
  fetchPrRoutine,
  resetEndSendingDataRoutine, resetSendingEditCommentStatusRoutine,
  sendCommentPrRoutine
} from '../../routines';
import TextDiff from '@root/components/TextDiff';
import { IPostPR, PrState } from '../../models/IPostPR';
import Tab from '../../components/Tab';
import Preview from '../../components/Preview';
import AuthorAndDate from '../../components/AuthorAndDate';
import TitleDiff from '../../components/TitleDiff';
import TagsDiff from '../../components/TagsDiff';
import DarkBorderButton from '@root/components/buttons/DarcBorderButton';
import DarkButton from '@root/components/buttons/DarcButton';
import LoaderWrapper from '@root/components/LoaderWrapper';
import { history } from '@helpers/history.helper';
import ClosedPRSvg from '@root/components/MyContributionsItem/svg/closedPrSvg';
import OpenSvg from '@root/components/MyContributionsItem/svg/openSvg';
import SyntaxHighlighterComponent from '@root/components/SyntaxHighlighter';
import BasicCommentsFeed from '@components/BasicCommentCard';
import { searchUserByNicknameRoutine } from '@screens/ViewPost/routines';
import { extractData } from '@screens/ViewPost/reducers';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';

export interface IPullRequestProps extends IState, IActions {
}

interface IState {
  currentUser: ICurrentUser;
  postPR: IPostPR;
  endSendingDada: boolean;
  users: IMentionsUser[];
  sendingEditPrComment: boolean;
}

interface IActions {
  fetchPR: IBindingCallback1<string>;
  closePR: IBindingCallback1<IPostPR>;
  resetEndSendingDada: IBindingAction;
  acceptPR: IBindingCallback1<IPostPR>;
  sendCommentPR: IBindingCallback1<object>;
  searchUsersByNickname: IBindingCallback1<string>;
  editPrComment: IBindingCallback1<object>;
  resetSendingPrComment: IBindingAction;
}

const PullRequest: React.FC<IPullRequestProps> = (
  { currentUser,
    fetchPR,
    closePR,
    acceptPR,
    resetEndSendingDada,
    postPR,
    endSendingDada,
    sendCommentPR,
    users,
    searchUsersByNickname,
    editPrComment,
    resetSendingPrComment,
    sendingEditPrComment
  }
) => {
  const { id } = useParams();

  const [preloader, setPreloader] = useState({ firstButton: false, secondButton: false });

  const [seeDiff, setSeeDiff] = useState(false);

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
  };

  const handleAcceptPR = () => {
    setPreloader({
      ...preloader,
      secondButton: true
    });
    acceptPR(postPR);
  };

  const handleEditPR = () => {
    history.push(`/pullRequest/edit/${postPR.id}`);
  };

  const handleCheckbox = () => {
    setSeeDiff(!seeDiff);
  };

  const goToPost = () => {
    history.push(`/post/${postPR.post.id}`);
  };

  const contributor = (
    <AuthorAndDate
      className={styles.contributor}
      avatar={postPR.contributor.avatar}
      nickname={postPR.contributor.nickname}
      date={postPR.createdAt}
      id={postPR.contributor.id}
      readTime="2 min"
    />
  );

  let buttons;

  if (postPR.post.author.id === currentUser.id) {
    buttons = (
      <div className={styles.footer}>
        <DarkBorderButton content="Go to post" onClick={goToPost} />
        <DarkBorderButton
          loading={preloader.firstButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Deny"
          onClick={handleClosePR}
        />
        <DarkButton
          loading={preloader.secondButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Accept"
          onClick={handleAcceptPR}
        />
      </div>
    );
  } else if (postPR.contributor.id === currentUser.id) {
    buttons = (
      <div className={styles.footer}>
        <DarkBorderButton content="Go to post" onClick={goToPost} />
        <DarkBorderButton
          loading={preloader.firstButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Close PR"
          onClick={handleClosePR}
        />
        <DarkButton
          loading={preloader.secondButton}
          disabled={preloader.firstButton || preloader.secondButton}
          content="Edit"
          onClick={handleEditPR}
        />
      </div>
    );
  } else {
    buttons = (
      <div className={styles.footer}>
        <DarkBorderButton content="Go to post" onClick={goToPost} />
      </div>
    );
  }

  if (postPR.state !== PrState.open) {
    buttons = (
      <div className={styles.footer}>
        <DarkBorderButton content="Go to post" onClick={goToPost} />
      </div>
    );
  }

  let prState;
  switch (postPR.state) {
    case PrState.closed:
      prState = (
        <div className={styles.pr_is_closed}>
          <div className={styles.round_image}><ClosedPRSvg /></div>
          <span>Pull request is closed</span>
        </div>
      );
      break;
    case PrState.accepted:
      prState = (
        <div className={styles.pr_is_accepted}>
          <div className={styles.round_image}><OpenSvg /></div>
          <span>Pull request is accepted</span>
        </div>
      );
      break;
    case PrState.open:
      prState = null;
      break;
    default:
      prState = null;
  }

  const previewContent = (
    <div>
      {prState}
      {contributor}
      <div className={styles.diff_container}>
        <Preview
          coverImage={postPR.coverImage}
          title={postPR.title}
          oldTitle={postPR.post.title}
          text={postPR.text}
          oldText={postPR.post.text}
          markdown={postPR.post.markdown}
          tags={postPR.tags}
          oldTags={postPR.post.tags}
          seeDiff={seeDiff}
        />
      </div>
    </div>
  );

  const diffContent = (
    <div>
      {prState}
      {contributor}
      <div className={styles.diff_container}>
        <div className={styles.divider} />
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

  const raw = (
    <div>
      {prState}
      {contributor}
      <div className={styles.diff_container}>
        <div className={styles.divider} />
        <TitleDiff className={styles.field} oldTitle={postPR.title} newTitle={postPR.title} />
        <TagsDiff className={styles.field} oldTags={postPR.tags} newTags={postPR.tags} />
        <div className={styles.grey_label}>Content:</div>
        <SyntaxHighlighterComponent
          text={postPR.text}
          markdown={postPR.markdown}
        />
      </div>
    </div>
  );

  if (!postPR.title) {
    return (
      <div className={classNames('content_wrapper', styles.container)}>
        <LoaderWrapper className={styles.loader} loading />
      </div>
    );
  }

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <Tab
        previewContent={previewContent}
        diffContent={seeDiff ? diffContent : raw}
        handleCheckbox={handleCheckbox}
        seeDiff={seeDiff}
      />
      {buttons}
      <div>
        <BasicCommentsFeed
          comments={postPR.comments}
          sendCommentPR={sendCommentPR}
          userInfo={currentUser}
          prId={postPR.id}
          author={postPR.post.author}
          users={users}
          searchUsersByNickname={searchUsersByNickname}
          editPrComment={editPrComment}
          resetSendingPrComment={resetSendingPrComment}
          sendingEditPrComment={sendingEditPrComment}
        />
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  currentUser: state.auth.auth.user,
  postPR: state.pullRequestReducer.data.postPR,
  endSendingDada: state.pullRequestReducer.data.endSendingData,
  users: extractData(state).users,
  sendingEditPrComment: state.pullRequestReducer.data.endSendingData
});

const mapDispatchToProps: IActions = {
  sendCommentPR: sendCommentPrRoutine,
  fetchPR: fetchPrRoutine,
  closePR: closePrRoutine,
  resetEndSendingDada: resetEndSendingDataRoutine,
  acceptPR: acceptPrRoutine,
  searchUsersByNickname: searchUserByNicknameRoutine,
  editPrComment: editPrCommentRoutine,
  resetSendingPrComment: resetSendingEditCommentStatusRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest);
