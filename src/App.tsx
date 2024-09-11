import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'

import { Theme } from './styles/Theme'
import { GlobalStyle } from './styles/global'
import { Normalize } from 'styled-normalize'
import { SnackProvider } from './contexts/SnacksContexts'

export default function App() {
  return (
    <BrowserRouter>
      <Theme>
        <SnackProvider>
          <AppRoutes />
          <GlobalStyle />
          <Normalize />
        </SnackProvider>
      </Theme>
    </BrowserRouter>
  )
}
