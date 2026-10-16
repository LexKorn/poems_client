import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { IAuthor, IPoem } from '../../types/types';
import { deletePoem } from '../../http/poemsAPI';
import { AUTHOR_ROUTE } from '../../utils/consts';
import poemStore from '../../store/PoemsStore';

import "./poemEditor.sass";

interface PoemEditorProps {
  poem: IPoem;
  author: IAuthor;
  authorClickable?: boolean;
  onSave?: () => void;
}

const PoemEditor: React.FC<PoemEditorProps> = observer(({
  poem,
  author,
  authorClickable = false,
  onSave
}) => {
  const navigate = useNavigate();

  // Определяем, редактируем ли мы существующий стих
  const isEditing = !!(poem?.id && poem.id > 0);

  const [title, setTitle] = useState(poem?.title || '');
  const [authorId, setAuthorId] = useState(poem?.authorId || 0);
  const [content, setContent] = useState(poem?.content || '');
  const [htmlContent, setHtmlContent] = useState(poem?.html_content || '');
  // Новый стих — сразу режим редактирования, существующий — режим просмотра
  const [isEditMode, setIsEditMode] = useState<boolean>(!isEditing);

  const editorRef = useRef<HTMLDivElement>(null);

  // Синхронизируем состояние с пропсом poem
  useEffect(() => {
    setTitle(poem?.title || '');
    setAuthorId(poem?.authorId || 0);
    setContent(poem?.content || '');
    setHtmlContent(poem?.html_content || '');

    if (editorRef.current) {
      editorRef.current.innerHTML = poem?.html_content || poem?.content || '';
    }

    // Синхронизируем poemStore.currentPoem с переданным poem
    if (poem?.id) {
      poemStore.currentPoem = poem;
    } else {
      poemStore.currentPoem = null;
    }

    // Сбрасываем режим редактирования при смене стиха:
    // новый стих — сразу редактируем, существующий — только чтение
    setIsEditMode(!poem?.id);
  }, [poem]);

  // Управление contentEditable через ref (надёжнее, чем через пропс в JSX)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.contentEditable = isEditMode ? 'true' : 'false';
    }
  }, [isEditMode]);

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

    if (!title.trim()) {
      alert('Заголовок не может быть пустым');
      return;
    }
    if (!currentText.trim()) {
      alert('Содержание не может быть пустым');
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

  const handleAuthorClick = () => {
    if (!authorClickable) return;
    if (!author?.id) return;

    navigate(AUTHOR_ROUTE + `/${author.id}`);
  };

  return (
    <div className="poem-editor">
      {/* Панель форматирования — только в режиме редактирования */}
      {isEditMode && (
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
      )}

      <div
        className="poem-editor__author"
        onClick={handleAuthorClick}
        style={{
          cursor: authorClickable && author?.id ? 'pointer' : 'default',
          fontSize: '16px',
          color: authorClickable && author?.id ? 'silver' : 'whitesmoke',
          marginBottom: '10px',
          fontWeight: authorClickable && author?.id ? 'bold' : 'none',
        }}
      >
        {author?.name || 'Автор не указан'}
      </div>

      <div className="poem-editor__title mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Заголовок стиха"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={!isEditMode}
        />
      </div>

      <div
        ref={editorRef}
        className="poem-editor__content form-control"
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

      {/* Чекбокс "Редактировать" — только для существующего стиха */}
      {isEditing && (
        <div className="poem-editor__edit-toggle mt-3">
          <input
            type="checkbox"
            id="edit-mode"
            checked={isEditMode}
            onChange={(e) => setIsEditMode(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label
            htmlFor="edit-mode"
            style={{ marginLeft: '8px', cursor: 'pointer' }}
          >
            Редактировать
          </label>
        </div>
      )}

      {/* Кнопки Сохранить / Удалить — только в режиме редактирования */}
      {isEditMode && (
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
      )}

      {poemStore.error && (
        <div className="alert alert-danger mt-3">
          {poemStore.error}
        </div>
      )}
    </div>
  );
});

export default PoemEditor;