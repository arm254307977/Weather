export const configGet = (url: string) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {}
  };
};