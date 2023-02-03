# Yariga
A full stack real estate application

### Things to Provide

* assets - Contains two image versions of the Logo
* links - Add below links for the font family as mentioned in design
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
```
* index.css - It has few styles for images and regarding font family
* constants - Contains some dummy data
* interfaces - Contains TypeScript types required for the components
* utils - Contains a file, ValidateForm.ts in which I have written two functions to validate form feilds 
and to check if value is changed or not while editing the property
* components - Contains a folder, chart, which has a config file for the charts that we'll create on the home page

#

### Client

Create refine app
```bash
npm create refine-app@latest client
```

Choose the config options:
* Choose a project template - refine(CRA)
* What would you like to name your project? - client
* Choose your backend service to connect - REST API
* Do you want to use a UI framework? - Material UI
* Do you want to add example pages? - Yes
* Do you want to customize the Material UI theme? - Yes
* Do you want to customize the Material UI layout? - Yes
* Do you want to add dark mode supporst? - Yes
* Do you need any Authentication logic? - Google
* Do you need i18n(Internationalization) support? - No
* Do you want to add kbar command interface support? - No
* Choose a package manager - Npm
* Would you mind sending us your choices so that we can improve superplate? - Share my choices anonymously ❤️

#### Eslint
It was tough to select both TypeScript and Airbnb style guide with eslint --init. So I manually downloaded the packages and used the same eslint config 
file we use with little modification for TypeScript support

Packages
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser
* eslint
* eslint-config-airbnb
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react
* eslint-plugin-react-hooks

Command
```bash
npm i --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

The config for TypeScript support
```javascript
extends: [
   'plugin:react/recommended',
   'airbnb',
   'plugin:@typescript-eslint/recommended',
],
parser: '@typescript-eslint/parser',
settings: {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      moduleDirectory: ['node_modules', 'src/'],
    },
  },
},
```


#### Google Auth
The only env you'll need on client side, i.e., *REACT_APP_GOOGLE_CLIENT_ID*

* Go to Google Console
* From Navigation Menu, go to APIs & Services and select OAuth consent screen
* Setup the project with name Yariga and logo
* After saving the details, go to Credentials and create OAuth 2.0 Client IDs
* For localhost, add both these in Authorized JavaScript origins & Authorized redirect URIs in same order:
  1. http://localhost:3000
  2. http://localhost
* Grad the client ID and save it in the env of the client folder. (Make sure to gitignore & hide them)


#### Notes
* Start from customizing the already exisitent screens. You can show the quick demo of the app with examples provided by Refine
* I have left the comments wherever I have changes already existing code: *// CHANGE*
* First, setup the login screen with Google Auth Key
* Second, customize the sider & header of the dashboard. For Sider links, you have to modify the resources part of App.tsx file. 
  I have left comments as *// LINK*  
* After that you can start developing each page one by one


#### Refine Notes
1. For the authentication part, right after the login, we're calling backend to save the user.
   If user already exists, we're returning that info as we need the user mongo ID to fetch profile details and in other parts!
   ```javascript
   if (profileObj) {
      const response = await fetch('https://yariga.up.railway.app/api/v1/users', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
         }),
      });
   
      const data = await response.json();
      if (response.status === 200) {
         localStorage.setItem(
            'user',
            JSON.stringify({
               ...profileObj,
               avatar: profileObj.picture,
               userid: data._id,
            }),
         );
      } else {
         return Promise.reject();
      }
   }
   ```
   Above funciton, get the email from the Google Auth and sends it to the backend. After successful response, it stores the mongodb id in localstorage with other google auth details. In any other case, it rejects the promise and stops letting user see the main dashboard screen

2. At the end of this **authProvider** function, with the Refine APIs, we're setting ther user identiy. **It's helpful when you want to get the user information anywhere in your code**. We'll be calling this **useGetIdentity** details to get the user info in the application at some places
   ```javascript
   getUserIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
         return Promise.resolve(JSON.parse(user));
      }
   },
   ```
   It'll be there in the starter generated code. We do not have to do anything other than calling that hook whenever we want!

   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/auth/useGetIdentity/)

3. useOne Hook - It is useful when you want to fetch a single record from the API. It will return the data and some functions to control the query.
   
   One of the options it takes are resources & id.
   
   **resources:** route endpoint without any forward or backward / (getPropertyDetails & getUserDetails)
   
   **id:** query parameter
   
   Ex., if the route is **_url/api/v1/users/:id_** then **_resources_** will be **_api/v1/users_** and **_id_** will be the **_:id_**
   
   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/data/useOne/)

4. useList Hook - When you need to fetch data according to sort, filter, pagination etc. from a resource, you can use useList hook. It will return the data and some functions to control the query. In short, it fetches list of data.
   
   **resources:** route endpoint to the API of getProperties & getUsers
   
   **config:** options to user various features like sort, pagination, filters, etc. For Latest Properties & Top Agent cards, we'll be using the config
   to limit the number of data we want from the backend
   
   Ex., to get only first three properties from backend
   ```javascript
   config: {
      pagination: {
         pageSize: 3,
      },
   },
   ```
   
   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/data/useList/)

