import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IPoem } from '../../types/types';
import { deletePoem } from '../../http/poemsAPI';
import { Context } from '../..';
import poemStore from '../../store/PoemsStore';

import "./poemEditor.sass";

interface PoemEditorProps {
  poem: IPoem;
  onSave?: () => void;
}

const PoemEditor: React.FC<PoemEditorProps> = observer(({poem, onSave}) => {
  const {users} = useContext(Context);
  const location = useLocation();
  const [title, setTitle] = useState(poem?.title || '');
  const [content, setContent] = useState(poem?.content || '');
  const [htmlContent, setHtmlContent] = useState(poem?.html_content || '');
  const editorRef = useRef<HTMLDivElement>(null);

  // Синхронизируем состояние с пропсом poem
  useEffect(() => {
    setTitle(poem?.title || '');
    setContent(poem?.content || '');
    setHtmlContent(poem?.html_content || '');
    
    if (editorRef.current) {
      editorRef.current.innerHTML = poem?.html_content || poem?.content || '';
    }
  }, [poem]); // Зависимость от пропса poem

  // Также обновляем при изменении currentPoem в сторе
  useEffect(() => {
    if (poemStore.currentPoem) {
      setTitle(poemStore.currentPoem.title || '');
      setContent(poemStore.currentPoem.content || '');
      setHtmlContent(poemStore.currentPoem.html_content || '');
      
      if (editorRef.current) {
        editorRef.current.innerHTML = poemStore.currentPoem.html_content || poemStore.currentPoem.content || '';
      }
    }
  }, [poemStore.currentPoem]);

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
    
    const isUpdate = poemStore.currentPoem?.id && poemStore.currentPoem.id > 0;
    
    if (isUpdate && poemStore.currentPoem) {
      // Обновляем существующий стих
      await poemStore.updatePoem(poemStore.currentPoem.id, {
        title: title.trim(),
        content: currentText,
        html_content: currentHtml,
      });
    } else {
      // Создаем новый стих
      await poemStore.createPoem({
        title: title.trim(),
        content: currentText,
        html_content: currentHtml,
      });
    }
    
    if (onSave) {
      onSave(); // Вызываем callback
    }
  };

  const handleNewPoem = () => {
    setTitle('');
    setContent('');
    setHtmlContent('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
    poemStore.clearCurrentPoem();
  };

  const handleDelete = async () => {
    if (poemStore.currentPoem?.id && window.confirm('Удалить этот стих?')) {
      await deletePoem(poemStore.currentPoem.id);
      poemStore.clearCurrentPoem();
      handleNewPoem();
      if (onSave) onSave();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertParagraph', false);
    }
  };

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
        :<div></div>

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
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={handleNewPoem}
            type="button"
          >
            Новый стих
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
        :<div></div>

      {poemStore.error && (
        <div className="alert alert-danger mt-3">
          {poemStore.error}
        </div>
      )}
    </div>
  );
});

export default PoemEditor;