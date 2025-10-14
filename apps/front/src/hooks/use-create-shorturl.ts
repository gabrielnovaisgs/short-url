import { useMutation } from "@tanstack/react-query";
import { createShortUrl } from "../api/create-shorturl.api";

export function useCreateShortUrl() {
    return useMutation({
        mutationFn: async (url: string) => createShortUrl(url),  
    })
}