import { ApiUrl } from '@/constants/api-url';
import { httpRequest } from '@/lib/apis/httpRequest';

export const getConfigCharityPercent = async () => {
  const { data } = await httpRequest.get(ApiUrl.CHARITY_PERCENT);
  return data?.result;
};
