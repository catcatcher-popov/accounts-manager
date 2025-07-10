import { defineStore }   from 'pinia'
import { ref }           from 'vue'
import { nanoid }        from 'nanoid'
import type { Account, Label } from '@/types'
import { AccountType } from '@/types'


export const useAccountsStore = defineStore(
  'accounts',
  () => {
    const accounts = ref<Account[]>([])

    function addAccount() {
      accounts.value.push({
        id:       nanoid(),
        labels:   [] as Label[],
        type:     AccountType.LDAP,
        login:    '',
        password: null
      })
    }

    function updateAccount(payload: Partial<Account> & { id: string }) {
      const idx = accounts.value.findIndex(a => a.id === payload.id)
      if (idx === -1) return
      const acc = accounts.value[idx]
      if (payload.labels   !== undefined) acc.labels   = payload.labels
      if (payload.type     !== undefined) acc.type     = payload.type
      if (payload.login    !== undefined) acc.login    = payload.login
      if (payload.password !== undefined) acc.password = payload.password
    }

    function removeAccount(id: string) {
      accounts.value = accounts.value.filter(a => a.id !== id)
    }

    return { accounts, addAccount, updateAccount, removeAccount }
  },
  {
    // persist-опция сразу работает для setup-store
    persist: {
      enabled: true,
      strategies: [
        {
          key:     'accounts',
          storage: localStorage
        }
      ]
    }
  }
)
