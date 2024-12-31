<template>
    <div class="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <FormBuilder :isEditMode="true" :form="form" @onSave="handleSave" />
        <div class="text-center mt-8">
            <!-- <router-link to="/">
                <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
                    ← Back to Forms
                </button>
            </router-link> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { saveForm } from '@/utils/localStorage';
import type { Form } from '@/types/form';
import { useRouter } from 'vue-router';
import FormBuilder from '@/components/FormBuilder.vue';

const router = useRouter();

// ✅ Initialize a new form
const form = ref<Form>({
    id: Date.now().toString(),
    title: '',
    description: '',
    questions: []
});

// ✅ Handle Save Event
function handleSave(updatedForm: Form) {
    saveForm(updatedForm);
    console.log('New form created:', updatedForm);
    router.push(`/form/${updatedForm.id}`); // Redirect to view/edit mode
}
</script>