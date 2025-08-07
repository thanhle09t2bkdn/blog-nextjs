import { ApiUrl } from "@/constants/api-url";
import { httpRequest } from "@/lib/apis/httpRequest";

function getCurrentDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

export const uploadImage = async (
  imageFile: File,
  folder = ""
): Promise<string | null> => {
  const formData = new FormData();

  formData.append("folder", folder ? folder : getCurrentDate());
  formData.append("image", imageFile);

  const rs = await httpRequest.post(ApiUrl.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return rs?.data?.url;
};
