const endpoints = {
  getDragons: {
    method: "GET",
    url: "/api/2014/spells",
  },
};
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function getApi(apiKey: keyof typeof endpoints) {
  const api = endpoints[apiKey];
  const fullUrl = `${baseUrl}${api.url}`;

  return {
    method: api.method,
    url: fullUrl,
  };
}
