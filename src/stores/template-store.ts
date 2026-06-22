import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TemplateId, TemplateConfig } from '@/types';

import { templateRegistry } from '@/data/template-registry';

const templates: TemplateConfig[] = templateRegistry;

interface TemplateStore {
  activeTemplateId: TemplateId;
  customPrimaryColor: string | null;
  customFontHeading: string | null;
  customFontBody: string | null;
  templates: TemplateConfig[];

  setTemplate: (id: TemplateId) => void;
  setCustomColor: (color: string) => void;
  setCustomFonts: (heading?: string, body?: string) => void;
  getActiveTemplate: () => TemplateConfig;
  getEffectiveConfig: () => TemplateConfig;
  resetCustomizations: () => void;
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      activeTemplateId: 'tech_silicon',
      customPrimaryColor: null,
      customFontHeading: null,
      customFontBody: null,
      templates,

      setTemplate: (id) =>
        set({ activeTemplateId: id, customPrimaryColor: null, customFontHeading: null, customFontBody: null }),

      setCustomColor: (color) => set({ customPrimaryColor: color }),

      setCustomFonts: (heading, body) =>
        set((state) => ({
          customFontHeading: heading ?? state.customFontHeading,
          customFontBody: body ?? state.customFontBody,
        })),

      getActiveTemplate: () => {
        const state = get();
        return state.templates.find((t) => t.id === state.activeTemplateId) ?? templates[0];
      },

      getEffectiveConfig: () => {
        const state = get();
        const base = state.templates.find((t) => t.id === state.activeTemplateId) ?? templates[0];
        return {
          ...base,
          primaryColor: state.customPrimaryColor ?? base.primaryColor,
          fontHeading: state.customFontHeading ?? base.fontHeading,
          fontBody: state.customFontBody ?? base.fontBody,
        };
      },

      resetCustomizations: () =>
        set({ customPrimaryColor: null, customFontHeading: null, customFontBody: null }),
    }),
    { name: 'resume-australia-template', version: 1 }
  )
);
