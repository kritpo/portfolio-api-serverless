---
title: Portfolio API Reference

language_tabs: # must be one of https://git.io/vQNgJ
    - json

toc_footers:
    - <a href='https://github.com/slatedocs/slate'>Documentation Powered by Slate</a>

includes:
    - errors

search: true

code_clipboard: true
---

# Introduction

Welcome to the Portfolio API! This documentation is used as reference for front-end development. The resumes uses the [JSON Resume standard](https://jsonresume.org/) as base of work.

# Resumes

## Create a Resume

```http
POST https://api.jimmyweng.fr/resumes
```

> JSON request:

```json
{
	"languageCode": "en",
	"basics": {
		"name": "John DOE",
		"label": "Programmer",
		"picture": "https://website.com/picture.jpg",
		"email": "john@gmail.com",
		"phone": "(912) 555-4321",
		"website": "http://johndoe.com",
		"summary": "A summary of John Doe...",
		"location": {
			"address": "2712 Broadway St",
			"postalCode": "CA 94115",
			"city": "San Francisco",
			"countryCode": "US",
			"region": "California"
		},
		"profiles": [
			{
				"network": "Twitter",
				"username": "john",
				"url": "http://twitter.com/john"
			}
		]
	},
	"work": [
		{
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2020-01-01",
			"summary": "Description...",
			"highlights": []
		},
		{
			"isInternship": true,
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["CProject"]
		}
	],
	"volunteer": [
		{
			"organization": "Organization",
			"position": "Volunteer",
			"website": "https://organization.fr/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["Organization's website"]
		}
	],
	"education": [
		{
			"institution": "School",
			"area": "Computer Science",
			"studyType": "Engineering Studies",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"gpa": "4",
			"courses": [
				{
					"category": "Y1",
					"courses": ["TS1001 - Algorithmic"]
				},
				{
					"category": "Y2",
					"courses": ["TS2001 - Programming"]
				}
			]
		}
	],
	"projects": [
		{
			"name": "Project",
			"summary": "A single project to do everything!",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"picture": "https://website.com/cproject-picture.jpg",
			"url": "https://github.com/john/cproject",
			"technologies": ["Javascript"]
		}
	],
	"skills": [
		{
			"name": "Javascript",
			"level": "Advanced"
		}
	],
	"languages": [
		{
			"language": "French",
			"fluency": "Advanced"
		}
	],
	"interests": [
		{
			"name": "Computer",
			"keywords": ["Problem solving", "Programming", "Algorithmic"]
		}
	],
	"references": [
		{
			"name": "Jane Doe",
			"reference": "Reference..."
		}
	]
}
```

Post a new resume.

### Request

| HEADER        | TYPE   | REQUIRED     | DESCRIPTION                            |
| ------------- | ------ | ------------ | -------------------------------------- |
| Authorization | String | **Required** | The access token given by AWS Cognito. |

| JSON BODY PARAMETER                                                      | TYPE          | REQUIRED     | DESCRIPTION                                             |
| ------------------------------------------------------------------------ | ------------- | ------------ | ------------------------------------------------------- |
| languageCode                                                             | String        | **Required** | The language code of the resume (must be standardized). |
| basics                                                                   | Object        | **Required** | Basic informations.                                     |
| &nbsp;&nbsp;>&nbsp;&nbsp;name                                            | String        | **Required** | Full name.                                              |
| &nbsp;&nbsp;>&nbsp;&nbsp;label                                           | String        | **Required** | Current title.                                          |
| &nbsp;&nbsp;>&nbsp;&nbsp;picture                                         | String        | **Required** | Picture URL.                                            |
| &nbsp;&nbsp;>&nbsp;&nbsp;email                                           | String        | **Required** | Email address.                                          |
| &nbsp;&nbsp;>&nbsp;&nbsp;phone                                           | String        | **Required** | Phone number (must be well formatted).                  |
| &nbsp;&nbsp;>&nbsp;&nbsp;website                                         | String        | **Required** | Personal website URL.                                   |
| &nbsp;&nbsp;>&nbsp;&nbsp;summary                                         | String        | **Required** | Short description.                                      |
| &nbsp;&nbsp;>&nbsp;&nbsp;location                                        | Object        | **Required** | Localisation.                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;address                            | String        | **Required** | Full address.                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;postalCode                         | String        | **Required** | Postal code.                                            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;city                               | String        | **Required** | City.                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;countryCode                        | String        | **Required** | Country code.                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;region                             | String        | **Required** | Region.                                                 |
| &nbsp;&nbsp;>&nbsp;&nbsp;profiles                                        | Array[Object] | **Required** | List of social network profiles.                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;profile                            | Object        | _Optional_   | A specific profile in the list.                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;network               | String        | **Required** | The social network name.                                |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;username              | String        | **Required** | The username in the social network.                     |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;url                   | String        | **Required** | The direct URL to the profile.                          |
| work                                                                     | Array[Object] | **Required** | List of work experiences.                               |
| &nbsp;&nbsp;>&nbsp;&nbsp;experience                                      | Object        | _Optional_   | A specific experience in the list.                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;isInternship                       | Boolean       | _Optional_   | If the work experience is an internship.                |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;company                            | String        | **Required** | The company name.                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;position                           | String        | **Required** | The occupied position.                                  |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;website                            | String        | **Required** | The company website.                                    |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start working date (must be well formatted).            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End working date (must be well formatted).              |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | Description of the experience.                          |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;highlights                         | Array[String] | **Required** | List of remarkable achievements.                        |
| volunteer                                                                | Array[Object] | **Required** | List of volunteering experiences.                       |
| &nbsp;&nbsp;>&nbsp;&nbsp;experience                                      | Object        | _Optional_   | A specific experience in the list.                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;organization                       | String        | **Required** | The organization name.                                  |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;position                           | String        | **Required** | The occupied position.                                  |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;website                            | String        | **Required** | The organization website.                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start volunteering date (must be well formatted).       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End volunteering date (must be well formatted).         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | Description of the experience.                          |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;highlights                         | Array[String] | **Required** | List of remarkable achievements.                        |
| school                                                                   | Array[Object] | **Required** | Academic background.                                    |
| &nbsp;&nbsp;>&nbsp;&nbsp;entry                                           | Object        | _Optional_   | A specific entry in the list.                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;institution                        | String        | **Required** | The academic institution name.                          |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;area                               | String        | **Required** | The academic area.                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;studyType                          | String        | **Required** | The type of study.                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start studying date (must be well formatted).           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End studying date (must be well formatted).             |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;gpa                                | String        | **Required** | The cumulative GPA during this period.                  |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;courses                            | Array[Object] | **Required** | List of courses.                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;course                | Object        | _Optional_   | A specific course in the list.                          |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;category | String        | **Required** | The courses category, like the semester or the year.    |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;courses  | Array[String] | **Required** | The list of courses assigned to the category.           |
| projects                                                                 | Array[Object] | **Required** | List of projects.                                       |
| &nbsp;&nbsp;>&nbsp;&nbsp;project                                         | Object        | _Optional_   | A specific project in the list.                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The project name.                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | The project description.                                |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Project start date (must be well formatted).            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | Project end date (must be well formatted).              |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;picture                            | String        | **Required** | Project illustration URL.                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;url                                | String        | **Required** | Project URL.                                            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;technologies                       | Array[String] | **Required** | List of used technologies in the project.               |
| skills                                                                   | Array[Object] | **Required** | List of skills.                                         |
| &nbsp;&nbsp;>&nbsp;&nbsp;skill                                           | Object        | _Optional_   | A specific skill in the list.                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The skill name.                                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;level                              | String        | **Required** | The skill level (must be standardized).                 |
| languages                                                                | Array[Object] | **Required** | List of languages fluency.                              |
| &nbsp;&nbsp;>&nbsp;&nbsp;language                                        | Object        | _Optional_   | A specific language in the list.                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;language                           | String        | **Required** | The language.                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;fluency                            | String        | **Required** | The fluency (must be standardized).                     |
| interests                                                                | Array[Object] | **Required** | List of interests.                                      |
| &nbsp;&nbsp;>&nbsp;&nbsp;interest                                        | Object        | _Optional_   | A specific interest in the list.                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The interest name.                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;keywords                           | Array[String] | **Required** | List of keywords.                                       |
| references                                                               | Array[Object] | **Required** | List of references.                                     |
| &nbsp;&nbsp;>&nbsp;&nbsp;reference                                       | Object        | _Optional_   | A specific reference in the list.                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The reference author name.                              |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;reference                          | String        | **Required** | The reference content.                                  |

### Response

<aside class="success">
On success, the HTTP status code in the response header is <strong><em>201 CREATED</em></strong> and the response body will be empty.
</aside>

<aside class="warning">
On error, the HTTP status code in the response header is an <a href="#errors"><strong><em>error code</em></strong></a> and the response body contains an object with the associated <a href="#errors"><strong><em>error message</em></strong></a> in the <em>message</em> property in JSON format.
</aside>

## Read a Specific Resume

```http
GET https://api.jimmyweng.fr/resume/{username}
```

> JSON response:

```json
{
	"username": "john",
	"languageCode": "en",
	"basics": {
		"name": "John DOE",
		"label": "Programmer",
		"picture": "https://website.com/picture.jpg",
		"email": "john@gmail.com",
		"phone": "(912) 555-4321",
		"website": "http://johndoe.com",
		"summary": "A summary of John Doe...",
		"location": {
			"address": "2712 Broadway St",
			"postalCode": "CA 94115",
			"city": "San Francisco",
			"countryCode": "US",
			"region": "California"
		},
		"profiles": [
			{
				"network": "Twitter",
				"username": "john",
				"url": "http://twitter.com/john"
			}
		]
	},
	"work": [
		{
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2020-01-01",
			"summary": "Description...",
			"highlights": []
		},
		{
			"isInternship": true,
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["CProject"]
		}
	],
	"volunteer": [
		{
			"organization": "Organization",
			"position": "Volunteer",
			"website": "https://organization.fr/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["Organization's website"]
		}
	],
	"education": [
		{
			"institution": "School",
			"area": "Computer Science",
			"studyType": "Engineering Studies",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"gpa": "4",
			"courses": [
				{
					"category": "Y1",
					"courses": ["TS1001 - Algorithmic"]
				},
				{
					"category": "Y2",
					"courses": ["TS2001 - Programming"]
				}
			]
		}
	],
	"projects": [
		{
			"name": "Project",
			"summary": "A single project to do everything!",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"picture": "https://website.com/cproject-picture.jpg",
			"url": "https://github.com/john/cproject",
			"technologies": ["Javascript"]
		}
	],
	"skills": [
		{
			"name": "Javascript",
			"level": "Advanced"
		}
	],
	"languages": [
		{
			"language": "French",
			"fluency": "Advanced"
		}
	],
	"interests": [
		{
			"name": "Computer",
			"keywords": ["Problem solving", "Programming", "Algorithmic"]
		}
	],
	"references": [
		{
			"name": "Jane Doe",
			"reference": "Reference..."
		}
	]
}
```

Get a specific resume.

### Request

| PATH PARAMETER | TYPE   | REQUIRED     | DESCRIPTION                              |
| -------------- | ------ | ------------ | ---------------------------------------- |
| {username}     | String | **Required** | The username of the owner of the resume. |

| QUERY PARAMETER | TYPE   | REQUIRED   | DESCRIPTION                                                                           |
| --------------- | ------ | ---------- | ------------------------------------------------------------------------------------- |
| {languageCode}  | String | _Optional_ | The language code of the resume (if not specified, the default language is retrieve). |

### Response

<aside class="success">
On success, the HTTP status code in the response header is <strong><em>200 OK</em></strong> and the response body contains the retrieved resume object in JSON format.
</aside>

<aside class="warning">
On error, the HTTP status code in the response header is an <a href="#errors"><strong><em>error code</em></strong></a> and the response body contains an object with the associated <a href="#errors"><strong><em>error message</em></strong></a> in the <em>message</em> property in JSON format.
</aside>

## Update a Specific Resume

```http
PUT https://api.jimmyweng.fr/resume/{username}
```

> JSON request:

```json
{
	"isPartial": false,
	"languageCode": "en",
	"basics": {
		"name": "John DOE",
		"label": "Programmer",
		"picture": "https://website.com/picture.jpg",
		"email": "john@gmail.com",
		"phone": "(912) 555-4321",
		"website": "http://johndoe.com",
		"summary": "A summary of John Doe...",
		"location": {
			"address": "2712 Broadway St",
			"postalCode": "CA 94115",
			"city": "San Francisco",
			"countryCode": "US",
			"region": "California"
		},
		"profiles": [
			{
				"network": "Twitter",
				"username": "john",
				"url": "http://twitter.com/john"
			}
		]
	},
	"work": [
		{
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2020-01-01",
			"summary": "Description...",
			"highlights": []
		},
		{
			"isInternship": true,
			"company": "Company",
			"position": "Programmer",
			"website": "https://company.com/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["CProject"]
		}
	],
	"volunteer": [
		{
			"organization": "Organization",
			"position": "Volunteer",
			"website": "https://organization.fr/",
			"startDate": "2019-01-01",
			"endDate": "2020-01-01",
			"summary": "Description...",
			"highlights": ["Organization's website"]
		}
	],
	"education": [
		{
			"institution": "School",
			"area": "Computer Science",
			"studyType": "Engineering Studies",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"gpa": "4",
			"courses": [
				{
					"category": "Y1",
					"courses": ["TS1001 - Algorithmic"]
				},
				{
					"category": "Y2",
					"courses": ["TS2001 - Programming"]
				}
			]
		}
	],
	"projects": [
		{
			"name": "Project",
			"summary": "A single project to do everything!",
			"startDate": "2018-09-01",
			"endDate": "2020-07-01",
			"picture": "https://website.com/cproject-picture.jpg",
			"url": "https://github.com/john/cproject",
			"technologies": ["Javascript"]
		}
	],
	"skills": [
		{
			"name": "Javascript",
			"level": "Advanced"
		}
	],
	"languages": [
		{
			"language": "French",
			"fluency": "Advanced"
		}
	],
	"interests": [
		{
			"name": "Computer",
			"keywords": ["Problem solving", "Programming", "Algorithmic"]
		}
	],
	"references": [
		{
			"name": "Jane Doe",
			"reference": "Reference..."
		}
	]
}
```

Put a new resume to replace a specific one.

### Request

| HEADER        | TYPE   | REQUIRED     | DESCRIPTION                            |
| ------------- | ------ | ------------ | -------------------------------------- |
| Authorization | String | **Required** | The access token given by AWS Cognito. |

| PATH PARAMETER | TYPE   | REQUIRED     | DESCRIPTION                              |
| -------------- | ------ | ------------ | ---------------------------------------- |
| {username}     | String | **Required** | The username of the owner of the resume. |

| JSON BODY PARAMETER                                                      | TYPE          | REQUIRED     | DESCRIPTION                                                                                          |
| ------------------------------------------------------------------------ | ------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| isPartial                                                                | Boolean       | _Optional_   | If the resume is partial, to update only the sended first level fields (the default value is false). |
| languageCode                                                             | String        | **Required** | The language code of the resume (must be standardized).                                              |
| basics                                                                   | Object        | **Required** | Basic informations.                                                                                  |
| &nbsp;&nbsp;>&nbsp;&nbsp;name                                            | String        | **Required** | Full name.                                                                                           |
| &nbsp;&nbsp;>&nbsp;&nbsp;label                                           | String        | **Required** | Current title.                                                                                       |
| &nbsp;&nbsp;>&nbsp;&nbsp;picture                                         | String        | **Required** | Picture URL.                                                                                         |
| &nbsp;&nbsp;>&nbsp;&nbsp;email                                           | String        | **Required** | Email address.                                                                                       |
| &nbsp;&nbsp;>&nbsp;&nbsp;phone                                           | String        | **Required** | Phone number (must be well formatted).                                                               |
| &nbsp;&nbsp;>&nbsp;&nbsp;website                                         | String        | **Required** | Personal website URL.                                                                                |
| &nbsp;&nbsp;>&nbsp;&nbsp;summary                                         | String        | **Required** | Short description.                                                                                   |
| &nbsp;&nbsp;>&nbsp;&nbsp;location                                        | Object        | **Required** | Localisation.                                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;address                            | String        | **Required** | Full address.                                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;postalCode                         | String        | **Required** | Postal code.                                                                                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;city                               | String        | **Required** | City.                                                                                                |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;countryCode                        | String        | **Required** | Country code.                                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;region                             | String        | **Required** | Region.                                                                                              |
| &nbsp;&nbsp;>&nbsp;&nbsp;profiles                                        | Array[Object] | **Required** | List of social network profiles.                                                                     |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;profile                            | Object        | _Optional_   | A specific profile in the list.                                                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;network               | String        | **Required** | The social network name.                                                                             |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;username              | String        | **Required** | The username in the social network.                                                                  |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;url                   | String        | **Required** | The direct URL to the profile.                                                                       |
| work                                                                     | Array[Object] | **Required** | List of work experiences.                                                                            |
| &nbsp;&nbsp;>&nbsp;&nbsp;experience                                      | Object        | _Optional_   | A specific experience in the list.                                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;isInternship                       | Boolean       | _Optional_   | If the work experience is an internship.                                                             |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;company                            | String        | **Required** | The company name.                                                                                    |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;position                           | String        | **Required** | The occupied position.                                                                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;website                            | String        | **Required** | The company website.                                                                                 |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start working date (must be well formatted).                                                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End working date (must be well formatted).                                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | Description of the experience.                                                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;highlights                         | Array[String] | **Required** | List of remarkable achievements.                                                                     |
| volunteer                                                                | Array[Object] | **Required** | List of volunteering experiences.                                                                    |
| &nbsp;&nbsp;>&nbsp;&nbsp;experience                                      | Object        | _Optional_   | A specific experience in the list.                                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;organization                       | String        | **Required** | The organization name.                                                                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;position                           | String        | **Required** | The occupied position.                                                                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;website                            | String        | **Required** | The organization website.                                                                            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start volunteering date (must be well formatted).                                                    |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End volunteering date (must be well formatted).                                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | Description of the experience.                                                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;highlights                         | Array[String] | **Required** | List of remarkable achievements.                                                                     |
| school                                                                   | Array[Object] | **Required** | Academic background.                                                                                 |
| &nbsp;&nbsp;>&nbsp;&nbsp;entry                                           | Object        | _Optional_   | A specific entry in the list.                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;institution                        | String        | **Required** | The academic institution name.                                                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;area                               | String        | **Required** | The academic area.                                                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;studyType                          | String        | **Required** | The type of study.                                                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Start studying date (must be well formatted).                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | End studying date (must be well formatted).                                                          |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;gpa                                | String        | **Required** | The cumulative GPA during this period.                                                               |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;courses                            | Array[Object] | **Required** | List of courses.                                                                                     |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;course                | Object        | _Optional_   | A specific course in the list.                                                                       |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;category | String        | **Required** | The courses category, like the semester or the year.                                                 |
| &nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;courses  | Array[String] | **Required** | The list of courses assigned to the category.                                                        |
| projects                                                                 | Array[Object] | **Required** | List of projects.                                                                                    |
| &nbsp;&nbsp;>&nbsp;&nbsp;project                                         | Object        | _Optional_   | A specific project in the list.                                                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The project name.                                                                                    |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;summary                            | String        | **Required** | The project description.                                                                             |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;startDate                          | String        | **Required** | Project start date (must be well formatted).                                                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;endDate                            | String        | _Optional_   | Project end date (must be well formatted).                                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;picture                            | String        | **Required** | Project illustration URL.                                                                            |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;url                                | String        | **Required** | Project URL.                                                                                         |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;technologies                       | Array[String] | **Required** | List of used technologies in the project.                                                            |
| skills                                                                   | Array[Object] | **Required** | List of skills.                                                                                      |
| &nbsp;&nbsp;>&nbsp;&nbsp;skill                                           | Object        | _Optional_   | A specific skill in the list.                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The skill name.                                                                                      |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;level                              | String        | **Required** | The skill level (must be standardized).                                                              |
| languages                                                                | Array[Object] | **Required** | List of languages fluency.                                                                           |
| &nbsp;&nbsp;>&nbsp;&nbsp;language                                        | Object        | _Optional_   | A specific language in the list.                                                                     |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;language                           | String        | **Required** | The language.                                                                                        |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;fluency                            | String        | **Required** | The fluency (must be standardized).                                                                  |
| interests                                                                | Array[Object] | **Required** | List of interests.                                                                                   |
| &nbsp;&nbsp;>&nbsp;&nbsp;interest                                        | Object        | _Optional_   | A specific interest in the list.                                                                     |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The interest name.                                                                                   |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;keywords                           | Array[String] | **Required** | List of keywords.                                                                                    |
| references                                                               | Array[Object] | **Required** | List of references.                                                                                  |
| &nbsp;&nbsp;>&nbsp;&nbsp;reference                                       | Object        | _Optional_   | A specific reference in the list.                                                                    |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;name                               | String        | **Required** | The reference author name.                                                                           |
| &nbsp;&nbsp;-&nbsp;&nbsp;>&nbsp;&nbsp;reference                          | String        | **Required** | The reference content.                                                                               |

### Response

<aside class="success">
On success, the HTTP status code in the response header is <strong><em>204 NO CONTENT</em></strong> and the response body will be empty.
</aside>

<aside class="warning">
On error, the HTTP status code in the response header is an <a href="#errors"><strong><em>error code</em></strong></a> and the response body contains an object with the associated <a href="#errors"><strong><em>error message</em></strong></a> in the <em>message</em> property in JSON format.
</aside>

## Delete a Specific Resume

```http
DELETE https://api.jimmyweng.fr/resume/{username}
```

Delete a specific resume.

### Request

| HEADER        | TYPE   | REQUIRED     | DESCRIPTION                            |
| ------------- | ------ | ------------ | -------------------------------------- |
| Authorization | String | **Required** | The access token given by AWS Cognito. |

| PATH PARAMETER | TYPE   | REQUIRED     | DESCRIPTION                              |
| -------------- | ------ | ------------ | ---------------------------------------- |
| {username}     | String | **Required** | The username of the owner of the resume. |

| QUERY PARAMETER | TYPE   | REQUIRED   | DESCRIPTION                                                                        |
| --------------- | ------ | ---------- | ---------------------------------------------------------------------------------- |
| {languageCode}  | String | _Optional_ | The language code of the resume (if not specified, all languages will be deleted). |

### Response

<aside class="success">
On success, the HTTP status code in the response header is <strong><em>204 NO CONTENT</em></strong> and the response body will be empty.
</aside>

<aside class="warning">
On error, the HTTP status code in the response header is an <a href="#errors"><strong><em>error code</em></strong></a> and the response body contains an object with the associated <a href="#errors"><strong><em>error message</em></strong></a> in the <em>message</em> property in JSON format.
</aside>

## Retrieve All Languages of a Resume

```http
GET https://api.jimmyweng.fr/resume/{username}/languages
```

> JSON response:

```json
{
	"default": { "code": "en", "language": "english" },
	"languages": [
		{ "code": "en", "language": "english" },
		{ "code": "fr", "language": "français" }
	]
}
```

Get the list of existing languages of a resume.

### Request

| PATH PARAMETER | TYPE   | REQUIRED     | DESCRIPTION                              |
| -------------- | ------ | ------------ | ---------------------------------------- |
| {username}     | String | **Required** | The username of the owner of the resume. |

### Response

<aside class="success">
On success, the HTTP status code in the response header is <strong><em>200 OK</em></strong> and the response body contains an object with the default language object and an array of all languages objects in JSON format.
</aside>

<aside class="warning">
On error, the HTTP status code in the response header is an <a href="#errors"><strong><em>error code</em></strong></a> and the response body contains an object with the associated <a href="#errors"><strong><em>error message</em></strong></a> in the <em>message</em> property in JSON format.
</aside>
