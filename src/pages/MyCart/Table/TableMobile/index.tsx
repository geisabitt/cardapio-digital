import { FaTrashAlt } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'

import { currencyFormat } from '../../../../helpers/currencyFormat'

import minusImg from '../../../../assets/circle-minus.svg'
import plusImg from '../../../../assets/circle-plus.svg'

import { Container } from './style'
import { ConfirmOrder } from '../../../../components/OrderCloseAction/ConfirmOrder'
import { SnackAdditionals } from '../../../../interfaces/Snack'

export function TableMobile() {
  const { cart, removeSnackFromCart, snackCartIncrement, snackCartDecrement } = useCart()

  return (
    <Container>
      {cart.map((item) => (
        <div key={`${item.snack}-${item.id}`} className='order-item'>
          <div>
            <img src={item.image} alt={item.name} />
          </div>
          <div>
            <h4>{item.name}</h4>
            <span>{currencyFormat(item.price)}</span>
            <div>
              <div>
                <button type='button' onClick={() => snackCartDecrement(item as SnackAdditionals)}>
                  <img src={minusImg} alt='Remover Item' />
                </button>

                <button type='button' onClick={() => snackCartIncrement(item as SnackAdditionals)}>
                  <img src={plusImg} alt='Adicionar Item' />
                </button>
              </div>
              <button type='button' onClick={() => removeSnackFromCart(item as SnackAdditionals)}>
                <FaTrashAlt />
              </button>
            </div>
            <h5>
              <span>Subtotal</span> {currencyFormat(item.subtotal)}
            </h5>
          </div>
        </div>
      ))}

      <ConfirmOrder />
    </Container>
  )
}
