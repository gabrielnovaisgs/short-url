import api from "./api";
import {  CreateShortUrlResponseDto} from "@shorturl/shared";

export async function createShortUrl(url: string) {
  const resp = await api.post<CreateShortUrlResponseDto>("/short-url", { url });
  return resp.data;
}