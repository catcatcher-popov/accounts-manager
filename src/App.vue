<template>
  <AppWrapper>
    <AccountsList />
  </AppWrapper>
</template>

<script setup lang="ts">
import AccountsList from '@/components/AccountsList.vue'
</script>

<!-- стили через styled-components -->
<script lang="ts">
import styled from 'vue3-styled-components'

export const AppWrapper = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 0 16px;
  background: #f5f5f5;
  min-height: 100vh;
`
</script>
