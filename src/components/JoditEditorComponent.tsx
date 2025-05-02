import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';

interface JoditEditorComponentProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const JoditEditorComponent: React.FC<JoditEditorComponentProps> = ({
  initialValue = '',
  onChange
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const config = {
    readonly: false,
    language: 'pt_br',
    placeholder: 'Digite aqui seu conteúdo...',
    toolbarSticky: false,
    height: 300,
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent);
          if (onChange) onChange(newContent);
        }}
      />
    </div>
  );
};

export default JoditEditorComponent;
