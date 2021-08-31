import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import marked from 'marked';
import { HtmlDiffer } from 'html-differ';

interface ITextRenderWithDiffProps {
  className?: string;
  content: string;
  oldContent: string;
  markdown: boolean;
}

interface IDiff{
  added: boolean;
  removed: boolean;
  value: string;
}

const addDiffStylesHtml = (diffs: IDiff []) => {
  const list = [];

  for (let x = 0; x < diffs.length; x += 1) {
    const { added } = diffs[x];
    const { removed } = diffs[x];
    const text = diffs[x].value;
    if (added) {
      list[x] = `<ins style="background:#e6ffec; color: #29813f; text-decoration: none;">${text}</ins>`;
    } else if (removed) {
      list[x] = `<del style="background:#feeeef; color: #c5272d;">${text}</del>`;
    } else {
      list[x] = `<span>${text}</span>`;
    }
  }
  return list.join('');
};

const TextRenderWithDiff: React.FC<ITextRenderWithDiffProps> = ({ className, content, oldContent, markdown }) => {
  const oldContentHtml: string = markdown ? marked(oldContent) : oldContent;
  const contentHtml: string = markdown ? marked(content) : content;
  console.log(marked(oldContent));

  const options = {
    ignoreAttributes: ['class', 'href', 'id', 'src'],
    compareAttributesAsJSON: [],
    ignoreWhitespaces: true,
    ignoreComments: true,
    ignoreEndTags: false,
    ignoreDuplicateAttributes: true
  };

  const htmlDiffer = new HtmlDiffer(options);

  const diff = htmlDiffer.diffHtml(oldContentHtml, contentHtml);
  const result = addDiffStylesHtml(diff);
  return (
    <div className={classNames(styles.rendered_text, className)}>
      {parse(result)}
    </div>
  );
};

export default TextRenderWithDiff;
