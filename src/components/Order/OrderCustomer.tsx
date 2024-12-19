import React from 'react'
import { Customer } from '../../interfaces/Orders'

interface OrderCustomerProps {
  customer: Customer
}

const OrderCustomer: React.FC<OrderCustomerProps> = ({ customer }) => (
  <div>
    <h2>Cliente</h2>
    <p>Nome: {customer.fullName}</p>
    <p>Whatsapp: {customer.mobile}</p>
    <p>CEP: {customer.zipCode}</p>
    <p>Rua: {customer.street}</p>
    <p>Número: {customer.number}</p>
    {customer.complement && <p>Complemento: {customer.complement}</p>}
    <p>Bairro: {customer.neighborhood}</p>
  </div>
)

export default OrderCustomer
