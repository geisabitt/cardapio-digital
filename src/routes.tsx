import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import AcaisPage from './pages/Main/Acais'
import MyCart from './pages/MyCart'
import Payment from './pages/Payment'
import Orders from './pages/Admin'
import OrderId from './pages/OrderId'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<AcaisPage />} />
      </Route>
      <Route path='/admin' element={<Orders />}></Route>
      <Route path='/pedido/:id' element={<OrderId />}></Route>
      <Route path='/cart' element={<MyCart />}></Route>
      <Route path='/payment' element={<Payment />}></Route>
    </Routes>
  )
}
//.docker node_modules public src src/assets src/components src/components/EmptyCart src/components/Head src/components/Modal src/components/Modal/index.tsx src/components/Modal/styles.ts src/components/MyOrder src/components/MyOrder/index.tsx src/components/MyOrder/styles.ts src/components/OrderCloseAction src/components/OrderCloseAction/ConfirmOrder src/components/OrderCloseAction/PayOrder src/components/OrderCloseAction/PayOrder/index.tsx src/components/OrderCloseAction/style.ts src/components/OrderHeader src/components/Sidebar src/components/Sidebar/index.tsx src/components/Sidebar/styles.ts src/components/Skeleton src/components/Snacks src/components/Snacks/SkeletonSnaks src/components/Snacks/index.tsx src/components/Snacks/styles.ts src/components/SnackTitle src/components/SnackTitle/index.tsx src/components/SnackTitle/styles.ts src/components/.keep src/contexts src/contexts/AdditionailsContext.tsx src/contexts/CartContext.tsx src/contexts/SnacksContexts.tsx src/helpers src/helpers/currencyFormat.ts src/helpers/snackEmoji.ts src/hooks src/hooks/useCart.tsx src/hooks/useSnak.tsx src/interfaces src/interfaces/CustomerData.ts src/interfaces/Snack.ts src/interfaces/SnackData.ts src/pages src/pages/Main src/pages/Main/Acais src/pages/Main/Burgers src/pages/Main/Burgers/index.tsx src/pages/Main/Burgers/style.ts src/pages/Main/Drinks src/pages/Main/IceCream src/pages/Main/Pizzas src/pages/Main/index.tsx src/pages/Main/styles.ts src/pages/MyCart src/pages/MyCart/Table src/pages/MyCart/Table/TableDesktop src/pages/MyCart/Table/TableDesktop/index.tsx src/pages/MyCart/Table/TableDesktop/style.ts src/pages/MyCart/Table/TableMobile src/pages/MyCart/Table/TableMobile/index.tsx src/pages/MyCart/Table/TableMobile/style.ts src/pages/MyCart/Table/index.tsx src/pages/MyCart/index.tsx src/pages/MyCart/styles.ts src/pages/Payment src/services src/services/api.ts src/styles src/App.test.tsx src/App.tsx src/index.tsx src/react-app-env.d.ts src/reportWebVitals.ts src/routes.tsx src/setupTests.ts .editorconfig .env .env.example .eslintrc.json .gitignore .prettierrc .tool-versions db.json package-lock.json package.json tsconfig.json
