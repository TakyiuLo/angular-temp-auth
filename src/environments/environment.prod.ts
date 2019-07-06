export const environment = {
  production: true
};

const apiUrls = {
  production: "https://sheltered-fortress-64728.herokuapp.com",
  development: "http://localhost:4741"
};

const apiUrl = environment.production
  ? apiUrls.production
  : apiUrls.development;

export default apiUrl;
