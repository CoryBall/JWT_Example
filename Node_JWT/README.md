# Node.js implementation of JWT Authentication
> NOTE: This is a very basic example. There is no database being used, so any users you create will be erased when the app is stopped/restarted

Serves as a basic, self-documenting example of manually implementing JWT authentication.
There are three endpoints for demonstration:
1. http://localhost:4000/api/users/register
    - Create new user
2. http://localhost:4000/api/login 
    - Login with created user
    - Responds with JWT
3. http://localhost:4000/api/users/me
    - Send JWT in Authorization header
    - Responds with your user info based on JWT

Run locally:
```sh
npm install
npm run dev
```

Import `postman-collection.json` into Postman
- File -> Import -> Upload File -> Select postman-collection.json