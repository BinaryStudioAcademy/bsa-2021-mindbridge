import React, { FunctionComponent, useRef } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getUrl } from '@helpers/image.helper';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import styles from './styles.module.scss';
import SunEditorCore from 'suneditor/src/lib/core';

interface IHtmlEditorProps {
  value: string;
  initialContent: string;
  onChange: (newValue: string) => void;
  placeholder: string;
}

const HtmlEditor: FunctionComponent<IHtmlEditorProps> = (
  { value, initialContent, onChange, placeholder }
) => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = sunEditor => {
    editor.current = sunEditor;
  };

  const handleChange = content => {
    onChange(content);
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    getUrl(files[0], uploadHandler);
  };

  return (
    <div className={styles.sunEditor}>
      <SunEditor
        defaultValue={initialContent}
        setContents={value}
        getSunEditorInstance={getSunEditorInstance}
        placeholder={placeholder}
        autoFocus
        setOptions={{
          height: '25em',
          buttonList: [
            ['formatBlock'],
            ['bold', 'underline', 'italic', 'strike'],
            ['removeFormat'],
            ['link', 'image'],
            ['align', 'horizontalRule', 'list', 'table'],
            ['fullScreen', 'showBlocks']
          ]
        }}
        onChange={handleChange}
        onImageUploadBefore={handleImageUploadBefore}
      />
    </div>
  );
};

export default HtmlEditor;
