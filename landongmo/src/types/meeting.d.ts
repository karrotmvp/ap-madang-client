declare module 'meeting' {
  export type MeetingList = {
    id: number;
    title: string;
    image: string;
    start_time: string;
    end_time: string;
    date: string;
    alarm_id: number | undefined;
    user_enter_cnt: number;
    live_status: 'live' | 'tomorrow' | 'upcoming' | 'finish';
    is_video: boolean;
  };

  export type MeetingDetailDescription = {
    text?: string;
    recommend_user: { text: string }[];
    recommend_topic: { text: string }[];
  };

  export type MeetingDetail = {
    alarm_num: number;
    description: MeetingDetailDescription;
    meeting_url: string;
    region: string;
  } & meetingListType;
}
