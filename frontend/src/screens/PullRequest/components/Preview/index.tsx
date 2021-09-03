import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import TagsMenu from '@root/screens/ViewPost/components/TagsMenu';
import TextRender from '@root/components/TextRenderer';
import { ITag } from '@root/screens/FeedPage/models/ITag';
import TextDiff from '@root/components/TextDiff';
import TextRenderWithDiff from '@root/components/TextRenderWithDiff';
import SeeDiffTags from '../SeeDiffInTags';
import Image from '@components/Image';
import {defaultCoverImage} from "@images/defaultImages";

// eslint-disable-next-line max-len
interface IPreviewProps {
  className?: string;
  coverImage: string;
  title: any;
  oldTitle: string;
  tags: ITag[];
  oldTags: ITag[];
  markdown: boolean;
  text: string;
  oldText: string;
  seeDiff: boolean;
}

const Preview = ({
  coverImage,
  title,
  tags,
  markdown,
  text,
  className,
  oldTitle,
  oldTags,
  oldText,
  seeDiff }: IPreviewProps) => (
    <div className={classNames(className, styles.post_preview_container)}>
      <Image className={styles.coverImage} src={coverImage ?? defaultCoverImage} alt="cover" />
      <div className={styles.title}>
        <TextDiff oldText={seeDiff ? oldTitle : title} newText={title} />
      </div>
      <div className={styles.btnWrapper}>

        {tags
        && seeDiff ? <SeeDiffTags newTags={tags} oldTags={oldTags} />
          : tags.map(tag => (
            <TagsMenu
              key={tag.id}
              tag={tag.name}
            />
          ))}
      </div>
      {seeDiff
        ? (
          <TextRenderWithDiff
            className={styles.content}
            markdown={markdown}
            content={text}
            oldContent={oldText}
          />
        )
        : (
          <TextRender
            className={styles.content}
            markdown={markdown}
            content={text}
          />
        )}

    </div>
);

export default Preview;
