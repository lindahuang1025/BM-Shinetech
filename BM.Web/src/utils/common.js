export const isJsonFormat = (params) => {
    try {
        JSON.parse(params);
    } catch (error) {
        return false;
    }
    return true;
}