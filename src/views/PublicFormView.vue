<template>
    <div class="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <!-- Form Header -->
        <div class="mb-6 text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-2">
                {{ form?.title || $t('form.untitled_form') }}
            </h1>
            <p class="text-gray-600">
                {{ form?.description || $t('form.no_description') }}
            </p>
        </div>

        <!-- Questions Section -->
        <div v-if="form?.questions?.length" class="space-y-6">
            <div v-for="(question, index) in form.questions" :key="question.id"
                class="p-4 border rounded-md bg-gray-50 shadow-sm">
                <!-- Question Text -->
                <h3 class="text-lg font-medium mb-2">{{ index + 1 }}. {{ question.text }}</h3>

                <!-- Text Input Question -->
                <div v-if="question.type === 'text'" class="mt-2">
                    <input v-model="answers[question.id]" type="text" :placeholder="$t('form.answer_placeholder')"
                        class="w-full p-2 border rounded-md focus:outline-blue-500" />
                </div>

                <!-- Multiple-Choice Question -->
                <div v-else-if="question.type === 'multiple-choice'" class="mt-2 space-y-2">
                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center">
                        <input v-model="answers[question.id]" type="radio" :value="option" :name="`question-${index}`"
                            class="mr-2" />
                        <label class="text-gray-700">{{ option }}</label>
                    </div>
                </div>

                <!-- Checkbox Question -->
                <div v-else-if="question.type === 'checkbox'" class="mt-2 space-y-2">
                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center">
                        <input type="checkbox" :value="option" v-model="answers[question.id]" class="mr-2" />
                        <label class="text-gray-700">{{ option }}</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State for No Questions -->
        <div v-else class="text-center text-gray-500 mt-6">
            {{ $t('form.no_questions') }}
        </div>

        <!-- Submission Confirmation Message -->
        <div v-if="isSubmitted" class="text-center text-green-600 font-medium mt-6">
            ✅ {{ $t('form.submission_success') }}
        </div>

        <!-- Submit Button -->
        <div class="text-center mt-8">
            <button @click="submitForm"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                💾 {{ $t('form.submit_answers') }}
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFormById } from '@/utils/localStorage';
import type { Form } from '@/types/form';
import { useRoute } from 'vue-router';

const route = useRoute();
const form = ref<Form | undefined>();
const answers = ref<Record<string, string | string[]>>({});
const isSubmitted = ref(false);

// Load the form and initialize answers
onMounted(() => {
    form.value = getFormById(route.params.id as string);

    if (form.value?.questions) {
        form.value.questions.forEach((question) => {
            answers.value[question.id] = question.type === 'checkbox' ? [] : '';
        });
    }
});

// Save answers to localStorage
function submitForm() {
    if (form.value?.id) {
        localStorage.setItem(
            `form-responses-${form.value.id}`,
            JSON.stringify(answers.value)
        );
        isSubmitted.value = true;

        setTimeout(() => {
            isSubmitted.value = false;
        }, 3000);
    }
}
</script>