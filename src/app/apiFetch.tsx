import { notFound } from "next/navigation";

export async function fetchFromAPI<T=never>(urlSuffix: string, method: string = "GET", body: Record<string, string> = {}, headers: Record<string, string> = {}) {
    if (!process.env.BASE_URL) {
        throw new Error('No base URL provided.')
    } else if (!process.env.API_KEY) {
        throw new Error('No API key provided.')
    }

    const apiUrl = process.env.BASE_URL + urlSuffix;
    const request: RequestInit = {};
    request.headers = headers;
    request.headers["x-api-key"] = process.env.API_KEY;
    if (method === "POST") {
        request.headers["Content-Type"] = "application/json";
        request.body = JSON.stringify(body);
    }
    request.method = method;

    const res = await fetch(apiUrl, request);
    if (res.status === 200) {
        const data: T = await res.json();
        return data;
    } else if (res.status === 404) {
        notFound();
    } else {
        console.log("Unable to fetch from API");
        notFound();
    }
}
