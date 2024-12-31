import type { Form } from '@/types/form';

const STORAGE_KEY = 'forms';

export function getForms(): Form[] {
  try {
    const savedForms = localStorage.getItem('forms');
    if (savedForms) {
      const parsedForms = JSON.parse(savedForms);
      return Array.isArray(parsedForms) ? parsedForms : [];
    }
  } catch (error) {
    console.error('Failed to parse forms from localStorage:', error);
  }
  return [];
}


export function saveForm(form: Form) {
  const forms = getForms();
  const existingIndex = forms.findIndex((f) => f.id === form.id);

  if (existingIndex !== -1) {
    forms[existingIndex] = form;
  } else {
    forms.push(form);
  }

  localStorage.setItem('forms', JSON.stringify(forms));
}

export function getFormById(id: string): Form | undefined {
  return getForms().find(form => form.id === id);
}