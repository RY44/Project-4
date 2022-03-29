# Project-4 -  O'pin

This full-stack app is a social media platform designed for sharing opinions and starting conversations with other users.

---

![App Screenshot](https://i.imgur.com/tOWVPjC.png)

---

### Brief
Build a full-stack application using a Python Django API with a PostgreSQL database and implement
a detailed plan with a wireframe and database map.

---

### Technologies
#### Front-end:
- HTML
- React
- React Router Dom
- SASS / CSS
- Blocks.css libary
- Axios
#### Back-end:
- Django 
- Django Rest-Framework 
- Python
#### Database:
- PostgreSQL
#### Development Tools:
- VS code
- Insomnia
- GitHub
- Google Chrome dev Tools
#### Planning
- Excalidraw
- QuickDBD

---

### Project Info
- Timeframe: 1 week 
- Project type: Solo code

---

## Process
### Plan
- I began my planning stage with my wireframe, using Excalidraw to make it and went page by page, drawing out the navigation and features I wanted to add. 
- For the database plan, I used QuickDBD and was able map out my tables and their relationships.

---

#### Excalidraw Wireframe
![App Screenshot](https://i.imgur.com/oSXkXfq.png)

---

#### QuickDBD map
 ![App Screenshot](https://i.imgur.com/3zb1tZ8.png)

---

 ### Back-end
 - Started by setting up Django with all dependencies and linking up my database.
 - Made 4 "apps" in total; post, conversation, comment and authentication as well as the models, views and serializers associated.
 - Created the series of one to many relationships between the "apps". 
    - The user will make one of many posts which can have many conversations. Each conversation can have many comments. 
 
---

 *Code snippet for populating conversation* 
 
 ![App Screenshot](https://i.imgur.com/FtTFJKR.png)

- The comment model uses a foreign key to create the one-to-many relationship and will show all comments relating to a specified conversation when querying. The name of the key is determined by the related_name.

---

*Code snippet for comment model*

![App Screenshot](https://i.imgur.com/xGepky5.png)

---

 - For the Auth "app", it inherits the AbstractUser class in the model. Was also able to add in password confirmation functionality inside the serializer. 
 - Overwritten the default User model by going into settings.py and adding "AUTH_USER_MODEL = 'jwt_auth.User'.
 - Went on to implement secure routes using "IsAuthenticatedOrReadOnly" from the Django rest-framework.
 - Fully tested all the functionality of the backend using Insomina, such as making various requests and using secure routes by adding an auth header with a bearer token that is generated when a user logs in.
 
---

 *Code example for Post views*

![App Screenshot](https://i.imgur.com/IVYC7DR.png)

---

### Front-end
- The front-end was started by creating a React app and setting up my folder structure. After importing all the components to App.js, I used BrowserRouter, Routes, and Route from react-router-dom to add dynamic routing.

---

![App Screenshot](https://i.imgur.com/jGZbecu.png)

---

#### Discover page
- Created the discover page by using axios to make a GET request from my backend and save to state.
- Made a function onePost that uses math.random to acquire one post from state and displays it in JSX.
- Created 3 buttons
    - One with an eventListener to skip to the next post, which recalls onePost.
    - One for starting a convo that uses the post id from state to make a POST request and navigates to the convo page.
    - One for making a post that uses useNavigate.

---

#### Authentication pages
- Created the auth pages using the blocks.css library inputs.
- Added form error handling.
- Uses onChange on inputs to write to state, which is then sent in a POST request when the form is submitted.
- Function on the login page that sets the token to local storage, which is then used when accessing secure routes.

---

*Code example for authentication helpers*

![App Screenshot](https://i.imgur.com/nooFR1y.png)

---

#### Convo page
- Uses useParams from navigation in a GET request in order to fetch data on that convo.
- A map array method is then used to display the messages to JSX.
- Input for adding new comments to the convo (Uses same logic as on auth pages).
- Button for deleting convo.

---

![App Screenshot](https://i.imgur.com/qhNoPfg.png)

---

#### My convos page
- Makes a GET request to API to fetch all of the logged in users conversations and displays on JSX using a Map method
- Each displayed element is a clickable link to that specific convo page 

---

*Code example of getCurrentUser* 

![App Screenshot](https://i.imgur.com/z4i8FDX.png)
- Used throughout the app where the currentUser data is required

---

#### Make Post page
- Another form page that sends a POST request to the API to appear on the discover page.

---

## Reflection
### Key learning
- Gained confidence in my ability to work alone and manage my own work schedule.
- Developed good system of setting daily acheivable goals.
- Developed familiarity with using Django and Python.

---

### Challenges
- Initially struggled with using Django as I had only had experience using Express prior.
- Underestimated the time frame required to implement all the features I wanted.

---

### Known issues / Bugs
- User can see posts made by themselves despite going through a filter function.

---

### Future Features
- Uploading images with posts
- Profile page
- Like/dislike functionality