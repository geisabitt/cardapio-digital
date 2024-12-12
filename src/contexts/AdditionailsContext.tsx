import React, { createContext, useContext, useState } from 'react'

interface Additional {
  id: string
  name: string
  price: number
}

interface AdditionalContextData {
  selectedAdditionals: Additional[]
  total: number
  addAdditional: (additional: Additional) => void
  removeAdditional: (id: string) => void
}

const AdditionalContext = createContext<AdditionalContextData>({} as AdditionalContextData)

export const AdditionalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAdditionals, setSelectedAdditionals] = useState<Additional[]>([])

  const addAdditional = (additional: Additional) => {
    setSelectedAdditionals((prev) => [...prev, additional])
  }

  const removeAdditional = (id: string) => {
    setSelectedAdditionals((prev) => prev.filter((item) => item.id !== id))
  }

  const total = selectedAdditionals.reduce((acc, item) => acc + item.price, 0)

  return (
    <AdditionalContext.Provider
      value={{ selectedAdditionals, total, addAdditional, removeAdditional }}
    >
      {children}
    </AdditionalContext.Provider>
  )
}

export const useAdditionals = () => useContext(AdditionalContext)
