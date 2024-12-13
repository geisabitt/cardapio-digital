import { FaTrashAlt } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'
import { ConfirmOrder } from '../../../../components/OrderCloseAction/ConfirmOrder'
import { currencyFormat } from '../../../../helpers/currencyFormat'

import plusImg from '../../../../assets/circle-plus.svg'
import minusImg from '../../../../assets/circle-minus.svg'

import { Container } from './style'
import { SnackAdditionals } from '../../../../interfaces/Snack'

export function TableDesktop() {
  const { cart, removeSnackFromCartByIndex, snackCartDecrementByIndex, snackCartIncrementByIndex } =
    useCart()

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
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td>
                <h4>{item.name}</h4>
                <span>{currencyFormat(item.price)}</span>
                <h4>Complementos</h4>
                {/* Mapeando os adicionais e exibindo-os */}
                {item.additionals && item.additionals.length > 0 ? (
                  <ul>
                    {item.additionals.map((additional, idx) => (
                      <li key={idx}>
                        {additional.name} - {currencyFormat(additional.price)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>Sem adicionais</span>
                )}
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => snackCartDecrementByIndex(index)}>
                    <img src={minusImg} alt='Remover Item' />
                  </button>

                  <button type='button' onClick={() => snackCartIncrementByIndex(index)}>
                    <img src={plusImg} alt='Adicionar Item' />
                  </button>
                </div>
              </td>
              <td>
                <h5>{currencyFormat(item.subtotal)}</h5>
              </td>
              <td>
                <button type='button' onClick={() => removeSnackFromCartByIndex(index)}>
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
