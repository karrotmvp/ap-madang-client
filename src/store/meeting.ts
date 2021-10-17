import { atom, selector } from 'recoil';

export const meetingsAtom = atom({
  key: 'Meetings',
  default: [] as meetingType[],
});

export const currMeetings = selector({
  key: 'CurrentMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return 0;
    return meetings.filter(el => el.is_live);
  },
});

export const upcomingMeetings = selector({
  key: 'UpcomingMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return 0;
    return meetings.filter(el => !el.is_live);
  },
});

export interface meetingType {
  id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  is_live: boolean;
}
