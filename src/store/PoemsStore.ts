import { makeAutoObservable, runInAction } from 'mobx';
import { IPoem } from '../types/types';
import { 
  createPoem as apiCreatePoem, 
  updatePoem as apiUpdatePoem
} from '../http/poemsAPI';

class PoemStore {
  poems: IPoem[] = [];
  currentPoem: IPoem | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async createPoem(data: { title: string; content: string; html_content: string, authorId: number }) {
    this.isLoading = true;
    this.error = null;
    try {
      const poem = await apiCreatePoem(data);
      runInAction(() => {
        this.poems.unshift(poem);
        this.currentPoem = poem;
        this.isLoading = false;
      });

      return poem;
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.error || 'Ошибка при создании заметки';
        this.isLoading = false;
      });
      console.error('Error creating poem:', error);
      throw error;
    }
  }

  async updatePoem(id: number, data: { title?: string; content?: string; html_content?: string, authorId: number }) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedPoem = await apiUpdatePoem(id, data);
      runInAction(() => {
        const index = this.poems.findIndex(poem => poem.id === id);
        if (index !== -1) {
          this.poems[index] = updatedPoem;
        }
        this.currentPoem = updatedPoem;
        this.isLoading = false;
      });

      return updatedPoem;
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.error || 'Ошибка при обновлении заметки';
        this.isLoading = false;
      });
      console.error(`Error updating poem ${id}:`, error);
      throw error;
    }
  }

  clearCurrentPoem() {
    this.currentPoem = null;
  }

  clearError() {
    this.error = null;
  }
}

export default new PoemStore();