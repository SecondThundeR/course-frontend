export const filterUndefinedData = <T>(item?: T): item is NonNullable<T> => item !== undefined;
