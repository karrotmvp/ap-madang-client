import { atom, selector } from 'recoil';

export const meetingsAtom = atom({
  key: 'Meetings',
  default: [] as meetingType[],
});

