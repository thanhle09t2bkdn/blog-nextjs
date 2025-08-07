"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

/**
 * Get the authorization token from the cookies.
 * Get on client (cookies-next) and server (next/headers)
 * @returns The authorization token.
 */
export async function getAuthorization(): Promise<string> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken || getCookie("accessToken");
}
