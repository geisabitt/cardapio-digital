import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { snackEmoji } from '../helpers/snackEmoji'
import { useNavigate } from 'react-router-dom'
import { CustomerData } from '../interfaces/CustomerData'
import { Snack, SnackAdditionals } from '../interfaces/Snack'
import { processCheckout } from '../services/api'

interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: SnackAdditionals) => void
  removeSnackFromCart: (snack: SnackAdditionals) => void
  snackCartIncrement: (snack: SnackAdditionals) => void
  snackCartDecrement: (snack: SnackAdditionals) => void
  removeSnackFromCartByIndex: (index: number) => void
  snackCartIncrementByIndex: (index: number) => void
  snackCartDecrementByIndex: (index: number) => void
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

  function addSnackIntoCart(snack: SnackAdditionals): void {
    const additionalsTotal = snack.additionals
      ? snack.additionals.reduce(
          (acc, additional) =>
            acc + (isNaN(Number(additional.price)) ? 0 : Number(additional.price)),
          0,
        )
      : 0

    const newSnack = {
      ...snack,
      quantity: 1,
      subtotal: (isNaN(Number(snack.price)) ? 0 : Number(snack.price)) + additionalsTotal,
    }
    const newCart = [...cart, newSnack]

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado aos pedidos`)

    saveCart(newCart)
  }

  function removeSnackFromCart(snack: SnackAdditionals) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack))
    saveCart(newCart)
  }

  function updateSnackQuantity(snack: SnackAdditionals, newQuantity: number) {
    if (newQuantity <= 0) return

    const snackExistentInCart = cart.find(
      (item) => item.id === snack.id && item.snack === snack.snack,
    )

    if (!snackExistentInCart) return

    const additionalsTotal = snackExistentInCart.additionals
      ? snackExistentInCart.additionals.reduce((acc, additional) => acc + additional.price, 0)
      : 0

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: (item.price + +additionalsTotal) * newQuantity, // Atualizando o subtotal
        }
      }

      return item
    })

    saveCart(newCart)
  }

  function snackCartIncrement(snack: SnackAdditionals) {
    updateSnackQuantity(snack, snack.quantity + 1)
  }

  function snackCartDecrement(snack: SnackAdditionals) {
    updateSnackQuantity(snack, snack.quantity - 1)
  }

  //Funções baseadas no index para a acaiteria que pode haver o mesmo produto mas com adicionais diferentes

  function removeSnackFromCartByIndex(index: number) {
    const newCart = [...cart] // Cria uma cópia do array atual
    newCart.splice(index, 1) // Remove o item pelo índice
    saveCart(newCart) // Atualiza o estado e o localStorage
  }

  function updateSnackQuantityByIndex(index: number, newQuantity: number) {
    if (newQuantity <= 0) return

    const item = cart[index] // Localiza o item pelo índice
    if (!item) return

    const additionalsTotal = item.additionals
      ? item.additionals.reduce((acc, additional) => acc + Number(additional.price || 0), 0)
      : 0

    const updatedItem = {
      ...item,
      quantity: newQuantity,
      subtotal: (Number(item.price) + additionalsTotal) * newQuantity,
    }

    const newCart = [...cart]
    newCart[index] = updatedItem // Atualiza o item pelo índice
    saveCart(newCart)
  }
  function snackCartIncrementByIndex(index: number) {
    const item = cart[index]
    if (!item) return

    updateSnackQuantityByIndex(index, item.quantity + 1)
  }

  function snackCartDecrementByIndex(index: number) {
    const item = cart[index]
    if (!item) return

    updateSnackQuantityByIndex(index, item.quantity - 1)
  }

  function confirmOrder() {
    navigate('/payment')
  }

  async function payOrder(customer: CustomerData) {
    console.log('Pay Order', cart, customer)

    try {
      const response = await processCheckout(cart, customer)

      if (response.data.status !== 'PAID') {
        toast.error('Erro ao processar pagamento, por favor tente novamente.')
        return
      }
      toast.success('Pagamento realizado com sucesso')
      clearCart()
    } catch (error) {
      toast.error('Erro ao processar Pedido')
      console.error(error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        snackCartDecrement,
        removeSnackFromCartByIndex,
        snackCartIncrementByIndex,
        snackCartDecrementByIndex,
        confirmOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
