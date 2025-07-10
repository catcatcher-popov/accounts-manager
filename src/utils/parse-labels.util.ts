import type { Label } from '@/types/account.types'

export function parseLabels(input: string): Array<Label> {
  return input
    .split(';')                
    .map(s => s.trim())        
    .filter(s => s.length > 0) 
    .map(text => ({ text }))    
}
