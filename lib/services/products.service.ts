import { httpRequest } from '@/lib/apis/httpRequest';
import { ApiUrl } from '@/constants/api-url';
import { IProduct } from '@/types';

export const getProductsByIds = async (productIds: number[]) => {
  if (productIds.length === 0) return [];
  const { data } = await httpRequest.get(ApiUrl.GET_PRODUCT_BY_IDS, {
    params: {
      ids: productIds,
    },
  });
  return data.result as IProduct[];
};
