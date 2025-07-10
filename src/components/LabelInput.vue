<template>
    <InputRow>
      <StyledLabel>Метки</StyledLabel>
      <a-textarea
        v-model:value="inputValue"
        :placeholder="placeholder"
        :status="error.length ? 'error' : ''"
        @blur="onBlur"
        autosize="true"
      />
    </InputRow>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import styled from 'vue3-styled-components'
  import { parseLabels } from '@/utils/parse-labels.util'
  import type { Label } from '@/types'
  
  const props = defineProps<{
    modelValue: Label[]
    placeholder?: string
    error: string[]
    onBlurCallback?: () => void
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', v: Label[]): void
  }>()
  
  const inputValue = ref(props.modelValue.map(l => l.text).join('; '))
  
  watch(() => props.modelValue, v => {
    inputValue.value = v.map(l => l.text).join('; ')
  })
  
  function onBlur() {
    const labels = parseLabels(inputValue.value)
    emit('update:modelValue', labels)
    if (props.onBlurCallback) props.onBlurCallback()
  }
  
  const InputRow = styled.div`
    display: flex;
    flex-direction: column;
  `
  const StyledLabel = styled.label`
    margin-bottom: 4px;
    font-weight: 500;
  `
  </script>
  