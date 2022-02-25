import { getAgoraCode } from '@api/agora';
import { MeetingList } from 'meeting-v2';
import { atom, selector } from 'recoil';

import { userInfoAtom } from './user';

type DescriptionType = {
  text?: string;
  recommend_user?: { text: string }[];
  recommend_topic?: { text: string }[];
};

export type CreateMeetingType = {
  title?: string;
  description?: DescriptionType;
  is_video?: boolean;
  date?: string;
  start_time?: string;
  end_time?: string;
};

export const createMeetingAtom = atom<CreateMeetingType>({
  key: 'CreateMeetingAtom',
  default: {},
});

export const meetingsAtom = atom<MeetingList[]>({
  key: 'MeetingsAtom',
  default: [],
});

export const detailMeetingIdAtom = atom<number | undefined>({
  key: 'DetailMeetingIdAtom',
  default: undefined,
});

export const meetingDetailSelector = selector({
  key: 'meetingDetailSelector',
  get: ({ get }) => {
    const meetings = get(meetingsAtom);
    const detailMeetingId = get(detailMeetingIdAtom);

    const foundMeetingDetail = meetings.find(
      meeting => meeting.id === detailMeetingId,
    );

    return foundMeetingDetail;
  },
});

export const codeSelector = selector({
  key: 'codeSelector',
  get: async ({ get }) => {
    const meetingId = get(detailMeetingIdAtom);
    const userInfo = get(userInfoAtom);
    if (!meetingId || !userInfo) return undefined;
    const code = await getAgoraCode(meetingId.toString());
    return code.data?.code;
  },
});
