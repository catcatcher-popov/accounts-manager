<template>
    <PageHeader>
      <h2>Учетные записи</h2>
      <a-button type="primary" @click="store.addAccount" :icon="h(PlusOutlined)">
        Добавить
      </a-button>
    </PageHeader>
  
    <AccountForm
      v-for="acc in store.accounts"
      :key="acc.id"
      :account="acc"
    />
  </template>
  
  <script setup lang="ts">
  import { h } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import styled from 'vue3-styled-components'
  import { useAccountsStore } from '@/stores/accounts.store'
  import AccountForm from './AccountForm.vue'
  
  const store = useAccountsStore()
  </script>
  
  <style scoped></style>
  
  <script lang="ts">
  const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `
  </script>
  