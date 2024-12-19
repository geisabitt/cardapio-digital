import React from 'react'
import { Head } from '../../components/Head'
import { useOrders } from '../../hooks/useOrders'
import OrderCard from '../../components/Order/OrderCard'
import { Wrapper } from './styles'

const Orders: React.FC = () => {
  const { orders, loading, error } = useOrders()

  return (
    <>
      <Head title='Pedidos' />
      <Wrapper>
        <h2>Pedidos</h2>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
      </Wrapper>
    </>
  )
}

export default Orders
