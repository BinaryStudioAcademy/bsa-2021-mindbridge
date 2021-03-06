import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { useParams } from 'react-router-dom';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
import { IPostVersion } from '@screens/PostVersionPage/models/IPostVersion';
import AuthorAndDate from '@screens/PullRequest/components/AuthorAndDate';
import Preview from '@screens/PullRequest/components/Preview';
import TitleDiff from '@screens/PullRequest/components/TitleDiff';
import TagsDiff from '@screens/PullRequest/components/TagsDiff';
import TextDiff from '@components/TextDiff';
import Tab from '@screens/PostVersionPage/components/Tab';

export interface IPostVersionPageProps extends IState, IActions {
}

interface IState {
  postVersion: IPostVersion;
}

interface IActions {
  fetchPostVersion: IBindingCallback1<string>;
}

const PostVersionPage: React.FC<IPostVersionPageProps> = (
  { fetchPostVersion, postVersion }
) => {
  const { id } = useParams();
  const [seeDifference, setSeeDifference] = useState(false);
  useEffect(() => {
    fetchPostVersion(id);
  }, [id]);

  const contributor = (
    postVersion && (
      <AuthorAndDate
        className={styles.contributor}
        id={postVersion.author.id}
        avatar={postVersion.author.avatar}
        nickname={postVersion.author.nickname}
        date={postVersion.createdAt}
        readTime="2 min"
      />
    )
  );

  const handleSeeDifference = () => {
    setSeeDifference(!seeDifference);
  };

  const previewContent = (
    <div>
      {contributor}
      <div className={styles.diff_container}>
        {postVersion
        && (
        <Preview
          coverImage={postVersion.coverImage}
          title={postVersion.title}
          text={postVersion.text}
          markdown={postVersion.markdown}
          tags={postVersion.tags}
          oldTitle={postVersion.preVersion ? (postVersion.preVersion.title) : (postVersion.title)}
          oldTags={postVersion.preVersion ? (postVersion.preVersion.tags) : (postVersion.tags)}
          oldText={postVersion.preVersion ? (postVersion.preVersion.text) : (postVersion.text)}
          seeDiff={seeDifference}
        />
        )}
      </div>
    </div>
  );

  const diffContent = (
    <div>
      {contributor}
      {postVersion
      && (
      <div className={styles.diff_container}>
        <div className={styles.divider} />
        <TitleDiff
          className={styles.field}
          oldTitle={postVersion.preVersion ? (postVersion.preVersion.title) : (postVersion.title)}
          newTitle={postVersion.title}
        />
        <TagsDiff
          className={styles.field}
          oldTags={postVersion.preVersion ? (postVersion.preVersion.tags) : (postVersion.tags)}
          newTags={postVersion.tags}
        />
        <div className={styles.grey_label}>Changes in content:</div>
        <TextDiff
          className={classNames(styles.field, styles.text_diff)}
          oldText={seeDifference && postVersion.preVersion ? (postVersion.preVersion.text) : (postVersion.text)}
          newText={postVersion.text}
        />
      </div>
      )}
    </div>
  );

  const raw = (
    <div>
      {contributor}
      {postVersion
      && (
      <div className={styles.diff_container}>
        <div className={styles.divider} />
        <TitleDiff className={styles.field} oldTitle={postVersion.title} newTitle={postVersion.title} />
        <TagsDiff className={styles.field} oldTags={postVersion.tags} newTags={postVersion.tags} />
        <div className={styles.grey_label}>Content:</div>
        <TextDiff
          className={classNames(styles.field, styles.text_diff)}
          oldText={postVersion.text}
          newText={postVersion.text}
        />
      </div>
      )}
    </div>
  );

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <p className={styles.pageTitle}>Version of post</p>
      <Tab
        previewContent={previewContent}
        diffContent={seeDifference ? diffContent : raw}
        handleCheckbox={handleSeeDifference}
        seeDiff={seeDifference}
        isCheckboxShown={postVersion ? (!!postVersion.preVersion) : false}
      />
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  postVersion: state.postVersionPageReducer.data.postVersion
});

const mapDispatchToProps: IActions = {
  fetchPostVersion: fetchPostVersionRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVersionPage);
