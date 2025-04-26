# ServiceNow React App Boilerplate

This is a boilerplate for a ServiceNow React app. It is a minimalistic app to get you started with building advanced UI/UX interfaces in React that can be hosted in ServiceNow.

![ServiceNow React App Screenshot](./img/1.png)

### Features
- React
- TypeScript
- Tailwind CSS
- Pre-configured for ServiceNow

![](https://img.shields.io/badge/ServiceNow-React-blue)

## 1. Build the application

Clone the repository and install the dependencies:
```bash
npm install
```
You can now run the application locally using:
```bash
npm run dev
```
Use the existing code as a starting point to build your own application - add any additional libraries and components you need.


## 2. Compile the application

To compile the application, run:
```bash
npm run build
```
This will create a `dist` folder with the compiled application as a single HTML file.

## 3. Host and run the application in ServiceNow

The way how to host the application in ServiceNow is very simple and straightforward:

1. Create a system property with string type and copy the content of the `dist/index.html` file into the value field of the system property.
   ![ServiceNow React App Screenshot](./img/2.png)
2. Create a Scripted REST API `GET` endpoint with the following script:
```js
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var responseBody = gs.getProperty('YOUR_SYSTEM_PROPERTY_NAME');
	response.setContentType('text/html');
	response.setStatus(200);
	response.getStreamWriter().writeString(responseBody);

})(request, response);
```
> **Note:** Make sure the endpoint does not require any authentication.

![ServiceNow React App Screenshot](./img/3.png)

That's basically it. 

Now you can now access the React application from inside ServiceNow by navigating to the Scripted REST API `GET`endpoint:

![ServiceNow React App Screenshot](./img/4.png)

## Access ServiceNow Data

The common way to access ServiceNow data is by calling ServiceNow Scripted REST APIs.

The way how your web application can access ServiceNow data is very simple:
1. GET a user's **Session Token** from ServiceNow.
2. Include a **Session Token** in all your HTTP requests.

This way ServiceNow knows who is making the request and can apply all the access controls.

### 1. Get token via REST API

Getting a session token via ServiceNow REST API is the most efficient way how your Web App can get auth info about logged in user. It is also the most secure way, because you don't need to store any credentials in your Web App.

Create a Scripted REST API and a GET resource in your ServiceNow instance with the following code:

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	response.setContentType('application/json');
	response.setBody({
		"sessionToken":gs.getSession().getSessionToken(),
		"username": gs.getUserName()
		});

})(request, response);
```
Make sure this GET resource **does not require authentication**. This is on purpose, because we want this endpoing be publicly available:

![Scripted REST API](/img/sec8.png)

Having *public* GET endpoint does not pose any security risk because we are not touching any ServiceNow data and do not provide any sensitive information. 

Here is how ServiceNow works: when you try to access this endpoint as non-authenticated user, you WILL get a session token, but it will be a **guest** session token, which does not give you access to ServiceNow data:

![Scripted REST API](/img/sec10.png)

But when you access this endpoint as an authenticated user, you will get a session token of that user:

![Scripted REST API](/img/sec11.png)

And then you can use that session token to make HTTP requests to ServiceNow REST API. ServiceNow will automatically authenticate you and give you the corresponding access to ServiceNow data.

### 2. Accessing ServiceNow Data

The way how you get access differs for development and production environments, but it is straightforward:

![schema](/img/basics.png)

Development environment setup is about establishing communication with your ServiceNow instance while building your application locally.

There are three steps: 
1. Set up Proxy
2. Provide credentials for DEV mode
3. Configure App to make HTTP calls with credentials/token

### 1. Set up Proxy
The proxy setting tells your dev server what ServiceNow instance to use for all of the HTTP calls in a development mode.

Modify `vite.config.js` file to include the URL of your ServiceNow instance:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
 
 
export default defineConfig({
  plugins: [react(),viteSingleFile()],
  server: {
    proxy: {
      '/api': 'https://elinsoftwaredemo01.service-now.com/', // YOUR ServiceNow instance URL for data requests
    }
  },
  build: {
    assetsInlineLimit: 10000000
  }
})
```
### 2. Provide credentials for DEV mode
Create `.env` file in a root folder of your project. Provide ServiceNow user account credentials in the following format:
```shell
VITE_REACT_APP_USER='username'
VITE_REACT_APP_PASSWORD='password'
```

