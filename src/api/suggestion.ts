import landongmoAxios from '../util/request';

export const meetingSuggestion = async (
  text: string,
): Promise<meetingSuggestionRes> => {
  try {
    await landongmoAxios().post(`/support/opinion/`, {
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
