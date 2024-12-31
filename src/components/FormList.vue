<template>
    <div class="p-8 max-w-4xl mx-auto">
        <!-- Header -->
        <h2 class="text-3xl font-bold mb-6 text-center">
            {{ $t('forms.available_forms') }}
        </h2>

        <!-- Form List -->
        <ul class="space-y-4">
            <li v-for="form in forms" :key="form.id" class="p-4 bg-white shadow rounded-lg hover:shadow-lg transition">
                <router-link :to="`/form/${form.id}`" class="text-lg font-medium hover:underline">
                    {{ form.title }}
                </router-link>
            </li>
        </ul>

        <!-- Create New Form Button -->
        <div class="mt-6 text-center">
            <router-link to="/create">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    {{ $t('forms.create_new_form') }}
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getForms } from '@/utils/localStorage';
import type { Form } from '@/types/form';

const forms = ref<Form[]>([]);

onMounted(() => {
    forms.value = getForms();
});
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getForms } from '@/utils/localStorage';
import type { Form } from '@/types/form';

const forms = ref<Form[]>([]);

onMounted(() => {
    forms.value = getForms();
});
</script>