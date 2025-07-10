<template>
  <PageHeader>
    <a-typography-title :level="2">Учетные записи</a-typography-title>
    <a-button type="primary" :icon="h(PlusOutlined)" @click="store.addAccount"> Добавить </a-button>
  </PageHeader>

  <AccountForm v-for="acc in store.accounts" :key="acc.id" :account="acc" />
</template>

<script setup lang="ts">
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import styled from 'vue3-styled-components';
import { useAccountsStore } from '@/stores/accounts.store';
import AccountForm from './AccountForm.vue';

const store = useAccountsStore();
</script>

<script lang="ts">
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
</script>
