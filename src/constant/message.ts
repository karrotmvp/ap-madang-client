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
  CURRENT_MEETING: '현재 진행중인 모임',
  UPCOMING_MEETING: '오늘 오픈예정인 모임',
  TOMORROW_MEETING: '내일 오픈예정인 모임',
};

export const SUGGESTION = {
  NAVIGATOR_TITLE: '모임 건의하기',
  SUBMIT_BUTTON: '의견 전달하기',
  CONFITM_BUTTON: '확인',
  TELL_ME_NEW_MEETING: '이웃과 함께하고 싶은 모임을 말해주세요.',
  NEW_MEETING_INPUT_PLACEHOLDER:
    '근처 주민들과 함께하고 싶은 모임이나 나누고 싶은 이야기를 적어주세요.',
  DONE_SUBMIT_TITLE: `소중한 이야기가\n잘 전달되었어요.`,
};

export const MEETING_DETAIL = {
  MANNER_INFO_CARD: '즐거운 랜선동네모임을 위한\n대화 매너에 대해 알아보세요',
  DESCRIPTION_TITLE1: '이런 분이면 참여해보세요!',
  DESCRIPTION_TITLE2: '이런 주제로 대화를 나눠보세요!',
  JOIN_NOW: '지금 참여하기',
  CLOSE_MEETING: '오늘은 종료된 모임이에요',
  JOIN_LATER: ' 후부터 참여할 수 있어요',
  GUIDE: {
    TITLE: '즐거운 랜선동네모임을 위해\n함께 지켜주세요!',
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
