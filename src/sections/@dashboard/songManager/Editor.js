import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

import './styles.css';

Quill.register('modules/imageResize', ImageResize);

const Editor = forwardRef(({ onChange, placeholder }, ref) => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = useCallback(
    (content, delta, source, editor) => {
      setEditorHtml(content);
      const html = typeof editor.getHTML === 'function' ? editor.getHTML() : editor.root.innerHTML;
      onChange(html);
    },
    [onChange]
  );

  useImperativeHandle(ref, () => ({
    handleChange: (content) => {
      setEditorHtml(content);
    },
  }));

  return (
    <ReactQuill
      onChange={handleChange}
      value={editorHtml}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'#root'}
      placeholder={placeholder}
    />
  );
});

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

export default Editor;
