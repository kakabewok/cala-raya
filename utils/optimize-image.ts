export function optimizeCloudinaryUrl(url?: string) {
    if (!url) return ""

    if (url.includes("f_auto,q_auto")) return url;

    return url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
    )
}