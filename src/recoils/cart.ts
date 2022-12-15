import { atom, GetRecoilValue, ResetRecoilState, SetRecoilState } from 'recoil';

export class Product {
  id: number;
  price: number;
  title: string;
  description: string;
  categoryId: number;
  images: string[];
  category: Category;
  amount: number = 0;
}

export type Category = {
  id: number;
  name: string;
  images: string;
};

const cartState = atom({
  key: 'cartState',
  default: [] as Product[],
});

export const cartSelector = {
  key: 'cartState',
  get: ({ get }: { get: GetRecoilValue }) => {},
  set: ({
    get,
    set,
    reset,
    newValue,
  }: {
    get: GetRecoilValue;
    set: SetRecoilState;
    reset: ResetRecoilState;
    newValue: any[];
  }) => {},
};

export default cartState;
