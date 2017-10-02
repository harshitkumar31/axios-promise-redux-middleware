<h1 align="center">axios-redux-middleware</h1>

This is a tiny redux middleware which allows you to make http requests(using axios) by dispatching actions.

## Installation

    npm install npm i axios-promise-redux-middleware --save

## Usage

### Step-1
  Add the middleware to your store

```javascript
    import { axiosPromiseMiddleware } from 'axios-promise-redux-middleware';

    const store = createStore(reducer, initialState, composeEnhancers(
      applyMiddleware(
        axiosPromiseMiddleware,
        //...middlewares,
      ),
    ));
```


### Step-2
Use it in your actions.
Example:
```javascript
    export const login = (email, password) => ({
      type: 'LOGIN',
      axios: true,// You need to specify this, if you want to make a http request
      options: { //
        url: '/login', // can be relative or absolute
        method: 'post',
        data: {
          username: email,
          password,
        },
      },
});
```
For options, refer [Axios Options](https://github.com/axios/axios#request-config)

If the http requests is successful then action with SUCCESS suffix is dispatched, else action with FAILED suffix is dispatched.


### Step 3
### Write Reducers for the actions
Example

```javascript
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../actions';

const defaultState = {

};


export default handleActions({
  [LOGIN_SUCCESS]: {
    next: (state, action) => {
      if (action.error === false) {
      	if (action.payload.user) {
      		return Object.assign({ authenticated: true }, state, action.payload.user);
      	}
      }
      return state;
    },
    throw: (state, action) => Object.assign({}, state, defaultState),
  },

```

### Acknowledgements
Inspired by [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware)
