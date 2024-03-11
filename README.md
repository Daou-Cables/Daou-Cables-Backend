![Logo](/assets/logo.png)
# Daou-Cables-Backend Documentation

This documentation outlines the structure and functionality of an Express-based API designed to manage various resources such as administrators, categories, products, quotas, and media content. It provides information on setup, configuration, and usage of the API.

## Authors

- [Chris Daou](https://github.com/chris-daou)
- [Jean Paul Basil](https://github.com/JeanPaulBassil)
- [Tony Kosseify](https://github.com/tonyykosseifyy)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Database Connection](#database-connection)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [API Routes](#api-routes)
    - [Authentication](#authentication)
    - [Admin Management](#admin-management)
    - [Product Management](#product-management)
    - [Media Management](#media-management)
    - [Category Management](#category-management)
    - [Quota Management](#quota-management)
- [Middleware](#middleware)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Rate Limiting](#rate-limiting)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API is built using Express.js and connects to a MongoDB database. It utilizes JWT for authentication, manages file uploads with Multer, and integrates AWS S3 for media storage. Key features include user (admin) management, product and category management, and handling contact and quota requests.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- AWS Account (for S3)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Daou-Cables/Daou-Cables-Backend.git
   ```
2. 
   Navigate to the project directory nad install dependencies:
   ```sh
   cd Daou-Cables-Backend
   npm install
   ```
3. Configure environment variables as per the [Configuration](#Configuration) section.

## Configuration

### Environment Variables

Create a `.env` file in the root of your project directory with the following variables:

- `PORT` - Port for the Express server
- `MONGODB_URI` - MongoDB connection string
- `AWS_ACCESS_KEY_ID` - AWS access key for S3
- `AWS_SECRET_ACCESS_KEY` - AWS secret key for S3
- `AWS_REGION` - AWS region for your S3 bucket
- `BUCKET` - Your AWS S3 bucket name
- `SECRET_JWT` - Secret key for signing JWTs
- `SECRET_REFRESH_JWT` - Secret key for signing refresh tokens

### Database Connection

The API connects to MongoDB using Mongoose. Ensure your `MONGODB_URI` is correctly set in your `.env` file.

## Usage

### Starting the Server

To start the server, run:
```sh
npm start
```

### API Routes

#### Authentication

- **POST /login** - Authenticate an admin and receive a JWT.
- **POST /auth/refreshToken** - Refresh an expired JWT.

#### Admin Management

- **POST /addAdmin** - Add a new admin (Level 1 only).
- **POST /deleteAdmin** - Delete an existing admin (Level 1 only).

#### Product Management

- **POST /addProduct** - Add a new product.
- **POST /deleteProduct** - Delete an existing product.
- **POST /editProduct** - Edit an existing product.

#### Media Management

- **POST /changeBillboard** - Update the main billboard image.
- **POST /changeVideo** - Update the main video content.

#### Category Management

- **POST /addCategory** - Add a new category.
- **POST /deleteCategory** - Delete an existing category along with its associated products.

#### Quota Management

- **POST /addQuota** - Add a new quota request.
- **POST /deleteQuota** - Delete an existing quota request.

## Middleware

### Authentication and Authorization

- **requireAuth** - Middleware to require JWT for route access.
- **requireLevelOne** - Middleware to allow only Level 1 admins access.

### Rate Limiting

- **addQuotaLimiter** - Limits the number of quota requests a user can make in a day.

## Models

The API utilizes Mongoose models for Admin, Category, Product, Media, Quota, and Token management.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your changes.

# License

All rights reserved.

This software and associated documentation files (the "Software") are the property of its authors. and are protected by copyright laws. The Software is supplied to Daou Cable Manufacturing Co. LTD., and it may not be reproduced, distributed, modified, or publicly displayed without the express written permission of the authors.

The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort or otherwise, arising from, out of, or in connection with the Software or the use or other dealings in the Software.

Use of the Software by the recipient is only under the terms specified in a separate agreement between the recipient and the authors and is strictly limited to those terms.
