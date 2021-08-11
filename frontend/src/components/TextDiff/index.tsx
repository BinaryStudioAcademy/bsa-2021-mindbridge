import React from 'react';

import { diffWords } from 'diff';

interface ITextDiffProps {
  oldText: string;
  newText: string;
}

const TextDiff: React.FC<ITextDiffProps> = ({ oldText, newText }) => {
  const diff = diffWords(oldText, newText);

  const result = diff.map(part => {
    let spanStyle: { color: string; backgroundColor: string; textDecoration: string };
    if (part.added) {
      spanStyle = {
        color: '#29813f',
        backgroundColor: '#e6ffec',
        textDecoration: 'none'
      };
    } else if (part.removed) {
      spanStyle = {
        color: '#c5272d',
        backgroundColor: '#feeeef',
        textDecoration: 'line-through'
      };
    }
    return React.createElement(
      'span',
      { style: spanStyle },
      part.value
    );
  });

  return (
    React.createElement(
      'div',
      { className: 'diff-result' },
      result
    ));
};

export default TextDiff;
