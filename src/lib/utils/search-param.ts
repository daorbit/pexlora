export type SearchParamValue = string | string[] | undefined;

export const single = (value: SearchParamValue) => (Array.isArray(value) ? value[0] : value) ?? "";

export const pageParam = (value: SearchParamValue) => Math.max(1, Number.parseInt(single(value), 10) || 1);
