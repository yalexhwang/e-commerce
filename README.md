# HydroSource

HydroSource is a water delivery subscription service that I made up for an eCommerce website project. A unique feature is the water intake calculator, which gives the ideal amount of water to be consumed, given the user's weight and desired hydration level. 

## Technologies & Frameworks 
- HTML
- CSS, SASS, Compass, Bootstrap, UI Bootstrap
- JavaScript, AngularJS
- Express.js, Node.js
- MongoDB, Mongoose
- Stripe: a platform for online payments (https://stripe.com/docs)

## Functionalities
- Create a new account (a new document, following 'user' schema, added to 'Users' collection in MongoDB database)
- Edit information in account (an existing document is updated)
- Water intake calculator
  * Accessible without signing in. Info provided and data calculated are stored in cookies, 
which will be retrieved once user is redirected to Registration page (for a new member), or become available when uesr signs in and access Account page. 
- Temporary Cart and My Cart
  * Items selected from Store are first saved in temporary Cart (accessible in navigation bar), stored in cookies.
User can view, update or reset items in temporary cart, or save the temporary Cart to My Cart (accessible in Account page) for later use or check out. 
My Cart is part of user's permanent account record, stored in the database. If unsaved temporary cart is detected 
when user access Account page, user is given an option to go back to temporary cart and save it to My Account.

##Notes
- **bcrypt (npm)** I used a Node.js library to hash a password before saving it in the database. I learned the basic concept of bcrypt, how to read a shadow password (prefix for bcrypt hash, cost parameter, salt and hash). 

- **Authentication Cookies** As a user, sign in/out status used to feel as if it was a distinct state, like on and off. While implementing it, I realized it was rather a set of actions that is initiated by one time verification of username and password, followed by creation of a token, which is used for repeated verifications on every page access (or route change, to be precise). Use of cookies is essential in the process, for it allows a token to be stored and be accessible throughout the website. Although it was technically simple implementation, it was intriguing to experience a change in the concept of sign in/out - a perspective shift from a user's to a developer's side.

- **Use of ng-show/ng-hide in navigation menu items** This was an architectural problem in using Angular router. I used ng-show/ng-hide to display or hide menu items depending on sign in/out status. The problem was that they were evaluated only once at the initial page load. To solve the problem, I added a run block .run() with $rootScope.$on. A global variable $rootScope.loggedIn was used to indicate sign in/out status and $locationChangeStart to monitor route change.

## Ideas for Future Implementation
- **Purchase confimration E-mail**: Automatically send a confirmation email with delivery details
- **Water consumption reminder**: Based on next delivery schedule and total amount of each supply, calculate the average rate of water consumption and notify users to keep consumption level accordingly.
- **Token expiration**: After a certain amount of user's inactivity, automatically remove the token and make user signed out.

