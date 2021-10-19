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
    return meetings.filter(el => el.live_status === 'live');
  },
});

export const upcomingMeetings = selector({
  key: 'UpcomingMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return 0;
    return meetings.filter(el => el.live_status === 'upcoming');
  },
});

export const tomorrowMeetings = selector({
  key: 'TomorrowMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return 0;
    return meetings.filter(el => el.live_status === 'finish');
  },
});

export interface meetingType {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  alarm_id: number | undefined;
  live_status: 'live' | 'finish' | 'upcoming';
}
