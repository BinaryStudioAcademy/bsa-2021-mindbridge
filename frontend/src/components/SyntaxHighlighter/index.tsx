import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface ISyntaxHighlighterProps {
  className?: string;
  text: string;
  markdown: boolean;
}

const SyntaxHighlighterComponent: React.FC<ISyntaxHighlighterProps> = (
  { className, text, markdown }
) => (
  <SyntaxHighlighter
    className={classNames(styles.syntaxHighlighter, className)}
    lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
    wrapLines
    language={markdown ? 'markdown' : 'htmlbars'}
    style={a11yLight}
  >
    {text}
  </SyntaxHighlighter>
);

export default SyntaxHighlighterComponent;
