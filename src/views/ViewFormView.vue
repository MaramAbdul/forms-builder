<template>
    <div class="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <!-- Form Builder Component -->
        <FormBuilder :isEditMode="isEditMode" :form="form" @onSave="handleSave" @onSubmit="handleSubmit" />

        <!-- Action Buttons -->
        <div class="text-center mt-8">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFormById, saveForm } from '@/utils/localStorage';
import type { Form } from '@/types/form';
import { useRoute, useRouter } from 'vue-router';
import FormBuilder from '@/components/FormBuilder.vue';

const route = useRoute();
const router = useRouter();

// ✅ Enable Edit Mode by Default
const isEditMode = ref(true);

// ✅ Initialize form with a default value
const form = ref<Form>({
    id: '',
    title: '',
    description: '',
    questions: []
});

// ✅ Load form data
onMounted(() => {
    const loadedForm = getFormById(route.params.id as string);
    if (loadedForm) {
        form.value = loadedForm;
    } else {
        console.warn('Form not found');
        router.push('/'); // Redirect to home if form not found
    }
});

// ✅ Toggle Edit Mode
function toggleEditMode() {
    if (isEditMode.value) {
        handleSave(form.value);
    }
    isEditMode.value = !isEditMode.value;
}

// ✅ Save Edited Form
function handleSave(updatedForm: Form) {
    saveForm(updatedForm);
    console.log('Form updated:', updatedForm);
    // Stay on the same page after saving
}

// ✅ Handle Submit (View Mode)
function handleSubmit(answers: Record<string, string[] | string>) {
    console.log('Answers submitted:', answers); // Debugging
    localStorage.setItem(`form-answers-${form.value.id}`, JSON.stringify(answers));
}
</script>