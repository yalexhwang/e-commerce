# HydroSource

HydroSource is a water delivery subscription service that I made up for an eCommerce website project.
A unique feature is the water intake calculator, which gives the ideal amount of water to be consumed, 
given the user's weight and desired hydration level. <i>Developed as a MVC Single Page Application, using MEAN stack.</i>

<link>www.yalexhwang.com/hydrosource</link>

##Technologies & Frameworks 
- HTML
- CSS/SASS
  - Compass
- Bootstrap, UI Bootstrap
- JavaScript
- AngularJS
  - ngRoute, ngCookies
- Node.js
  - Express
  - bcrypt
- MongoDB
  - Mongoose


##API 
- Stripe: a platform for online payments (https://stripe.com/docs)


##Basic Functionality
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

##Problems Solved
- **Sign in and out status**
a token is used to determine sign in/out status of user. When user sings in, a temporary token is created and stored in cookies, as well as in user's document in database. 
Every time user access a new page, token from cookies and from database are compared and validated. 
At first, AngularJS' factory service was used for token validation. It caused an issue with menu items in navigation bar, whose accessibility and visibility change 
depending on sign in/out status. Menu items exist in index page, outside of view, so once they are loaded initially, no changes were being reflected afterwards when view changes. 
To fix the problem, a run block was used with $rootScope.$on($locationChangeStart, ...), which validate token, determines sign in/out status that is set to a variable in $rootScope. 


###Future Implementation
- Purchase confimration E-mail
  - Automatically send a confirmation email with delivery details
- Water consumption reminder
  - Based on next delivery schedule and total amount of each supply, calculate the average rate of water consumption and notify users to keep consumption level accordingly.
- Token expiration
  - after a certain amount of user's inactivity, automatically remove the token and make user signed out.

