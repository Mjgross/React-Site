export const AUTH_TOKEN = 'auth-token';
export const MAX_PAGE_SIZE = '1080px';
export const PROJECT_NAME = "React-Site-Project";

export function baseUrl() {
    var base_url = "/";
    if (PROJECT_NAME)
        base_url = "/" + PROJECT_NAME + "/";
    return base_url;
}