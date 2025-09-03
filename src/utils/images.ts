export function getImgUrl(filePath: string) {
    return new URL(filePath, import.meta.url).href
}