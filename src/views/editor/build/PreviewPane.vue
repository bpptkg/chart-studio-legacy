<template>
  <preview-pane :loading="isFetching">
    <render-area></render-area>
  </preview-pane>
</template>

<script setup lang="ts">
import PreviewPane from '@/components/PreviewPane.vue';
import { useDataStore } from '@/store/data';
import { storeToRefs } from 'pinia';
import RenderArea from './RenderArea.vue';

const dataStore = useDataStore();
const { isFetching } = storeToRefs(dataStore);
</script>
