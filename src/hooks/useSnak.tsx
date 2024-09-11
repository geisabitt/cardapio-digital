import { useContext } from 'react'
import { SnackContext } from '../contexts/SnacksContexts'

export function useSnack() {
  return useContext(SnackContext)
}
