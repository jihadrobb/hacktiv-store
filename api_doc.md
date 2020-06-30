# E-Commerce-CMS

## RESTful endpoints

### POST /login
> Login as registered user

*Request Header*
```
not needed  
```
*Request Body*
```
{
    "email": "<Your Email>",
    "password": "<Your Password>"
}
```
*Response (200 - Success)*
```
{
    "id": <given id by system>,
    "email": "<inputted email>",
    "role": <admin / guest>,
    "token": "<some token generated by jsonwebtoken>"
}
```
*Response (404 - Not Found)*
```
{
    "errorCode": "UserNotFound",
    "message": "User not found"
}
```
*Response (400 - Bad Request)*
```
{
    "errorCode": "WrongPassword",
    "message": "Wrong Password"
}
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```
### POST /products
> Create a new product as admin

*Request Header*
```
{
    "access_token": "<your access token>"
}   
```
*Request Body*
```
{
    "name": "<Products's name>",
    "image_url": "<Products's image>",
    "price": <Products's price>
    "stock": <Products's stock>
}
```
*Response (201 - Created)*
```
{
    "id": <given id by system>,
    "name": "<inputted name>",
    "image_url": "<inputted image>",
    "price": <inputted price>
    "stock": <inputted stock>
    "createdAt": "<date the task is created>",
    "updatedAt": "<same date as above, since its a newly created task>"
}
```
*Response (400 - Bad Request)*
```
{
    "errorCode": "SequelizeValidationError",
    "message": [
        'Please input name',
        'Please input image url',
        'Minimum price is 1000',
        'Minimum stock is 1'
    ]
}
```
*Response (403 - Forbidden)*
```
{
    "errorCode": "Unauthorized",
    "message": "Not Authorized to do this"
}
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```
### GET /products
> See list of all products

*Request Header*
```
{
    "access_token": "<your access token>"
}
```
*Request Body*
```
not needed
```
*Response (200 - OK)*
```
[
    {
        "id": 1,
        "name": "Product 1",
        "image_url": "<some image_url>",
        "price": 2000,
        "stock": 1,
        "createdAt": "2020-06-24T07:10:30.589Z",
        "updatedAt": "2020-06-27T02:59:23.448Z"
    },
    {
        "id": 2,
        "name": "Product 2",
        "image_url": "<some image_url>",
        "price": 2000,
        "stock": 1,
        "createdAt": "2020-06-24T07:11:16.355Z",
        "updatedAt": "2020-06-27T03:12:17.507Z"
    }
]
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```
### GET /products/:id
> See a specified products

*Request Header*
```
{
    "access_token": "<your access token>"
}
```
*Request Body*
```
not needed
```
*Response (200 - OK)*
```
{
    "id": 1,
    "name": "Product 1",
    "image_url": "<some image_url>",
    "price": 2000,
    "stock": 1,
    "createdAt": "2020-06-24T07:10:30.589Z",
    "updatedAt": "2020-06-27T02:59:23.448Z"
}
```
*Response (404 - Not Found)*
```
{
    "errorCode": "DataNotFound",
    "message": "Data not found"
}
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```
### PUT /products/:id
> Edit a product as admin

*Request Header*
```
{
    "access_token": "<your access token>"
}
```
*Request Body*
```
{
    "name": "<Products's name>",
    "image_url": "<Products's image>",
    "price": <Products's price>
    "stock": <Products's stock>
}
```
*Response (200 - OK)*
```
{
    "id": <given id by system>,
    "name": "<inputted name>",
    "image_url": "<inputted image>",
    "price": <inputted price>
    "stock": <inputted stock>
    "createdAt": "<date the task is created>",
    "updatedAt": "<data the task is updated>"
}
```
*Response (400 - Bad Request)*
```
{
    "errorCode": "SequelizeValidationError",
    "message": [
        'Please input name',
        'Please input image url',
        'Minimum price is 1000',
        'Minimum stock is 1'
    ]
}
```
*Response (403 - Forbidden)*
```
{
    "errorCode": "Unauthorized",
    "message": "Not Authorized to do this"
}
```
*Response (404 - Not Found)*
```
{
    "errorCode": "DataNotFound",
    "message": "Data not found"
}
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```
### DELETE /tasks/:id
> Delete your own task

*Request Header*
```
{
    "access_token": "<your access token>"
}
```
*Request Body*
```
not needed
```
*Response (200 - OK)*
```
{
    "message": "Data Deleted"
}
```
*Response (403 - Forbidden)*
```
{
    "errorCode": "Unauthorized",
    "message": "Not Authorized to do this"
}
```
*Response (404 - Not Found)*
```
{
    "errorCode": "DataNotFound",
    "message": "Data not found"
}
```
*Response (500 - Internal Server Error)*
```
{
    "errorCode": "<Some Internal Server Error Message>",
    "message": "Internal Server Error"
}
```