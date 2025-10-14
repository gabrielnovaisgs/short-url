import api from "./api";
export interface ShortUrlResponse {
    shortedUrl: string;
    id: number;
}

export async function createShortUrl(url: string) {
const resp = await api.post<ShortUrlResponse>("/short-url", { url });
return resp.data;
}