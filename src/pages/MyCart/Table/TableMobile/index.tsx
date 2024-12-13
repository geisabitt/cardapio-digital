import { FaTrashAlt } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'

import { currencyFormat } from '../../../../helpers/currencyFormat'

import minusImg from '../../../../assets/circle-minus.svg'
import plusImg from '../../../../assets/circle-plus.svg'

import { Container } from './style'
import { ConfirmOrder } from '../../../../components/OrderCloseAction/ConfirmOrder'
// import { SnackAdditionals } from '../../../../interfaces/Snack'

export function TableMobile() {
  const { cart, removeSnackFromCartByIndex, snackCartIncrementByIndex, snackCartDecrementByIndex } =
    useCart()

  return (
    <Container>
      {cart.map((item, index) => (
        <div key={`${item.snack}-${item.id}`} className='order-item'>
          <div>
            <img src={item.image} alt={item.name} />
          </div>
          <div>
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
            <div>
              <div>
                <button type='button' onClick={() => snackCartDecrementByIndex(index)}>
                  <img src={minusImg} alt='Remover Item' />
                </button>

                <button type='button' onClick={() => snackCartIncrementByIndex(index)}>
                  <img src={plusImg} alt='Adicionar Item' />
                </button>
              </div>
              <button type='button' onClick={() => removeSnackFromCartByIndex(index)}>
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
