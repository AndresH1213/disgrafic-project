# Disgrafic

Full-Stack project, built using Angular on the Frontend and Serverless Framework as a platform for declaring the infrastructure-as-code. The backend is running on AWS Lambda Functions written in Python. Designed to showcase the building of modern, scalable and resilient web applications base on cloud.

The frontend is designed with lazy loading techniques for efficient loading of components, ensuring smooth user experience.

The application connects to the backend through services, which have been optimized for efficient handle of data return by our AWS Lambdas. In the project you can find the resources (infrastructure as code) that we declare using Serverless Framework in `backend/resources/*`

# Architecture

For the frontend, we have chosen to host it in Amazon S3, which is a highly scalable and cost-effective storage solution for static content.

Amazon API Gateway exposes the backend which provides a scalable and flexible way to manage incoming traffic. Backend is built using AWS Lambdas, which provides us with a highly available and scalable infrastructure to manage incoming requests and to handle that Dynamodb is the database (No-SQL).

To secure the API Gateway, Lambda authorizer for authorization, which allows us to authenticate and authorize requests before they reach our backend. This provides us with a secure way to manage incoming requests and ensure that only authorized users are able to access our backend.

![Application Architecture](https://disgrafic-product-bucket-sand.s3.us-east-2.amazonaws.com/varios/application-architecture-disgrafic.png)

Overall, our architecture is designed to provide us with a highly scalable, reliable and secure way to manage incoming requests and handle large amounts of data with ease.

## Getting Started (Running locally)

## Prerequisites:

- Node.js installed on your local machine
- Angular CLI installed globally
- Serverless Framework CLI installed globally

### Backend Setup:

1. Open a terminal window and navigate to the project's backend folder.
2. Run the command `npm run sls:dev` to an Apigateway locally that allow run the lambdas.
3. Once the deployment is complete, the backend API will be accessible at the endpoint provided by the Serverless Plugin Simulate.

### Frontend Setup:

1. Open a new terminal window and navigate to the project's frontend folder.
2. Run the command `npm install` to install all required dependencies.
3. Run the command `ng serve` to start the Angular development server.
4. Navigate to http://localhost:4200/ in your web browser to access the frontend.

Now you can start exploring the various features of the application and make any necessary modifications to the code to suit your needs.