import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import marked from 'marked';

const TextRender = ({ className, content, markdown }) => (

  <div
    className={classNames(styles.rendered_text, className)}
    dangerouslySetInnerHTML={
      markdown
        ? { __html: content }
        : { __html: marked(content) }
    }
  />
);

export default TextRender;
