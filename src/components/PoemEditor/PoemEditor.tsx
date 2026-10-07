import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { IAuthor, IPoem } from '../../types/types';
import { deletePoem } from '../../http/poemsAPI';
import poemStore from '../../store/PoemsStore';

import "./poemEditor.sass";

interface PoemEditorProps {
  poem: IPoem;
  author: IAuthor
  onSave?: () => void;
}

const PoemEditor: React.FC<PoemEditorProps> = observer(({poem, author, onSave}) => {
  const [title, setTitle] = useState(poem?.title || '');
  const [authorId, setAuthorId] = useState(poem?.authorId || 0);
  const [content, setContent] = useState(poem?.content || '');
  const [htmlContent, setHtmlContent] = useState(poem?.html_content || '');
  const editorRef = useRef<HTMLDivElement>(null);

  // Определяем, редактируем ли мы существующий стих
  const isEditing = poem?.id && poem.id > 0;

  // Синхронизируем состояние с пропсом poem
  useEffect(() => {
    setTitle(poem?.title || '');
    setAuthorId(poem?.authorId || 0);
    setContent(poem?.content || '');
    setHtmlContent(poem?.html_content || '');
    
    if (editorRef.current) {
      editorRef.current.innerHTML = poem?.html_content || poem?.content || '';
    }

    // Важно: синхронизируем poemStore.currentPoem с переданным poem
    if (poem?.id) {
      poemStore.currentPoem = poem;
    } else {
      poemStore.currentPoem = null;
    }
  }, [poem]); 

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText;
      setHtmlContent(html);
      setContent(text);
    }
  };

  const handleInput = () => {
    updateContent();
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    
    const currentHtml = editorRef.current.innerHTML;
    const currentText = editorRef.current.innerText;
    
    if (!currentText.trim() && !title.trim()) {
      alert('Стих не может быть пустым');
      return;
    }
    
    try {
      if (isEditing) {
        // Обновляем существующий стих
        await poemStore.updatePoem(poem.id, {
          title: title.trim(),
          content: currentText,
          html_content: currentHtml,
          authorId: authorId
        });
      } else {
        // Создаем новый стих
        await poemStore.createPoem({
          title: title.trim(),
          content: currentText,
          html_content: currentHtml,
          authorId: authorId
        });
      }
      
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleDelete = async () => {
    if (poem?.id && window.confirm('Удалить этот стих?')) {
      try {
        await deletePoem(poem.id);
        poemStore.clearCurrentPoem();
        if (onSave) onSave();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertParagraph', false);
    }
  };

  // Проверяем, есть ли у нас стих для редактирования
  const currentPoem = poemStore.currentPoem || poem;

  return (
    <div className="poem-editor">
        <div className="poem-editor__toolbar mb-2">
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('bold')}
            title="Жирный"
            type="button"
          >
            <strong>B</strong>
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('italic')}
            title="Курсив"
            type="button"
          >
            <em>I</em>
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('underline')}
            title="Подчеркнутый"
            type="button"
          >
            <u>U</u>
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('insertUnorderedList')}
            title="Маркированный список"
            type="button"
          >
            • List
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('insertOrderedList')}
            title="Нумерованный список"
            type="button"
          >
            1. List
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('formatBlock', '<p>')}
            title="Абзац"
            type="button"
          >
            ¶
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => formatText('indent')}
            title="Увеличить отступ"
            type="button"
          >
            ↳
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => formatText('outdent')}
            title="Уменьшить отступ"
            type="button"
          >
            ↲
          </button>
        </div>

        <div>{author.name}</div>
        <div>author.name</div>

      <div className="poem-editor__title mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Заголовок стиха"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div 
        ref={editorRef}
        className="poem-editor__content form-control"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{ 
          minHeight: '300px',
          padding: '1rem',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
          fontFamily: 'inherit',
          fontSize: '16px',
          lineHeight: '1.5'
        }}
        placeholder="Начните вводить текст стиха..."
        suppressContentEditableWarning={true}
      />
        <div className="poem-editor__actions mt-3">
          <button 
            className="btn btn-primary me-2"
            onClick={handleSave}
            disabled={poemStore.isLoading}
            type="button"
          >
            {poemStore.isLoading 
              ? 'Сохранение...' 
              : poemStore.currentPoem?.id ? 'Обновить' : 'Создать'}
          </button>
          {poemStore.currentPoem?.id && (
            <button 
              className="btn btn-outline-danger"
              onClick={handleDelete}
              type="button"
            >
              Удалить
            </button>
          )}
        </div>

      {poemStore.error && (
        <div className="alert alert-danger mt-3">
          {poemStore.error}
        </div>
      )}
    </div>
  );
});

export default PoemEditor;