
export interface Additional {
  id: number;
  name: string;
  price: number;
}

export interface OrderItemAdditional {
  id: number;
  additional: Additional;
  quantity: number;
  subTotal: string;
}

export interface Snack {
  id: number;
  name: string;
  image: string;
}

export interface OrderItem {
  id: string;
  snack: {
    name: string;
    image: string;
  };
  quantity: number;
  subTotal: number;
  orderItemAdditional: OrderItemAdditional[];
}

export interface Customer {
  fullName: string;
  mobile: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  transactionId: string;
  customer: Customer;
  orderItems: OrderItem[];
}

export interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
}
