# Group 07

CS_546 - Final Project
Finding Room-mate Web Application

Team Members:

● Rahul Pawar
● Abhishek Desai
● Anish Subedi
● Keyur Senjalia
● Mehta Nimtrakul

Introduction:

As an international student, it is very difficult to find roommates and an apartment to live in. This application will help many students find a proper roommate, such as someone who attends the same university or someone who shares the same major. This platform will provide the contact information of users(if they allow it) to other users so they can contact each other via the built-in messaging system or call, to find out additional details about the university or apartments nearby. Users can post the roommate request, other users can comment on that post or can chat via messaging and also multiple users can form a group together for chatting. We are developing this platform to avoid the hassle of finding a roommate. Also, this platform will help the students to get inside information about the university from the current student of that particular university to figure out if the university is a good fit for them.

Motivation:

As most of us from this project team are international students, we have been through the hassle of finding a place to live in, only to end up with an unknown roommate. There are some platforms that students use like Whatsapp groups, but only 250 members can join a group, which makes it unfair for others who also want to join. Facebook is also there but it is not specific and not all the students use Facebook for such a purpose. Yocket is one platform, where you can get in touch with current students of a particular university, but again it just solves one issue. We want to develop a single platform to address all the issues of the students.

Core Features:

1. Landing page
   ● Users can see the posted request from other users.
   ● Users can post their request.

The posts on the landing page include useful information from the user such as the date the request was posted, the city the post originated from and the university nearby the apartment. Not only do these posts include the time, date, and university, but there are also living preferences listed on these posts. Some of these living preferences include if there is parking available, if there are pets allowed in the building, if the poster allows sharing, the budget for the apartment, and other various descriptions. All users have the option to make posts and fill out these details and preferences. Under the "Make Post" tab, a user can either choose to make a post to find a room, or find a roommate for their apartment.

2. Search roommate by university
   ● Users can see the available student as a roommate from the same
   university.
   ● Users can see their profile and can message them.

After a user has signed up, they can click on the “Find” tab and the "Find by University" button to browse posts associated with a university of their choice. There, they can look through details of posts for a specific university to figure out if they are interested in moving in or allowing someone else to live with them.

3. Search roommate by city
   ● Users can see the available student as a roommate from the same city.
   ● Users can see their profile and can message them.

After a user has signed up, they can click on the “Find” tab and the "Find by City" button to browse posts associated with a city of their choice. There, they can look through details of posts for a specific city to figure out if they are interested in living with people who are in the area.

4. User Profile
   ● Every user need to create profile page, where they need to fill form, which contains:
   A. Username
   B. Password
   C. Security Question
   D. First Name
   E. Last Name
   F. Email
   G. University name
   H. City
   I. State
   J. Age
   K. Gender
   L. Native Country
   M. An optional profile picture.

When users click the “Sign Up” button on the landing page, they are redirected to /signup and prompted to fill out the information provided above. If they already have an account they can click the link under the “sign up” button to be redirected to the login page. .

5. In-built messaging
   ● Users can message other users.
   ● Multiple users can be messaged at once.

When users are browsing posts from other users, they have the option to view the entire post with the “Click here to view this whole post!” button. Once the user clicks on this, they can view the individual post while also having the options to send a message to the original poster or posting a comment for other people to see. Users can see previous comments submitted by other users on this page. These individual comments display the username of the comment poster and the date.

## Github Link: https://github.com/rahulpawar166/Group_07
#### Mandatory Steps to Use Website
1. Make sure there is internet connection, this is necessary for the data on our website.
2. Pull code from the main branch of the repository.
3. Use “npm install” in the terminal to install our dependencies 
4. Seed database by running “cd tasks” -> “node seed.js” or use command “npm seed”
5. Run the “npm start” command to start the server. 
6. Navigate to http://localhost:3000 to be redirected to our home page.

####  Roomie homepage (http://localhost:3000)
1. The navigation bar contains a link to the home page, an “About Us” page, a Login page, and a “Sign Up” page.
2. By clicking on the “Roomie” button or “Home” button, the user is redirected to the home page that displays posts from different users. 
3. By clicking on the “About Us” button, the user will be redirected to the About Us page where the Roomie application is explained. This is located at the URL: http://localhost:3000/aboutUs 
4. By clicking on “Login” the user is redirected to the Login page at the URL: http://localhost:3000/login. The user can log in with their existing account and is redirected to the home page. If the login does not exist in the database, the user is prompted to retype their credentials. In the case that the user has forgotten their password, they can click on the “Forgot password” button to be redirected to http://localhost:3000/forgot to answer a security question and update their password. In the case that they do not have an account, Users can click the “Need to register? Click here to sign-up” in order to register. This redirects them to http://localhost:3000/signup . 
5. By clicking on the “Sign Up” button, the user is redirected to http://localhost:3000/signup and prompted to fill in their account information. If the user is missing fields or entering inputs of wrong data types, the website prompts them to fill the fields out correctly. If the data is entered correctly, they are redirected to the Login page. 
6. By clicking on the Profile button on the navigation bar, users are redirected to http://localhost:3000/private/profile and are able to edit their profile, redirecting them to http://localhost:3000/private/profile/edit in order to update their account. Users are also able to see all of their posts by clicking on the “My Posts” button, redirecting them to http://localhost:3000/private/findPost/searchbymyPost. 
7. By clicking on the “Make Post” button, users are able to make a post based on whether they want to find an apartment, or a roommate for their apartment by choosing an option in a drop-down menu. These options lead to the routes  http://localhost:3000/private/postRoom and http://localhost:3000/private/postRoomate based on whether they want a roommate or a room. http://localhost:3000/private/postRoom allows you to fill out preferred properties of the room as well as personal preferences. http://localhost:3000/private/postRoomate allows you to post information about the user’s apartment and roommate preferences.
8. By clicking on the Find button, users are able to search for posts based on Universities and cities in a dropdown with the options “Find by City” and “Find by University.” Both of these routes http://localhost:3000/private/findPost/searchbyCity and http://localhost:3000/private/findPost/searchbyschoolName allow the user to select their school or city to view all posts associated with them. 
9. By clicking on the Contact Us button the user is redirected to http://localhost:3000/private/contactUs and is able to send a message to the developers. 
10. By clicking on the Logout button, the user is redirected to the home page at http://localhost:3000/. 
 
Extra Features:
Getting contact details of current university students.
Users can hide their contact information.
Users can report other users.
Users can comment below the posted post.