5. useForm Hook - A hook that allows to manage forms. It has some action methods that create, edit and clone the form.

   **resources:** route endpoint to the create property API
   
   **action:** create option to submit the form
   
   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/useForm/)

6. useUpdate Hook - Allows to update document
   
   **resources:** - route endpoint to the update property API
   
   **id:** - id param of the property
   
   **values:** - body of the request
  
   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/)

7. Authorization Hooks
   * useLogin Hook - It authenticates the app if login method from authProvider resolves and if it rejects shows an error notification. After successful authentication it redirects the app to root.
   * useLogout Hook - It unauthenticates the app if the logout method from the authProvider resolves and if it rejects, it keeps authentication state the same.
   * useGetIdentity Hook -useGetIdentity calls the getUserIdentity method from the authProvider under the hood.
   
   Note: Code for the authentication and these hooks will be already there. We don't have to change anything

8. useDelete Hook - Allows to delete document
   
   **resources:** - route endpoint to the delete property API
   
   **id:** - id param of the property
   
   [Read more about the hook here](https://refine.dev/docs/api-reference/core/hooks/data/useDelete/)


#### Summary

* The **data provider acts as a data layer for your app that makes the HTTP requests and encapsulates how the data is retrieved**. refine consumes these methods via data hooks i.e., useList, useOne, useDelete, etc.
  ```javascript
  dataProvider={dataProvider('https://yariga.up.railway.app')} // Data Provider
  ```
* Use refine's data hooks whenever we need to fetch data from the API
* These **data hooks are connected to data provider methods internally**. The required parameters are passed to the data provider methods, and the response from the API is returned.
* These hooks use react-query mutations behind the scenes

#

### Server

Create .env file and add these envs. Make sure to gitignore and hide them

#### env

- Go to [MongoDB](https://www.mongodb.com/), signup and create a database. Make sure to copy the username and password
  ```bash
  MONGODB_URL=mongodb+srv://jsmastery:<password>@cluster0.spe8tlt.mongodb.net/?retryWrites=true&w=majority
  ```
- Go to [Cloudinry](https://cloudinary.com/), signup and navigate to dashboard to get three keys
  ```bash
  CLOUDINARY_CLOUD_NAME=*****
  CLOUDINARY_API_KEY=******
  CLOUDINARY_API_SECRET=*****
  ```

#### Why mongoose sessions?
* Mongoose sessions provide a way to start a session with MongoDB, which allows you to perform multiple operations on the database as a single transaction. 
* A transaction is a series of operations that are executed as a single unit of work, meaning that either all the operations succeed or all the operations fail.
* This is useful when you need to ensure that multiple operations are performed atomically (all or nothing) and that your data remains consistent and correct.

   Here's an example of how you might use a Mongoose session to perform a transaction:
   ```javascript
      const session = await mongoose.startSession();
      session.startTransaction();

      // Retrieve user by email
      const user = await User.findOne({ email }).session(session);
      if (!user) {
         throw new Error('User not found');
      }

      const photoUrl = await cloudinary.uploader.upload(photo);

      // Create a new property
      const newProperty = await Property.create({
         title,
         description,
         propertyType,
         location,
         price,
         photo: photoUrl.url,
         creator: user._id,
      });

      // Update the user's allProperties field with the new property
      user.allProperties.push(newProperty._id);
      await user.save({ session });

      // Commit the transaction
      await session.commitTransaction();
   ```

   In this example, we first connect to our MongoDB database using Mongoose and then start a session using *mongoose.startSession()*. 

   We then start a transaction using *session.startTransaction()*. 

   Next, we perform two operations: find the user and create a new property. 

   **If any of these operations fail, the entire transaction will be rolled back and the changes will be undone**. 

   If all the operations succeed, we commit the transaction using session.commitTransaction(). 

   Finally, we end the session using session.endSession().

   **Summary**
   * When we use transactions with Mongoose, it **ensures that all the operations are atomic** 
   * In case of any error, it will **automatically rollback all the operations**. 
   * Feature is **helpful when we have multiple operations that need to be done together and if any of them fail, we want to undo all the operations**.
   * Provide a convenient way to perform multiple operations on a MongoDB database as a single unit of work, ensuring **data consistency** and **integrity**
   * **Improve performance** by reducing the number of round trips to the database required to perform multiple operations.


#### Deploy
 
Use [Render](https://render.com/) for free server deployments
  - Create new account
  - Click on the New and select Web Service
  - Publish the repo to github
    * If repo is private:
      Connect your github account to Render
      Select the repo
    * If repo is public:
      Provide repo URL
      Mention the root folder of server, in this case it's 'server'
      Mention the command to run the server i.e., npm run server 
  - And deploy...










