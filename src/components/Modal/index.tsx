import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { SnackData } from '../../interfaces/SnackData'
import { getAdditionals } from '../../services/api'
import { Container, Overlay, ModalContainer } from './styles'
import { AdditionalGroup, Additionals } from '../../interfaces/Additionals'
import { currencyFormat } from '../../helpers/currencyFormat'

interface ModalProps {
  snack: SnackData
  onClose: () => void
}

export function Modal({ snack, onClose }: ModalProps) {
  const { addSnackIntoCart } = useCart()
  const [groups, setGroups] = useState<AdditionalGroup[]>([])
  const [selectedAdditionals, setSelectedAdditionals] = useState<{
    [groupId: string]: Additionals[]
  }>({})

  useEffect(() => {
    const fetchAdditionals = async () => {
      try {
        const response = await getAdditionals()
        const groupedAdditionals = response.data.reduce(
          (acc: Record<string, AdditionalGroup>, item: Additionals) => {
            const group = item.additionalGroup
            if (!acc[group.id]) {
              acc[group.id] = {
                id: group.id,
                name: group.name,
                maxSelect: group.maxSelect,
                items: [],
              }
            }
            acc[group.id].items.push(item)
            return acc
          },
          {},
        )

        setGroups(Object.values(groupedAdditionals))
      } catch (error) {
        console.error('Erro ao buscar adicionais:', error)
      }
    }

    fetchAdditionals()
  }, [])

  const handleToggleAdditional = (groupId: string, additional: Additionals) => {
    setSelectedAdditionals((prev) => {
      const currentGroupSelection = prev[groupId] || []
      const isSelected = currentGroupSelection.some((item) => item.id === additional.id)

      const group = groups.find((g) => g.id === groupId)

      if (!group) return prev

      if (group.maxSelect === 1) {
        return {
          ...prev,
          [groupId]: isSelected ? [] : [additional],
        }
      }

      if (isSelected) {
        return {
          ...prev,
          [groupId]: currentGroupSelection.filter((item) => item.id !== additional.id),
        }
      }

      if (currentGroupSelection.length >= group.maxSelect) {
        return prev
      }

      return {
        ...prev,
        [groupId]: [...currentGroupSelection, additional],
      }
    })
  }

  const handleAddToCart = () => {
    const additionals = Object.values(selectedAdditionals).flat()
    const additionalsTotal = additionals
      ? additionals.reduce((acc, additional) => acc + additional.price, 0)
      : 0
    const snackWithAdditionals = {
      ...snack,
      additionals,
      quantity: 1,
      subtotal: snack.price + additionalsTotal,
    }
    addSnackIntoCart(snackWithAdditionals)
    onClose()
  }

  return (
    <Container>
      <Overlay>
        <ModalContainer>
          <button className='close-btn' onClick={onClose}>
            &times;
          </button>
          <div className='header-modal'>
            <div>
              <h2>{snack.name}</h2>
              <p>{snack.description}</p>
            </div>
            <img src={snack.image} alt={snack.name} />
          </div>
          <h3>Selecione Adicionais:</h3>

          <div className='container-additionals'>
            {groups.map((group) => (
              <div key={group.id} className='additionals-group'>
                <h4>
                  {group.name} (Máx: {group.maxSelect})
                </h4>
                <div className='additionals-list'>
                  {group.items.map((additional) => (
                    <div key={additional.id} className='additional-item'>
                      <label>
                        <input
                          type='checkbox'
                          value={additional.id}
                          checked={(selectedAdditionals[group.id] || []).some(
                            (item) => item.id === additional.id,
                          )}
                          onChange={() => handleToggleAdditional(group.id, additional)}
                        />
                        {additional.name} - {currencyFormat(additional.price)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='total'>
            <strong>
              Total Adicionais:{' '}
              {currencyFormat(
                Object.values(selectedAdditionals)
                  .flat()
                  .reduce((acc, item) => acc + item.price, 0),
              )}
            </strong>
          </div>
          <div className='add-to-cart-container'>
            <button className='add-to-cart' onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
          </div>
        </ModalContainer>
      </Overlay>
    </Container>
  )
}
