export const toQuery = (params: { [x: string]: any; size?: number; page?: number; sort?: string; }, delimiter = '&') => {
  const keys = Object.keys(params);
  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < (keys.length - 1)) {
      query += delimiter;
    }

    return query;
  }, '');
}
