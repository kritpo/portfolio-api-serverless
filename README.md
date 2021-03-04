# Portfolio of Jimmy Weng - API Serverless Project

[![circleci](https://circleci.com/gh/kritpo/portfolio-api-serverless.svg?style=shield)](https://circleci.com/gh/kritpo/portfolio-api-serverless)
[![codecov](https://codecov.io/gh/kritpo/portfolio-api-serverless/branch/main/graph/badge.svg?token=1OU8X24NUT)](https://codecov.io/gh/kritpo/portfolio-api-serverless)
[![maintainability](https://api.codeclimate.com/v1/badges/9ad878b543fbe578675b/maintainability)](https://codeclimate.com/github/kritpo/portfolio-api-serverless/maintainability)

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

## Documentation

The API reference was made with [slate](https://github.com/slatedocs/slate).

Generate the docs files:

```sh
docker run --rm --name slate -v $(output):/srv/slate/build -v $(input):/srv/slate/source slatedocs/slate
```

With `$(output)` the path to the output files repository and `$(input)` the path to the `doc/` repository.
