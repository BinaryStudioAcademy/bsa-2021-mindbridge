import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import ReactMarkdown from 'react-markdown';

const TextRender = ({ className, content, markdown }) => {
  if (markdown) {
    return (
      <ReactMarkdown className={classNames(styles.rendered_text, className)}>
        {content}
      </ReactMarkdown>
    );
  }
  return (
    <div className={classNames(styles.rendered_text, className)}>
      {parse(content)}
    </div>
  );
};

export default TextRender;
