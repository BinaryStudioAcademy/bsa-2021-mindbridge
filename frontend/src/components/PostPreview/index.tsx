import React from 'react';
import styles from './styles.module.scss';
import { IForm, IModes } from '@root/screens/CreatePost/models/IData';
import marked from 'marked';

interface IPreviewFormProps {
  form: IForm;
  modes: IModes;
}

const PostPreview: React.FC<IPreviewFormProps> = ({ form, modes }) => (
  <div className={styles.post_preview_container}>
    <img height="" width="" className={styles.coverImage} src={form.coverImage.url} alt="cover" />
    <div>{form.title}</div>
    <div dangerouslySetInnerHTML={modes.htmlMode ? { __html: form.content } : { __html: marked(form.content) }} />
  </div>
);

export default PostPreview;
