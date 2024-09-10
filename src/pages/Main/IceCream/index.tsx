import { useEffect, useState } from 'react'
import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'
import { getIceCreams } from '../../../services/api'
import { SnackData } from '../../../interfaces/SnackData'

export default function IceCream() {
  const [iceCream, setIceCream] = useState<SnackData[]>([])
  useEffect(() => {
    ;(async () => {
      const iceCreamRequest = await getIceCreams()
      setIceCream(iceCreamRequest.data)
    })()
  }, [])
  return (
    <>
      <Head title='Sorvetes' />
      <SnackTitle>Sorvetes</SnackTitle>
      <Snacks snacks={iceCream}></Snacks>
    </>
  )
}
