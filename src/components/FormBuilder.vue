<template>
    <div class="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <!-- Header -->
        <h2 v-if="isEditMode" class="text-3xl font-bold mb-6 text-center">
            {{ $t('form.edit_title') }}
        </h2>
        <h2 v-else class="text-3xl font-bold mb-6 text-center">
            {{ $t('form.view_title') }}
        </h2>

        <!-- Form Title -->
        <input v-if="isEditMode" v-model="form.title" :placeholder="$t('form.form_title')"
            class="w-full mb-4 p-3 border rounded-md focus:outline-blue-500" />
        <h3 v-else class="text-2xl font-semibold text-center">{{ form.title }}</h3>

        <!-- Form Description -->
        <textarea v-if="isEditMode" v-model="form.description" :placeholder="$t('form.form_description')"
            class="w-full mb-6 p-3 border rounded-md focus:outline-blue-500"></textarea>
        <p v-else class="text-gray-600 text-center">{{ form.description }}</p>

        <!-- Questions Section -->
        <h3 class="text-2xl font-semibold mb-4">{{ $t('form.questions') }}</h3>
        <div v-for="(question, index) in form.questions" :key="question.id"
            class="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
            <!-- Question Text -->
            <input v-if="isEditMode" v-model="question.text" :placeholder="$t('form.question_placeholder')"
                class="w-full mb-4 p-2 border rounded-md" />
            <h4 v-else class="text-lg font-medium mb-2">{{ index + 1 }}. {{ question.text }}</h4>

            <!-- Answer Type Selection (Edit Mode Only) -->
            <div v-if="isEditMode" class="flex gap-6 items-center mb-4">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="text" v-model="question.type" class="form-radio text-blue-500" />
                    {{ $t('form.answer_type.text') }}
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="multiple-choice" v-model="question.type"
                        class="form-radio text-blue-500" />
                    {{ $t('form.answer_type.multiple_choice') }}
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="checkbox" v-model="question.type" class="form-radio text-blue-500" />
                    {{ $t('form.answer_type.checkbox') }}
                </label>
            </div>

            <!-- Answer Fields -->
            <div v-if="question.type === 'text'" class="mt-2">
                <input v-model="answers[question.id]" type="text" :placeholder="$t('form.answer_text_placeholder')"
                    :disabled="isEditMode" class="w-full p-2 border rounded-md" />
            </div>
            <div v-else-if="question.type === 'multiple-choice'" class="mt-2 space-y-2">
                <div v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center gap-2">
                    <input v-model="answers[question.id]" type="radio" :value="option" :disabled="isEditMode"
                        class="mr-2" />
                    <input v-if="isEditMode" v-model="question.options[optIndex]"
                        :placeholder="$t('form.option_placeholder')" class="w-full p-2 border rounded-md" />
                    <label v-else>{{ option }}</label>
                    <button v-if="isEditMode" @click="removeOption(index, optIndex)"
                        class="text-red-500 ml-2 hover:text-red-600">
                        {{ $t('form.remove_option') }}
                    </button>
                </div>
                <button v-if="isEditMode" @click="addOption(index)" class="text-blue-500 hover:underline">
                    {{ $t('form.add_option') }}
                </button>
            </div>

            <!-- Remove Question Button -->
            <button v-if="isEditMode" @click="removeQuestion(index)" class="text-red-600 hover:text-red-700 mt-2">
                {{ $t('form.remove_question') }}
            </button>
        </div>

        <!-- Add Question Button (Edit Mode Only) -->
        <div v-if="isEditMode" class="text-center mt-6">
            <button @click="addQuestion" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                {{ $t('form.add_question') }}
            </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-6">
            <!-- Save Button -->
            <div class="text-center">
                <button v-if="isEditMode" @click="saveForm"
                    class="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600">
                    {{ $t('form.save_changes') }}
                </button>
            </div>
            <!-- Back Button -->
            <div class="text-center">
                <router-link to="/">
                    <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
                        {{ $t('form.back_to_forms') }}
                    </button>
                </router-link>
            </div>
        </div>

        <!-- Success Notification -->
        <div v-if="showSuccessMessage" class="mt-6 text-center text-green-600 font-semibold">
            {{ $t('form.form_saved') }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { Form, Question } from '@/types/form';

const props = defineProps({
    isEditMode: { type: Boolean, default: true },
    form: {
        type: Object as () => Form,
        required: true,
        default: () => ({
            id: '',
            title: '',
            description: '',
            questions: []
        })
    }
});
const showSuccessMessage = ref(false);

const emit = defineEmits(['onSave', 'onSubmit']);

const answers = ref<Record<string, string | string[]>>({});

// ✅ Initialize Answers from Questions
watch(
    () => props.form.questions,
    (questions) => {
        questions.forEach((question: Question) => {
            if (!answers.value[question.id]) {
                answers.value[question.id] = question.type === 'checkbox' ? [] : '';
            }
        });
    },
    { immediate: true }
);

// ✅ Save the current form
function saveForm() {
    console.log('Saving form:', props.form);
    emit('onSave', props.form);
    showSuccessMessage.value = true;

    setTimeout(() => {
        showSuccessMessage.value = false;
    }, 3000); // Hide message after 3 seconds
}

// ✅ Submit the answers
function submitAnswers() {
    console.log('Submitting answers:', answers.value);
    emit('onSubmit', answers.value);
}

// ✅ Add a new question
function addQuestion() {
    props.form.questions.push({
        id: Date.now().toString(),
        text: '',
        type: 'text',
        options: []
    });
}

// ✅ Remove a specific question
function removeQuestion(index: number) {
    props.form.questions.splice(index, 1);
}

// ✅ Add an option to a question
function addOption(questionIndex: number) {
    const question = props.form.questions[questionIndex];
    if (question.type === 'multiple-choice' || question.type === 'checkbox') {
        question.options.push('New Option');
    }
}

// ✅ Remove an option from a question
function removeOption(questionIndex: number, optionIndex: number) {
    const question = props.form.questions[questionIndex];
    if (question.type === 'multiple-choice' || question.type === 'checkbox') {
        question.options.splice(optionIndex, 1);
    }
}
</script>