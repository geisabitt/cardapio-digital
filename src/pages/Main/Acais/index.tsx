import { useSnack } from '../../../hooks/useSnak'
import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function Acais() {
  const { acais } = useSnack()

  return (
    <>
      <Head title='Açaí' />
      <SnackTitle>Açaí</SnackTitle>
      <Snacks snacks={acais}></Snacks>
    </>
  )
}