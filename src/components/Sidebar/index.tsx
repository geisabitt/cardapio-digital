import { Container } from './styles'
import { NavLink } from 'react-router-dom'
import { ReactComponent as BurguerIcon } from '../../assets/burger.svg'
import { ReactComponent as IceCreamIcon } from '../../assets/ice-cream.svg'
import { ReactComponent as PizzaIcon } from '../../assets/pizza.svg'
import { ReactComponent as SodaIcon } from '../../assets/soda.svg'
import menuImg from '../../assets/menu.svg'
import { useState } from 'react'

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <Container isMenuOpen={menuOpen}>
      <button type='button' onClick={handleToggleMenu}>
        <img src={menuImg} alt='Icone para Abrir e Fechar Menu' />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>
              <IceCreamIcon />
              <span>Açaí</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
