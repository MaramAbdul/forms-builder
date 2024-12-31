<script setup lang="ts">
</script>

<template>
  <div class="p-4 bg-gray-100">
    <select v-model="$i18n.locale" class="p-2 border rounded-md">
      <option value="en">🇺🇸 English</option>
      <!-- <option value="ar">🇸🇦 Arabic</option> -->
      <option value="jp"> 🇯🇵 日本語</option>


    </select>
  </div>
  <RouterView />
</template>
