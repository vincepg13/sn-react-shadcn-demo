# ServiceNow Shadcn UI Kit Demo Template

This is a template for a react app which can encorporate both tailwind and shadcn/ui and be installed onto a servicenow instance. This template follows the procedure set out by [ServiceNow React App](https://github.com/elinsoftware/servicenow-react-app]). Please make sure you have looked over this repository and are familiar with how it works.

This repo also demonstrates how to use compnents supplied by the [sn-shadcn-kit package](https://www.npmjs.com/package/sn-shadcn-kit)

## Instance Install
If you just want to see how this demo looks on your instance then you can download the ["Shadcn-Kit-Demo.xml"](/assets/Shadcn-Kit-Demo.xml) from the assets folder. 

This contains an update set which will install the scope "React - x_659318_react", as well as its global dependencies, which is what ends up being built if you follow the steps below. This way you can quickly see what the app is like directly on your instance without having to build it yourself.

The update set may complain about some errors but it will install fine. I'd only recommend installing onto a sub production instance.

Once its install visit https://<your_instance>/api/x_659318_react/react/test_app

## Local Build & Deploy

To use this template and connect it to a specific ServiceNow instance via a local build and deploy:
- Clone the repo
- Create a .env file in the root folder with the following entries. This will allow you to connect to an instance from the dev server 
  - VITE_REACT_APP_USER - ServiceNow user name to 
  - VITE_REACT_APP_PASSWORD - ServiceNow user password
  - VITE_DEV_URL - The full url of the ServiceNow instance you want to connect to 
  - VITE_TOKEN_PATH - the relative api path for your token endpoint (e.g. /api/react/get_token)
  - VITE_DEPLOY_PATH - the relative api path for your deploy enpoint so you can run "npm run deploy" to send your built app straight to the instance
  - VITE_DEPLOY_PROP - The system property containing your built application
  - VITE_FORM_DATA_API - if you would like to test the form component you can store the path to your metadata api here. (example in the section below)

Here is the scripted rest API I use with my deploy script:
```js
(function process(request, response) {
  var body = request.body.data;

  var propertyName = body.property;
  var htmlContent = body.html;

  if (!propertyName || !htmlContent) {
    response.setStatus(400);
    response.setBody({ error: "Missing property or html" });
    return;
  }

  var prop = new GlideRecord("sys_properties");
  if (prop.get("name", propertyName)) {
    prop.value = htmlContent;
    prop.update();
  } else {
    prop.initialize();
    prop.name = propertyName;
    prop.value = htmlContent;
    prop.type = "string";
    prop.description = "Auto-deployed React app";
    prop.insert();
  }

  response.setBody({ success: true, updated: propertyName });
})(request, response);
```
---
### Form Shenanigans
The form component makes use of Service Portal native endpoints. These endpoints wont work with just basic authentication so you either need to deploy the application to the instance to test, or you need to spoof the ServiceNow session token and cookie for an active session. To enable testing whilst developing without having to deploy constantly, you can make use of the following two env props:
- VITE_SPOOF_TOKEN - Your active ServiceNow session token. if you are logged into the instance go to any portal, open the chrome console, then type *window.g_ck* to get this token.
- VITE_SPOOF_COOKIE - This ones a bit trickier to get. I do it by opening a portal page, clicking on any header menu then looking for the page?id=.... network call in the network tab of the chrome console. Then go to headers > request headers and grab the cookie value from here.

Once you have these two properties set your dev environment will be able to use any of the portal based APIs without relying on basic auth. 

If you are unfamiliar with how to get form metadata from the instance, create a scripted API call in the global scope and set the relative path in the VITE_FORM_DATA_API end prop mentioned above. Below is the code I run in that endpoint:

```js
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    const table = request.pathParams.table;
    const guid = request.pathParams.id;

    if (!table || !guid) {
        return sendError("400", "Table and id must be provided");
    }

	const formData = new global.GlideSPScriptable().getForm(table, guid);
	const fields = formData._fields;

	for (f in fields) {
		var field = fields[f];

		if (field.type === "glide_date") {
			if (field.value) {
				var gd = new GlideDate();
				gd.setDisplayValue(field.value);
				field.value = gd.getValue();
			}
		}

		if (field.type === "glide_date_time") {
			if (field.value) {
				var gdt = new GlideDateTime();
				gdt.setDisplayValue(field.value);
				field.value = gdt.getValue();
			}
		}
	}

	formData.react_config = {
		date_format: gs.getSession().getUser().getDateFormat()
	};

	response.setStatus(200);
	response.setBody(formData);

    function sendError(code, msg) {
       var error = new sn_ws_err.ServiceError();
       error.setStatus(code);
       error.setMessage(msg);
       return error;
   }

})(request, response);
```

---

Once you have you instance connected, spend some time exploring the repo:
- Tailwind (V4) example components are kept in the components/tailwind. You can view these on the Tailwind page.
- Shadcn example components are kept in the components/shadcn folder. You can view these on the Shadcn/ui page.
- ServiceNow shadcn kit are in use on the Servicenow page. You can see how these are used in pages/servicenow.tsx

Demo Images:
![Homepage Welcome](/assets/SN%20Welcome%20Demo.png)
![Shadcn Components Demo](/assets/Sn%20Shadcn%20Demo.png)
![SnTable Demo](/assets/SN%20Table%20Demo.png)
![SnUser Cards](/assets/SnGroupDemo.png)
![SnForm Demo](/assets/SNDemoForm.png)