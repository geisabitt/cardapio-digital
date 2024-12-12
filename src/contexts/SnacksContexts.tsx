import { createContext, ReactNode, useEffect, useState } from 'react'

import { SnackData } from '../interfaces/SnackData'

import { getAcais } from '../services/api'
// import { getAcais, getBurgers, getDrinks, getIceCreams, getPizzas } from '../services/api'

interface SnackContextProps {
  // burgers: SnackData[]
  // pizzas: SnackData[]
  // drinks: SnackData[]
  // iceCreams: SnackData[]
  acais: SnackData[]
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackContext = createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  // const [burgers, setBurgers] = useState<SnackData[]>([])
  // const [pizzas, setPizzas] = useState<SnackData[]>([])
  // const [drinks, setDrinks] = useState<SnackData[]>([])
  // const [iceCreams, setIceCreams] = useState<SnackData[]>([])
  const [acais, setAcais] = useState<SnackData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        // const burgerRequest = await getBurgers()
        // const pizzaRequest = await getPizzas()
        // const drinkRequest = await getDrinks()
        // const iceCreamRequest = await getIceCreams()
        const acaiRequest = await getAcais()

        const requests = [acaiRequest]
        // const requests = [burgerRequest, pizzaRequest, drinkRequest, iceCreamRequest, acaiRequest]

        const [
          // { data: burgerResponse },
          // { data: pizzaResponse },
          // { data: drinkResponse },
          // { data: iceCreamResponse },
          { data: acaiResponse },
        ] = await Promise.all(requests)

        // setBurgers(burgerResponse)
        // setPizzas(pizzaResponse)
        // setDrinks(drinkResponse)
        // setIceCreams(iceCreamResponse)
        setAcais(acaiResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    // <SnackContext.Provider value={{ burgers, pizzas, drinks, iceCreams, acais }}>
    <SnackContext.Provider value={{ acais }}>{children}</SnackContext.Provider>
  )
}
