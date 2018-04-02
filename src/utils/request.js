import { routerRedux, browserHistory } from 'dva/router';

export default function request(method, url, body) {
  console.log('request method ' + method + ', url ' + url + ', body ' + body)
  method = method.toUpperCase();
  if (method === 'GET') {
    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }

  return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
      },
      body
    })
    .then((res) => {
      if (res.status === 401) {
        browserHistory.push('/login');
        return Promise.reject('Unauthorized.');
      } else {
        const token = res.headers.get('access-token');
        if (token) {
          sessionStorage.setItem('access_token', token);
        }
        console.log('token ' + token)
        return res.json()
      }
    });
}

export const GET = url => request('GET', url);
export const POST = (url, body) => request('POST', url, body);
export const PUT = (url, body) => request('PUT', url, body);
export const DEL = (url, body) => request('DELETE', url, body);