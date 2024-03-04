# AngularHttpclientTutorial

Tutorial project to understand the concepts of ==HTTP Requests== and ==Interceptors==.

## Dependencies

- **Angular:** version 17.2.2
- **Node:** version 20.11.1


## Development server

Run `npn install` to install "node_modules" and then run `npn run start` to automatically open a tab with your browser preset for a development server.

## Topics

In these pages I talk about the project implementation and the theory behind these concepts. 

- **Peticiones HTTP:** https://hackmd.io/@Minuke/HJ35Ayfp6
- **Interceptores:** https://hackmd.io/@Minuke/HJ35Ayfp6

## About the project

In this project we make a call to the Fake Storage API to get four products (GET), we have a button to add a new product (POST) with a random image, we have an edit button (PUT) that simply changes the title of the product by a test title and a delete button (DELETE) that removes the entire product from the list of products.

In addition, there is implemented an interceptor in case the url changes or we do not write it well, to be able to handle the specific error that the API returns us.
