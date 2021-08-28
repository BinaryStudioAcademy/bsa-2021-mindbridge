import React from 'react';

import DiffMatchPatch from 'diff-match-patch';
import parse from 'html-react-parser';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface ITextDiffProps {
  oldText: string;
  newText: string;
  className?: string;
}

const toPrettyHtml = diffs => {
  const html = [];
  const patternAmp = /&/g;
  const patternLt = /</g;
  const patternGt = />/g;
  const patternPara = /\n/g;
  for (let x = 0; x < diffs.length; x += 1) {
    const op = diffs[x][0];
    const data = diffs[x][1];
    const text = data.replace(patternAmp, '&amp;').replace(patternLt, '&lt;')
      .replace(patternGt, '&gt;').replace(patternPara, '<br>');
    switch (op) {
      case DiffMatchPatch.DIFF_INSERT:
        html[x] = `<ins style="background:#e6ffec; color: #29813f; text-decoration: none;">${text}</ins>`;
        break;
      case DiffMatchPatch.DIFF_DELETE:
        html[x] = `<del style="background:#feeeef; color: #c5272d;">${text}</del>`;
        break;
      case DiffMatchPatch.DIFF_EQUAL:
        html[x] = `<span>${text}</span>`;
        break;
      default: break;
    }
  }
  return html.join('');
};

const TextDiff: React.FC<ITextDiffProps> = ({ oldText, newText, className }) => {
  const dmp = new DiffMatchPatch();
  const diff = dmp.diff_main(oldText, newText);
  dmp.diff_cleanupSemantic(diff);

  const result = toPrettyHtml(diff);

  return <div className={classNames(styles.textDiff, className)}>{parse(result)}</div>;
};

export default TextDiff;
