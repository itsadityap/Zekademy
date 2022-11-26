
<img alt="Nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"> <img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/> <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white "> 

## Zekademy Assignment (Backend)

A **working api** for Zekademy platform. Created using NodeJS. 


To make it work on your system, clone the repository, then `npm install`. 


Make an .env file and add six variables `MONGO_DB_URL` , `BUCKET_NAME`, `SECRET`,`AWS_S3_SECRET_ACCESS_KEY`,`AWS_S3_ACCESS_KEY_ID` and `MAIL_PASS` for JWT and AWS.

<br>

### Endpoints
* ```/api/v1/register``` - Register into the Website
	
    **Signing Up**

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/1.png?raw=true)
    

    **Sign Up Error Handling**

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/2.png?raw=true)


    <br><br>
* ```/api/v1/login``` - Login into the Website

    **Logging In**
    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/3.png?raw=true
    )

    **Login if user does not exist**
    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/4.png?raw=true)

    <br><br>
* ```/api/v1/signout```- 
Signout of the Website

    **Signing Out**
    ![1](https://github.com/itsadityap/Creator-Platform-API/blob/main/public/12.png?raw=true)

    <br><br>
* ```/api/v1/upload``` - Post request for uploading.

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/5.png?raw=true)

    
    **Only logged in users can upload images**

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/6.png?raw=true)
    
    <br><br>
    
* ```/api/v1/getImage/:id``` - Get request for getting image. 

    **Prompt gets generated as soon as get request is made for the image**

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/7.png?raw=true)

    **If Wrong ID is passed**

    ![1](https://github.com/itsadityap/Zekademy/blob/main/public/8.png?raw=true)

<br><br>

### Database in MongoDB

**Passwords are also hashed in the Database**

![1](https://github.com/itsadityap/Zekademy/blob/main/public/9.png?raw=true)

<br><br>

### AWS Console

**Image uploaded in AWS Console**

![1](https://github.com/itsadityap/Zekademy/blob/main/public/10.png?raw=true)

<br><br>
### Mail Snapshot

![1](https://github.com/itsadityap/Zekademy/blob/main/public/12.png?raw=true)