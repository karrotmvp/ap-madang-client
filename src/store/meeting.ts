import { atom } from 'recoil';

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

export const codeAtom = atom<string | undefined>({
  key: 'codeAtom',
  default: undefined,
});
