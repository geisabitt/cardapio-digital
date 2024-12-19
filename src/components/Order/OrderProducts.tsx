import React from 'react'
import { currencyFormat } from '../../helpers/currencyFormat'
import { ProductContainer, ProductWrapper } from './styles'
import { OrderItem } from '../../interfaces/Orders'

interface OrderProductsProps {
  orderItems: OrderItem[]
}

const OrderProducts: React.FC<OrderProductsProps> = ({ orderItems }) => (
  <div>
    <h2>Produtos</h2>
    <ProductWrapper>
      {orderItems.map((item) => (
        <ProductContainer key={item.id}>
          <p>Nome: {item.snack.name}</p>
          <p>Quantidade: {item.quantity}</p>
          <p>SubTotal: {currencyFormat(item.subTotal)}</p>
          <ul>
            <li>
              <h4>Complementos</h4>
            </li>
            {item.orderItemAdditional.map((additionalItem, index) => (
              <li key={index + 1}>
                {additionalItem.additional.name} - {currencyFormat(additionalItem.additional.price)}
              </li>
            ))}
          </ul>
        </ProductContainer>
      ))}
    </ProductWrapper>
  </div>
)

export default OrderProducts
