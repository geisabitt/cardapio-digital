import { createContext, ReactNode, useEffect, useState } from 'react'

import { SnackData } from '../interfaces/SnackData'

import { getAcais } from '../services/api'

interface SnackContextProps {
  acais: SnackData[]
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackContext = createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  const [acais, setAcais] = useState<SnackData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const acaiRequest = await getAcais()

        const requests = [acaiRequest]

        const [{ data: acaiResponse }] = await Promise.all(requests)

        setAcais(acaiResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return <SnackContext.Provider value={{ acais }}>{children}</SnackContext.Provider>
}
