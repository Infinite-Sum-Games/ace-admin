import { atom } from 'recoil';

export const filterState = atom({
  key: 'filterState', 
  default: 'This Year',
});
