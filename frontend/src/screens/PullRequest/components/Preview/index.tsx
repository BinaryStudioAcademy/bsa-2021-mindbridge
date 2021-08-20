import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import TagsMenu from '@root/screens/ViewPost/components/TagsMenu';
import TextRender from '@root/components/TextRenderer';
import { ITag } from '@root/screens/FeedPage/models/ITag';

// eslint-disable-next-line max-len
interface IPreviewProps {
  className?: string;
  coverImage: string;
  title: any;
  tags: ITag [];
  markdown: boolean;
  text: string;
}

const Preview = ({ coverImage, title, tags, markdown, text, className }: IPreviewProps) => (
  <div className={classNames(className, styles.post_preview_container)}>
    {coverImage
        && <img className={styles.coverImage} src={coverImage} alt="cover" />}
    <div className={styles.title}>{title}</div>
    <div className={styles.btnWrapper}>
      {tags && tags.map(tag => (
        <TagsMenu
          key={tag.id}
          tag={tag.name}
        />
      ))}
    </div>
    <TextRender
      className={styles.content}
      markdown={!markdown}
      content={text}
    />
  </div>
);

export default Preview;
