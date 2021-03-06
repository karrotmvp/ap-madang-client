export const RESERVATION = {
  SUCCESS: 'success',
  FAIL: 'fail',
  COOKIE_NAME: 'reservation',
  COOKIE_EXPIRE_DATE: '2021-10-20',
  BTN_TEXT: '오픈 알림받기',
  DISABLE_BTN_TEXT: '알림받기 완료',
  INPUT_PLACEHOLDER: '이웃과 함께 하고 싶은 모임을 적어주세요. (선택)',
  DONE_PLACEHOLDER: '이미 알림을 신청했어요. 조금만 기다려주세요!',

  TITLE1: ' 이웃과',
  TITLE2: '온라인에서 해볼까?',
  SUB_TITLE:
    '온라인으로 이웃과 함께 하는 모임 서비스를 오픈 준비 중이에요. 원하는 모임이 있다면 적어주세요.',
  ROTATE_TITLE: ['새벽공부', '미라클모닝', '퇴근후수다', '육아수다'],
  INFO_TEXT: `알림 신청하면 서비스 오픈 당일 알림으로 바로 알려드릴게요.`,

  MODAL: {
    SUCCESS_TITLE: '알림받기 완료',
    SUCCESS_TEXT: '알림을 신청했어요. 온라인 모임이 열리면 알려드릴게요.',
    FAIL_TITLE: '알림신청 실패',
    FAIL_TEXT: '알림 신청에 실패했어요. 다시 시도해주세요.',
  },
};

export const LANDING = {
  NAVIGATOR_TITLE: '랜선동네모임',
  CURRENT_MEETING: '지금 바로 모임에\n참여해보세요',
  UPCOMING_MEETING: '오늘 참여할 수 있는 모임',
  UPCOMING_MEETING_01: '오늘',
  UPCOMING_MEETING_02: '개 모임이 남아있어요',
  TOMORROW_MEETING: '미리 보는 내일 모임',
  START_MEETING_LATER: ' 후 모임이 시작돼요',
  CURR_MEETING_SUB_TITLE: '지금 바로 모임에서 동네 이웃들과 대화를 나눠보세요!',
};

export const COMMON = {
  NEW_ALARM_MODAL: {
    TITLE: '알림 신청 완료',
    TEXT: '모임이 시작되면 알림으로\n바로 알려드릴게요.',
  },
  DELETE_ALARM_MODAL: {
    TITLE: '선택한 모임의 시작 알림을\n해제하시겠어요?',
    SUB_TITLE: '알림받기를 해제하면 모임이\n시작될 때 알림을 받을 수 없어요.',
    DONE_DELETE: '알림이 해제되었어요.',
    CLOSE: '닫기',
    DELETE: '해제하기',
  },
};

export const CREATE_MEETING = {
  NAVIGATOR_TITLE: '모임 만들기',
};

export const MY_PAGE = {
  NAVIGATOR_TITLE: '마이페이지',
};

export const SUGGESTION = {
  NAVIGATOR_TITLE: '모임 의견내기',
  SUBMIT_BUTTON: '의견 전달하기',
  CONFITM_BUTTON: '확인',
  TELL_ME_NEW_MEETING: '개설하고 싶은 모임을 말해주세요.',
  NEW_MEETING_INPUT_PLACEHOLDER:
    '근처 주민들과 함께하고 싶은 모임이나 나누고 싶은 이야기를 적어주세요.',
  DONE_SUBMIT_TITLE: `소중한 이야기가\n잘 전달되었어요.`,
};

export const MEETING_DETAIL = {
  MANNER_INFO_CARD: '즐거운 랜선동네모임을 위한\n대화 매너에 대해 알아보세요',
  DESCRIPTION_TITLE1: '이런 분이면 참여해보세요!',
  DESCRIPTION_TITLE2: '이런 주제로 대화를 나눠보세요!',
  JOIN_NOW: '지금 참여하기',
  CLOSE_MEETING: '이미 종료된 모임이에요',
  JOIN_LATER: ' 후에 만나요',
  IS_VIDEO: '이 모임은 줌(zoom)으로 진행돼요. 카메라를 켜지 않아도 괜찮아요.',
  IS_VOICE: '이 모임에서는 음성으로 이웃과 실시간 대화를 나눠요.',
  MEETING_DETAIL_DESCRIPTION_TITLE: '모임 상세 설명',
  GREEN_BOX_INFO:
    '모든 모임은 줌(Zoom) 화상 회의로 진행돼요. 줌 앱을 다운로드한 후 이용해 주세요. 카메라를 켜지 않아도 괜찮아요.',
  GREEN_BOX_BTN: '줌 사용방법 보러가기',
  HOST_FOOTER_MESSAGE: '참여자 모집 중',
  MANNER_CARD: {
    TITLE: '즐거운 랜선동네모임을 위해\n함께 지켜주세요.',
    SUB_TITLE: [
      '서로 배려하고 존중해요.',
      '이웃 모두가 함께 나눌 수 있는 대화를 해요.',
      '이웃을 공개적으로 비방하지 않아요.',
      '마이크를 켜라고 강요하지 않기로 해요.',
    ],
    CLOSE: '닫기',
  },
  MANNER: {
    TITLE: '즐거운 랜선동네모임을 위해\n함께 지켜주세요.',
    SUB_TITLE: [
      {
        BOLD: '첫째, ',
        TEXT: '서로 배려하고 존댓말로 대화해요.',
      },
      {
        BOLD: '둘째, ',
        TEXT: '이웃 모두가 함께 나눌 수 있는 대화를 해요.',
      },
      {
        BOLD: '셋째, ',
        TEXT: '카메라를 켜라고 강요하지 않기로 해요.',
      },
      {
        BOLD: '넷째, ',
        TEXT: '이웃을 공개적으로 비방하지 않기로 해요.',
      },
    ],
    CLOSE: '닫기',
  },
};

export const BOTTOM_SHEET = {
  TITLE: '랜선동네모임, 이렇게 즐겨보세요',
  SUB_TITLE: [
    '랜동모는 방장 없이 동네 이웃과 다 같이 모임을 만들어가요.',
    '모임에 들어가면 먼저 자기소개를 간단하게 해주세요.',
    '새로운 이웃이 참여하면 서로 인사를 나누고 함께 대화해요.',
  ],

  JOIN: '모임 입장하기',
};

export const ZOOM_BOTTOM_SHEET = {
  TITLE: '이렇게 참여해요',
  SUB_TITLE_01: '카메라를 켜지 않아도 괜찮아요.',
  SUB_TITLE_02: '목소리만으로 모임을 즐길 수 있어요.',
  ZOOM_GUIDE: '줌 사용방법 보러가기',
};

export const NOT_SERVICE_REGION = {
  TITLE: '의 랜선동네모임은\n오픈 준비 중이에요.',
};

export const REDIRECT = {
  TITLE: '모임에 입장하는 중이에요',
  BTN_TEXT: '직접 입장하기',
  CANT_JOIN: '모임에 입장할 수 없나요? ',
  GO_HOME: '홈으로 돌아가기',
};
