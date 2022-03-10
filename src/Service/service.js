// Consultas a API de Trívia
import md5 from 'crypto-js/md5';

const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const data = await fetch(tokenURL);
  const response = await data.json();
  return response.token;
};

export const getQuestions = async ({ response_code: resposeCode, token }) => {
  if (resposeCode === 0) {
    const urlRequest = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const data = await fetch(urlRequest);
    const response = await data.json();
    return response;
  }
  const { token: tokenTwo } = await getToken();
  const urlRequest = `https://opentdb.com/api.php?amount=5&token=${tokenTwo}`;
  const data = await fetch(urlRequest);
  const response = await data.json();
  return response;
};

export const getGravatar = async (email) => {
  const hash = md5(email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
  const data = await fetch(gravatarURL);
  return data.url;
};

export const saveTokenLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};
