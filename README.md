# Welcome to kurs-pm-web 👋

![Version](https://img.shields.io/badge/version-0.8.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-12.14.1-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Introduction

The course information project (KIP) is an initiative at KTH that was launched in 2018 to improve the quality and availability of information about KTH:s courses. The background to the project is, among other things, that it was difficult for the student to find information about the courses and even more difficult to compare information about several courses. The reason for the problems is scattered course information in several places and that there is no uniformity or assigned places for the course information. The project takes measures to consolidate course information into two locations and to present the information in a manner that is uniform for KTH. The student should find the right information about the course, depending on their needs. The result of the project is a public course site where the correct course information is collected and presented uniformly. Also, a tool is developed for teachers to enter and publish course information. Eventually, this will lead to the student making better decisions based on their needs, and it will also reduce the burden on teachers and administration regarding questions and support for the student.

### 🏠 [Homepage](https://github.com/KTH/kurs-pm-web)

## Overview

A course memo is an actual plan for taking the course. A course memo help students to plan and prepare for all the learning activities during the course offering. A course memo contains information about the goals of the course, activities, preparations, detailed information about the examination, and contacts. It is particularly important for students just before the start of the course. A teacher, or a course coordinator, creates a course memo, and it must be published no later than by course the start.

Kurs-pm-web is a microservice with the public view of course memos. It uses `React`, `MobX`, and is based on [github.com/KTH/node-web](https://github.com/KTH/node-web).

### API:s

Kurs-pm-web fetches data from:

- Course memo API
  - Dev (Stage): [api-r.referens.sys.kth.se/api/kurs-pm-data](https://api-r.referens.sys.kth.se/api/kurs-pm-data)
  - Prod (Active): [api.kth.se/api/kurs-pm-data](https://api.kth.se/api/kurs-pm-data)
- Course information API
  - Dev (Stage): [api-r.referens.sys.kth.se/api/kursinfo](https://api-r.referens.sys.kth.se/api/kursinfo)
  - Prod (Active): [api.kth.se/api/kursinfo](https://api.kth.se/api/kursinfo)
- API för kurs- och programinformation
  - Dev (Stage): [api-r.referens.sys.kth.se/api/kopps/v2/](https://api-r.referens.sys.kth.se/api/kopps/v2/)
  - Prod (Active): [api.kth.se/api/kopps/v2/](https://api.kth.se/api/kopps/v2/)

### Related projects

- [https://github.com/KTH/kurs-pm-data-admin-web](https://github.com/KTH/kurs-pm-data-admin-web)
- [https://github.com/KTH/kurs-pm-data-api](https://github.com/KTH/kurs-pm-data-api)
- [https://github.com/KTH/kursinfo-api](https://github.com/KTH/kursinfo-api)
- [https://github.com/KTH/node-web](https://github.com/KTH/node-web)

## Prerequisites

- Node.js 12.14.1
- Ansible Vault

### Secrets for Development

Secrets during local development are stored in a `.env` file in the root of your project. This file should be in `.gitignore`. It needs to contain at least LDAP connection URI and password in order for authentication to work properly.

Secrets (names, passwords, keys, and uri:s) for dev and prod are stored in the the course information project’s Azure key vault.

```sh
LDAP_BASE=OU=UG,DC=ref,DC=ug,DC=kth,DC=se
LDAP_URI=ldaps://[name]@ref.ug.kth.se@ldap.ref.ug.kth.se
LDAP_PASSWORD=[password]

# If KURS_PM_DATA_API_URI is omitted, http://localhost:3001/api/kurs-pm-data?defaultTimeout=10000 will be used
KURS_PM_DATA_API_URI=https://api-r.referens.sys.kth.se/api/kurs-pm-data?defaultTimeout=10000
KURS_PM_DATA_API_KEY=[key]

# If KURS_INFO_API_URI is omitted, http://localhost:3002/api/kursinfo?defaultTimeout=10000 will be used
KURS_INFO_API_URI=https://app-r.referens.sys.kth.se/api/kursinfo?defaultTimeout=10000
KURS_INFO_API_KEY=[key]

# If KOPPS_URI is omitted, https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=10000 will be used
```

These settings are also available in the `env.in` file.

## Install

```sh
npm install
```

## Usage

Start the service on [localhost:3000/kurs-pm/:courseCode](http://localhost:3000/kurs-pm/:courseCode).

```sh
npm run start-dev
```

## Run tests

```sh
npm run test
```

## Use 🐳

Copy `docker-compose.yml.in` to `docker-compose.yml` and make necessary changes, if any. `KURS_PM_DATA_API_URI` probably needs to be set to reflect your local development setup.

```sh
docker-compose up
```

## Deploy

The deployment process is described in [Build, release, deploy](https://confluence.sys.kth.se/confluence/x/aY3_Ag). Technical details, such as configuration, is described in [How to deploy your 🐳 application using Cellus-Registy](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-DEPLOY.md) and [🔧 How To Configure Your Application For The Pipeline](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-CONFIGURE.md).

### Edit secrets.env

```sh
ansible-vault edit secrets.env
```

### Configure secrets.env

Secrets (names, passwords, keys, and uri:s) for dev and prod are stored in the the course information project’s Azure key vault.

```sh
LDAP_BASE=OU=UG,DC=ref,DC=ug,DC=kth,DC=se
LDAP_URI=ldaps://[name]@ref.ug.kth.se@ldap.ref.ug.kth.se
LDAP_PASSWORD=[password]

KURS_PM_DATA_API_URI=https://api-r.referens.sys.kth.se/api/kurs-pm-data?defaultTimeout=10000
KURS_PM_DATA_API_KEY=[key]

KURS_INFO_API_URI=https://app-r.referens.sys.kth.se/api/kursinfo?defaultTimeout=10000
KURS_INFO_API_KEY=[key]

# If KOPPS_URI is omitted, https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=10000 will be used

SESSION_SECRET=[secret]
SESSION_KEY=[key]
APPINSIGHTS_INSTRUMENTATIONKEY=[key]
REDIS_URI=[uri]
```

## Author

👤 **KTH**

- Website: https://kth.github.io/
- Github: [@KTH](https://github.com/KTH)
