export const isEmpty = (value: unknown): value is undefined | '' | null => {
    return value === undefined || value == null || value === ''
}