import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return [
        { url: base },
        { url: `${base}/pricing` },
        { url: `${base}/about` },
        { url: `${base}/contact` },
        { url: `${base}/help` },
        { url: `${base}/login` },
        { url: `${base}/register` },
        { url: `${base}/terms` },
        { url: `${base}/privacy-policy` },
    ];
}