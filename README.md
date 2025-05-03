# ServiceNow Shadcn UI Kit Demo Template

This is a template for a react app which can encorporate both tailwind and shadcn/ui and be installed onto a servicenow instance. This template follows the procedure set out by [ServiceNow React App](https://github.com/elinsoftware/servicenow-react-app]). Please make sure you have looked over this repository and are familiar with how it works.

This repo also demonstrates how to use compnents supplied by the [sn-shadcn-kit package](https://www.npmjs.com/package/sn-shadcn-kit)

To use this template and connect it to a specific ServiceNow instance:
- Clone the repo
- Create a .env file in the root folder with the following entries. This will allow you to connect to an instance from the dev server 
  - VITE_REACT_APP_USER - ServiceNow user name to 
  - VITE_REACT_APP_PASSWORD - ServiceNow user password
  - VITE_DEV_URL - The full url of the ServiceNow instance you want to connect to 
  - VITE_TOKEN_PATH - the relative api path for your token endpoint (e.g. /api/react/get_token)

Once you have you instance connected, spend some time exploring the repo:
- Tailwind (V4) example components are kept in the components/tailwind. You can view these on the Tailwind page.
- Shadcn example components are kept in the components/shadcn folder. You can view these on the Shadcn/ui page.
- ServiceNow shadcn kit are in use on the Servicenow page. You can see how these are used in pages/servicenow.tsx

Demo Images:
![Homepage Welcome](/assets/SN%20Welcome%20Demo.png)
![Shadcn Components Demo](/assets/Sn%20Shadcn%20Demo.png)
![SnTable Demo](/assets/SN%20Table%20Demo.png)
![SnTable Cards](/assets/SnGroupDemo.png)
