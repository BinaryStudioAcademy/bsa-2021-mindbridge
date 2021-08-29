import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import DiffMatchPatch from 'diff-match-patch';
import marked from 'marked';

interface ITextRenderWithDiffProps {
  className?: string;
  content: string;
  oldContent: string;
  markdown: boolean;
}

const addDiffStylesHtml = diffs => {
  const list = [];

  for (let x = 0; x < diffs.length; x += 1) {
    const op = diffs[x][0];
    const text = diffs[x][1];
    switch (op) {
      case DiffMatchPatch.DIFF_INSERT:
        list[x] = `<ins style="background:#e6ffec; color: #29813f; text-decoration: none;">${text}</ins>`;
        break;
      case DiffMatchPatch.DIFF_DELETE:
        list[x] = `<del style="background:#feeeef; color: #c5272d;">${text}</del>`;
        break;
      case DiffMatchPatch.DIFF_EQUAL:
        list[x] = `<span>${text}</span>`;
        break;
      default: break;
    }
  }
  return list.join('');
};

const TextRenderWithDiff: React.FC<ITextRenderWithDiffProps> = ({ className, content, oldContent, markdown }) => {
  const oldContentHtml: string = markdown ? marked(oldContent) : oldContent;
  const contentHtml: string = markdown ? marked(content) : content;
  const dmp = new DiffMatchPatch();
  const diff = dmp.diff_main(oldContentHtml, contentHtml);
  dmp.diff_cleanupSemantic(diff);
  const result = addDiffStylesHtml(diff);
  return (
    <div className={classNames(styles.rendered_text, className)}>
      {parse(result)}
    </div>
  );
};

export default TextRenderWithDiff;
