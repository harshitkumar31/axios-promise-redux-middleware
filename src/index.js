import axios from 'axios';

const hasAxiosKey = val => val && typeof val.axios === 'boolean';
const handleAxios = val => val && val.axios === true;


export const axiosPromiseMiddleware = store => next => (action) => {
  const { dispatch } = store;
  if (hasAxiosKey(action) && handleAxios(action)) {
      /* let method = null;
      switch (action.method) {
        case 1: { method = axios.get;
          break;
        }
        case 2: { method = axios.post;
          break;
        }
        default: { method = axios.get;
          break;
        }
      }*/
    return new Promise((res, rej) => {
      axios(action.options)
      .then((response) => {
        const result = Object.assign({}, action, { payload: response.data, axios: false, type: `${action.type}_SUCCESS`, error: false });
        res(result);
        return dispatch(result);
      }).catch((error) => {
        const result = Object.assign({}, action, { payload: error, axios: false, type: `${action.type}_FAILED`, error: true });
        rej(result);
        return dispatch(result);
      });
    });
  }
  return next(action);
};
