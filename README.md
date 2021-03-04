# Portfolio of Jimmy Weng - API Serverless Project

Created with the help of `serverless` framework.\
API to manage resumes and associated data.

## Installation

Install `serverless` command globally:

```sh
npm install -g serverless
```

Clone the application from the GitHub repository:

```sh
git clone https://github.com/kritpo/portfolio-api-serverless.git
```

Move to the application folder:

```sh
cd portfolio-api-serverless
```

Install dependencies:

```sh
npm install
```

## Usage

### Run the application on your computer locally

As the application was developed with the plugin `serverless-offline`, you can run the application locally, run:

```sh
npm start
```

To see the application, go to [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy the application

To deploy the application on AWS, run:

```sh
npm run deploy
```

You must ensure that you have correctly [configured](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) your AWS credentials.
