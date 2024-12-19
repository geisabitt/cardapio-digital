import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Order } from '../../interfaces/Orders'
import { getOrdersId } from '../../services/api'

export default function OrderId() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        //setLoading(true);
        if (id) {
          const response = await getOrdersId(id)
          setOrder(response.data)
          console.log('id ok')
        }
        console.log('sem id')
      } catch (err) {
        console.error('Erro ao buscar pedido:', err)
        //setError('Não foi possível carregar o pedido.');
      } finally {
        //setLoading(false);
      }
    }

    if (id) fetchOrder()
  }, [id])

  return <></>
}
