<template>
  <FormCard>
    <a-row :gutter="8">
      <a-col :span="6">
        <LabelInput
          v-model="local.labels"
          :error="errors.labels"
          placeholder="tag1; tag2"
          :onBlurCallback="validateField"
        />
        <a-alert v-for="err in errors.labels" type="error" :message="err" />
      </a-col>

      <a-col :span="3">
        <FieldLabel>Тип записи</FieldLabel>
        <a-select
          v-model:value="local.type"
          style="width: 100%"
          @change="onTypeChange"
          @blur="validateField()"
        >
          <a-select-option v-for="opt in accountTypeOptions" :key="opt.value" :value="opt.value">{{
            opt.label
          }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="14">
        <a-row :gutter="8">
          <a-col :span="local.type === 'Local' ? 12 : 24">
            <FieldLabel>Логин</FieldLabel>
            <a-input
              v-model:value="local.login"
              :status="errors.login.length ? 'error' : ''"
              @blur="validateField()"
            />
            <a-alert v-for="err in errors.login" type="error" :message="err" />
          </a-col>
          <a-col v-if="local.type === 'Local'" :span="12">
            <FieldLabel>Пароль</FieldLabel>
            <a-input-password
              v-model:value="local.password"
              :status="errors.password.length ? 'error' : ''"
              @blur="validateField()"
            />
            <a-alert v-for="err in errors.password" type="error" :message="err" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="1">
        <RemoveButton :icon="h(DeleteOutlined)" @click="remove" />
      </a-col>
    </a-row>
  </FormCard>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue';
import styled from 'vue3-styled-components';
import { useAccountsStore } from '@/stores/accounts.store';
import { AccountValidationErrors, validateAccount } from '@/utils/validate-account.util';
import type { Account } from '@/types';
import { AccountType } from '@/types';
import LabelInput from './LabelInput.vue';
import { Button } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';

const props = defineProps<{ account: Account }>();

const local = reactive({ ...props.account });

const store = useAccountsStore();

const errors = reactive<AccountValidationErrors>({
  id: [],
  labels: [],
  type: [],
  login: [],
  password: [],
});

const accountTypeOptions = [
  { label: 'LDAP', value: AccountType.LDAP },
  { label: 'Local', value: AccountType.LOCAL },
] as const;

function onTypeChange(val: AccountType) {
  local.password = val === AccountType.LOCAL ? local.password : null;
}

function validateField() {
  const allErrors = validateAccount(local);
  Object.assign(errors, allErrors);
  if (!Object.values(errors).reduce((acc, curr) => [...acc, ...curr]).length) update();
}

function update() {
  store.updateAccount({ ...local });
}

function remove() {
  store.removeAccount(local.id);
}

const FormCard = styled.div`
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
`;
const FieldLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;
const RemoveButton = styled(Button)`
  margin-top: 1 rem;
  --antd-wave-shadow-color: transparent;
`;
</script>
