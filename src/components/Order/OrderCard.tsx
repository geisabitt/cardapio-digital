import React from 'react'
import { Container } from './styles'
import OrderDetails from './OrderDetails'
import OrderProducts from './OrderProducts'
import OrderCustomer from './OrderCustomer'
import { Order } from '../../interfaces/Orders'

interface OrderCardProps {
  order: Order
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => (
  <Container>
    <OrderDetails order={order} />
    <OrderProducts orderItems={order.orderItems} />
    <OrderCustomer customer={order.customer} />
  </Container>
)

export default OrderCard
