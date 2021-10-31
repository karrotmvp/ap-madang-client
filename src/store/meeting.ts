import { MeetingList } from 'meeting';
import { atom, selector } from 'recoil';

export const meetingsAtom = atom({
  key: 'Meetings',
  default: [] as MeetingList[],
});

export const currMeetings = selector({
  key: 'CurrentMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return [];
    return meetings.filter(el => el.live_status === 'live');
  },
});

export const upcomingMeetings = selector({
  key: 'UpcomingMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return [];
    return meetings.filter(el => el.live_status === 'upcoming');
  },
});

export const tomorrowMeetings = selector({
  key: 'TomorrowMeetings',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    if (meetings.length === 0) return [];
    return meetings.filter(el => el.live_status === 'tomorrow');
  },
});