> This is for development mode only, in production we use a different approach. No need to worry about security, username and password are not included in a production build.

### 3. Configure App to make HTTP calls with credentials/token

Install `axios` library to make HTTP calls:
```bash
npm install axios
```

Security setup should happen first thing when the app is initialized. We're doing that in `main.jsx` file even before the `<App/>` component is rendered.

Modify `main.jsx` file so it looks like this:
```javascript
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

function Container() {
  const [token, setToken] = useState('')
  useEffect(()=>{
    if (token==='') {
      if (import.meta.env.MODE === 'development') {
      const username = import.meta.env.VITE_REACT_APP_USER
      const password = import.meta.env.VITE_REACT_APP_PASSWORD
      axios.defaults.auth = {
        username,
        password,
      }
      console.log('DEV MODE - set default username and password ',axios.defaults.auth)
      setToken('dev mode')
    } else {
      axios.get('/api/x_elsr_micro_front/microfrontends/get_token') // THIS IS YOUR ENDPOINT TO GET A TOKEN
        .then( r =>{
          axios.defaults.headers['X-userToken'] = r.data.result.sessionToken
          console.log('PROD MODE - recieved ServiceNow token: ',r.data.result.sessionToken)
          setToken(r.data.result.token)
        })
    }
  }
},[])
    return (
      <>
      {token!=='' && <App/>}
      </>
    )
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Container />
    </StrictMode>,
  )

```
THe code above is self explanatory:
1. We introduced another `<Container/>` component that will be acting as a wrapper for `<App/>` component, and it will be initialized first.
2. We use `useEffect` hook to set up default username and password for all HTTP calls in development mode - we use `axios.defaults.auth` library for that.
3. In the production mode we get a token from ServiceNow and set it to `axios.defaults.headers['X-userToken']` header.
4. Once default credentials or token are set, the `<Container/>` component will render `<App/>` component.



### Making HTTP calls

Now we can make HTTP calls to ServiceNow in our `<App/>` component. We can use `axios` library for that.

Modify `App.jsx` file so it looks like this:
```javascript
import { useState, useEffect } from 'react'
import { Globe } from "./components/Globe"
import axios from 'axios'
function App() {
  const [myName, setMyName] = useState<string | null>(null)
  useEffect(()=>{
    axios.get('/api/now/table/sys_user?sysparm_query=sys_id=javascript:gs.getUserID()')
    .then(r => {
      console.log('My profile data from ServiceNow: ',r)
      setMyName(r.data.result[0].name)
    })
  },[])
  return (
    <>
      <div className="flex flex-col items-center min-h-screen relative pt-36">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 z-10 mb-12">
          ServiceNow ❤️ React !!!
        </span>
       {myName && <span className="text-center text-2xl font-semibold leading-none z-10 mb-12">
          Logged in as {myName}
        </span>}
        <Globe className="mt-68" />
      </div>
    </>
  )
}

export default App
```
This is what is happening here:
1. We use `useEffect` hook to make HTTP call to ServiceNow when the component is initialized.
2. We use `axios.get` method to make a GET request to ServiceNow. We're sending a GET request to `/api/now/table/sys_user` endpoint with `?sysparm_query=sys_id=javascript:gs.getUserID()` param. This will give us the data of the current user.
3. Once we get the data we use `setMyName` function to update the state of our component. 
4. Once the state is updated the component will be re-rendered and we will see the name of the logged in user on a screen.

![ServiceNow React App Screenshot](/img/final.png)

Once you deploy the app to ServiceNow, whoever is logged in to ServiceNow and access the app URL will see their name on the screen.

This is because we are using their session token to make the HTTP calls and ServiceNow will automatically authenticate you and give you the corresponding access to ServiceNow data:

![ServiceNow React App Screenshot](/img/final2.png) 