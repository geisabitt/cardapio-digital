import { FaTrashAlt } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'
import { ConfirmOrder } from '../../../../components/OrderCloseAction/ConfirmOrder'
import { currencyFormat } from '../../../../helpers/currencyFormat'

import plusImg from '../../../../assets/circle-plus.svg'
import minusImg from '../../../../assets/circle-minus.svg'

import { Container } from './style'

export function TableDesktop() {
  const { cart, removeSnackFromCart, snackCartDecrement, snackCartIncrement } = useCart()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Lanche</th>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td>
                <h4>{item.name}</h4>
                <span>{currencyFormat(item.price)}</span>
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => snackCartDecrement(item)}>
                    <img src={minusImg} alt='Remover Item' />
                  </button>
                  <span>{`${item.quantity}`.padStart(2, '0')}</span>
                  <button type='button' onClick={() => snackCartIncrement(item)}>
                    <img src={plusImg} alt='Remover Item' />
                  </button>
                </div>
              </td>
              <td>
                <h5>{currencyFormat(item.subtotal)}</h5>
              </td>
              <td>
                <button type='button' onClick={() => removeSnackFromCart(item)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmOrder />
    </Container>
  )
}
