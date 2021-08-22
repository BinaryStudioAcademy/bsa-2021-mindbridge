import React from 'react';
import styles from './styles.module.scss';
import { IForm, IModes } from '@root/screens/PostPage/models/IData';
import TagsMenu from '@root/screens/ViewPost/components/TagsMenu';
import TextRender from '../TextRenderer';

interface IPreviewFormProps {
  form: IForm;
  modes: IModes;
  allTags: [any];
}

const PostPreview: React.FC<IPreviewFormProps> = ({ form, modes, allTags }) => (
  <div className={styles.post_preview_container}>
    {form.coverImage.url
      && <img height="" width="" className={styles.coverImage} src={form.coverImage.url} alt="cover" />}
    <div className={styles.title}>{form.title}</div>
    <div className={styles.btnWrapper}>
      {form.tags.map(tagId => {
        let tagName = '';
        allTags.forEach(tag => {
          if (tag.key === tagId) {
            tagName = tag.text;
          }
        });
        return (
          <TagsMenu
            key={tagId}
            tag={tagName}
          />
        );
      })}
    </div>
    <TextRender
      className={styles.content}
      markdown={modes.markdownMode}
      content={form.content}
    />
  </div>
);

export default PostPreview;
