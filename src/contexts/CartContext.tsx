import { createContext, ReactNode, useEffect, useState } from 'react'
import { SnackData } from '../interfaces/SnackData'
import { toast } from 'react-toastify'
import { snackEmoji } from '../helpers/snackEmoji'
import { useNavigate } from 'react-router-dom'
import { CustomerData } from '../interfaces/CustomerData'

interface Snack extends SnackData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void
  removeSnackFromCart: (snack: Snack) => void
  snackCartIncrement: (snack: Snack) => void
  snackCartDecrement: (snack: Snack) => void
  confirmOrder: () => void
  payOrder: (customer: CustomerData) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

const localStorageKey = '@CardapioDigital:cart'

export function CartProvider({ children }: Readonly<CartProviderProps>) {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Snack[]>(() => {
    const value = JSON.parse(localStorage.getItem(localStorageKey) ?? '[]')
    return value
  })

  function saveCart(items: Snack[]) {
    setCart(items)
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

  function clearCart() {
    localStorage.removeItem(localStorageKey)
  }

  function addSnackIntoCart(snack: SnackData): void {
    const snackExixtentInCart = cart.find(
      (item) => item.snack === snack.snack && item.id === snack.id,
    )

    if (snackExixtentInCart) {
      const newCart = cart.map((item) => {
        if (item.id === snack.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity
          return { ...item, quantity, subtotal }
        }
        return item
      })
      toast.success(`Outro(a) ${snackEmoji(snack.snack)} ${snack.name} adicionado aos pedidos`)
      saveCart(newCart)
      return
    }

    const newSnack = { ...snack, quantity: 1, subtotal: snack.price }
    const newCart = [...cart, newSnack]

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado aos pedidos`)

    saveCart(newCart)
  }

  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack))
    saveCart(newCart)
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if (newQuantity <= 0) return

    const snackExistentInCart = cart.find(
      (item) => item.id === snack.id && item.snack === snack.snack,
    )

    if (!snackExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity,
        }
      }

      return item
    })

    saveCart(newCart)
  }

  function snackCartIncrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity + 1)
  }

  function snackCartDecrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity - 1)
  }

  function confirmOrder() {
    navigate('/payment')
  }
  function payOrder(customer: CustomerData) {
    console.log('Pay Order', cart, customer)

    clearCart() //deve ser executado apenas retorno positivo da api
    return
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        snackCartDecrement,
        confirmOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
