# Welcome to Itsy!

Itsy is a Etsy clone where users have full CRUD on Shop, Product functions. The backend of Itsy is built on Python with a PostgreSQL database. Frontend rendering is handled with React.
Check out a live version of Itsy [here](https://itsy.onrender.com/)

## Technologies Used
<a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=aws,flask,html,js,postgres,postman,py,react,redux,javascript,gcp" />
</a>
  
## Getting started

 1. Clone this repository
 2. Install dependencies
- Backend
```bash
      pipenv install
  ```
  
 - Frontend
```bash
      npm install
  ```

3. Create a  **.env**  file based on the example with proper settings for your development environment, you should have these key in the  **.env**  file .
	 - SECRET_KEY 
	 - DATABASE_URL
	 - SCHEMA
	 - S3_BUCKET
	 - S3_KEY
	 - S3_SECRET

4. Make sure the SQLite3 database connection URL is in the **.env** file
5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed
   ```bash
   pipenv shell
   ```
   
   ```bash
   pipenv db init
   ```
   
  ```bash
   flask db migrate
   ```
   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```
6. Start the app for both backend and frontend using:


-   backend :
    -   `pipenv run flask run`
-   frontend :
    -   `npm start`
 
## Landing Page
![Screenshot 2023-08-16 at 10 43 47 PM](https://github.com/YYYWeee/Itsy/assets/63111667/25c9ae60-f2ba-4018-b368-183042ac2737)



## Sign up & Log in 

![2023-08-16 22 51 15](https://github.com/YYYWeee/Itsy/assets/63111667/b50a270d-9bff-48e1-bff1-5517f36d428d)

## Google Oauth2 Authorization

![2024-03-18 10 58 43](https://github.com/YYYWeee/Itsy/assets/63111667/5340937a-f035-4118-b39b-098425d60e74)

## Product detail page (with Image Magnifier)
![2024-04-01 11 52 53](https://github.com/YYYWeee/Itsy/assets/63111667/b6897bf7-7d0f-4c95-9f4c-b85b5dc5ff4b)

## Shop Create page

![2023-08-16 22 58 29](https://github.com/YYYWeee/Itsy/assets/63111667/af579700-c115-4ec7-b43d-2864bbb8e3d5)

## Shoopping Cart


![2023-09-11 09 33 00](https://github.com/YYYWeee/Itsy/assets/63111667/05dc37da-dddc-41af-88b5-65ef0b368bbb)

## Search Bar

![2023-09-11 09 34 24](https://github.com/YYYWeee/Itsy/assets/63111667/c623845b-3e01-434c-803b-46136e8ce9b2)



## Features
## Log-in
* Users can log in Itsy using Google account
* User can create an account on Itsy and then log-in

## Shop
* Logged in users can create a shop (every user only allow to have one shop just like Etsy)
* Users can see the shop detail information
* The shop owner is able to update the shop detail information
* The shop owner is able to remove the shop

## Product 
* An authenticated user(shop owner) can post a product to sell
* An authenticated user(shop owner) can view all products in the shop.
* An authenticated user(shop owner) can delete a product
* An authenticated user(shop owner) can modify product detail information

## Shopping Cart
* An logged in user can add items in the shopping cart
* An logged in user can view all items in the shopping cart
* An logged in user can  modify quantity of specific item in the shopping cart
* An logged in user can  delete specific item in the shopping cart

## Search bar with autocomplete search suggestion
* Enables users to quickly find and select from a pre-populated list of values as they type.
