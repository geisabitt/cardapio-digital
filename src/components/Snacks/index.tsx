import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { Container } from './styles'
import { currencyFormat } from '../../helpers/currencyFormat'
import { SkeletonSnack } from './SkeletonSnaks'
import { SnackData } from '../../interfaces/SnackData'
import { useCart } from '../../hooks/useCart'
import { Modal } from '../Modal'

interface SnacksProps {
  snacks: SnackData[]
}

export function Snacks({ snacks }: SnacksProps) {
  const { cart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSnack, setSelectedSnack] = useState<SnackData | null>(null)

  const handleOpenModal = (snack: SnackData) => {
    setSelectedSnack(snack)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedSnack(null)
    setIsModalOpen(false)
  }

  return (
    <Container>
      {!snacks.length
        ? [1, 2, 3, 4].map((n) => <SkeletonSnack key={n} />)
        : snacks.map((snack) => {
            const snackExistent = cart.find(
              (item) => item.snack === snack.snack && item.id === snack.id,
            )
            return (
              <div key={snack.id} className='snack'>
                {snackExistent && <span>{snackExistent.quantity}</span>}
                <h2>{snack.name}</h2>
                <img src={snack.image} alt={snack.name} />
                <p>{snack.description}</p>
                <div>
                  <strong>{currencyFormat(snack.price)}</strong>
                  <button type='button' onClick={() => handleOpenModal(snack)}>
                    <FiPlus />
                  </button>
                </div>
              </div>
            )
          })}

      {isModalOpen && selectedSnack && <Modal snack={selectedSnack} onClose={handleCloseModal} />}
    </Container>
  )
}
