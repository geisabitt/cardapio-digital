export interface Additionals {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  additionalGroupId: string;
  additionalGroup: AdditionalGroup

}

export interface AdditionalGroup {
  id: string;
  name: string;
  maxSelect: number;
  items: Additionals[];
}
