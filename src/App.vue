<template>
  <a-config-provider :theme="themeConfig">
    <AppWrapper>
      <AccountsList />
    </AppWrapper>
  </a-config-provider>
</template>

<script setup lang="ts">
import AccountsList from '@/components/AccountsList.vue';
</script>

<script lang="ts">
import styled from 'vue3-styled-components';

export const themeConfig = {
  token: {
    colorPrimary: '#A8DADC',
    colorBgLayout: '#F0F4F8',
    colorBgContainer: '#FFFFFF',
    colorBorder: '#cde1e6',
    borderRadius: '4px',
    colorError: '#EF233C',
  },
};

export const AppWrapper = styled.div`
  max-width: 960px;
  margin: 16px auto;
  padding: 0 16px;
  min-height: 100vh;
`;
</script>

<style>
:root {
  background-color: #f0f4f8;
  color: #3a4a5c;
}
h2 {
  color: #3a4a5c !important;
}
</style>
