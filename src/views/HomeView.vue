<template>
  <div class="p-8 max-w-4xl mx-auto">
    <!-- Page Header -->
    <h1 class="text-4xl font-bold text-center mb-6">
      📋 {{ $t('form.my_forms') }}
    </h1>

    <!-- Create New Form Button -->
    <div class="text-center mb-8">
      <router-link to="/create">
        <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          ➕ {{ $t('form.create_new_form') }}
        </button>
      </router-link>
    </div>

    <!-- Form List -->
    <ul v-if="forms.length > 0" class="space-y-4">
      <li v-for="form in forms" :key="form.id" class="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition">
        <!-- Form Title -->
        <div class="flex items-center justify-between">
          <router-link :to="`/form/${form.id}`" class="text-lg font-medium text-gray-800 hover:text-blue-500">
            📝 {{ form.title || $t('form.untitled_form') }}
          </router-link>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <!-- Share Button -->
            <button @click="copyShareLink(form.id)"
              class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
              🔗 {{ $t('form.share') }}
            </button>

            <!-- Edit Button -->
            <router-link :to="`/form/${form.id}`">
              <button class="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                ✏️ {{ $t('form.edit') }}
              </button>
            </router-link>
          </div>
        </div>
      </li>
    </ul>

    <!-- Empty State Message -->
    <div v-else class="text-center text-gray-500 mt-8">
      <p>{{ $t('form.no_forms_available') }}</p>
    </div>

    <!-- Notification for Copied Link -->
    <div v-if="showCopyNotification"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
      ✅ {{ $t('form.link_copied') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getForms } from '@/utils/localStorage';
import type { Form } from '@/types/form';

const forms = ref<Form[]>([]);
const showCopyNotification = ref(false);

// ✅ Load forms on mount
onMounted(() => {
  loadForms();
});

// ✅ Function to load forms safely
function loadForms() {
  try {
    const storedForms = getForms();
    console.log('Loaded Forms:', storedForms); // Debugging
    if (Array.isArray(storedForms)) {
      forms.value = storedForms.filter((form) => form && form.id);
    } else {
      console.warn('Invalid data in localStorage. Resetting forms.');
      forms.value = [];
    }
  } catch (error) {
    console.error('Error loading forms:', error);
    forms.value = [];
  }
}

// ✅ Copy Public Shareable Link to Clipboard
function copyShareLink(formId: string) {
  const publicLink = `${window.location.origin}/form/public/${formId}`;
  navigator.clipboard.writeText(publicLink).then(() => {
    showCopyNotification.value = true;

    // Hide the notification after 2 seconds
    setTimeout(() => {
      showCopyNotification.value = false;
    }, 2000);
  });
}
</script>