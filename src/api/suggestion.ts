import customAxios from '../util/request';

export const meetingSuggestion = async (
  text: string,
): Promise<meetingSuggestionRes> => {
  try {
    await customAxios().post(`/support/opinion/`, {
      body: text,
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

interface meetingSuggestionRes {
  success: boolean;
  data?: {
    id: number;
    body: string;
    created_at: Date;
  };
}
