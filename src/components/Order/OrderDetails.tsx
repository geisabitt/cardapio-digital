import React from 'react'
import { currencyFormat } from '../../helpers/currencyFormat'
import { Order } from '../../interfaces/Orders'

interface OrderDetailsProps {
  order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => (
  <div>
    <h2>Pagamento</h2>
    <p>Numero do pedido: {order.id}</p>
    <p>Status do Pagamento: {order.status === 'PAID' ? 'Pago' : 'Pendente'}</p>
    <p>Valor total do pedido: {currencyFormat(order.total)}</p>
  </div>
)

export default OrderDetails
