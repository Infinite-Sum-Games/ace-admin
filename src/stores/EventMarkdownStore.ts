import { create } from 'zustand';

interface MarkdownStore {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export const useMarkdownStore = create<MarkdownStore>((set) => ({
  markdown: 'Write Your Text Here',
  setMarkdown: (value) => set({ markdown: value }),
}));
