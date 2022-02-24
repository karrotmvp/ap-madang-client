declare module 'meeting-v2' {
  export type MeetingList = {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    date: string;
    live_status: LiveStatus;
    is_video: boolean;
    host: HostInfo;
    is_host: boolean;
    description_text: string;
    agora_user_list: AgoraUserType[];
    meeting_url: string;
    share_code: string;
  };

  export type AgoraUserType = Pick<
    HostInfo,
    'id' | 'nickname' | 'profile_image_url'
  >;

  export type LiveStatus =
    | 'live'
    | 'tomorrow'
    | 'upcoming'
    | 'finish'
    | 'today';

  export type HostInfo = {
    id: number;
    nickname: string;
    profile_image_url: string;
    manner_temperature: null | number;
    region_name: string;
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

  export type TimeType = {
    start_time: string;
    end_time: string;
  };

  export type CreateMeeting = {
    title: string;
    description: string;
    type: undefined | 'video' | 'audio';
    date: string;
    time: TimeType;
    image: File | null;
  };
}
