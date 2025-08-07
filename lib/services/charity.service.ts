import { ApiUrl } from "@/constants/api-url";
import { httpRequest } from "@/lib/apis/httpRequest";

export const getCharities = async () => {
  const { data } = await httpRequest.get(ApiUrl.CHARITIES, {
    params: {
      page: 1,
      perPage: 100,
    },
  });
  return data?.result?.data || [];
};
