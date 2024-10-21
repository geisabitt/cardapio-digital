import { Outlet } from 'react-router-dom'
import { Container } from './styles'
import { Head } from '../../components/Head'
import { OrderHeader } from '../../components/OrderHeader'
import { Table } from './Table'

export default function MyCart() {
  return (
    <Container>
      <Head title='Carrinho' />
      <OrderHeader />
      <Table />
    </Container>
  )
}
