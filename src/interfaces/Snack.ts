import { Additionals } from "./Additionals"
import { SnackData } from "./SnackData"

export interface Snack extends SnackData {
  quantity: number
  subtotal: number
  additionals: Additionals[]
}
export interface SnackAdditionals extends SnackData {
  quantity: number
  subtotal: number
  additionals: Additionals[]
}

