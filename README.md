# syndicate lotto manager application
## Overview

This application serves as a manager for various lottery syndicates. It allows users to create syndicates and establish their own rules such as defining minimum and maximum contributions, setting the syndicate as public or private, outlining how funds are distributed percentage-wise, and determining the contribution cutoff date. Users also have the option to enable or disable voting within the syndicate, voting will be used for important descisions, for example keeping the winnings in a pool to buy more lotto tickets, or splitting the winnings.

Once a user creates a syndicate, it becomes accessible for other users to join or request membership. The syndicate owner, who also acts as the moderator, retains the right to invite other users. They can also play various roles, including promoting syndicate members to higher levels of authority, further enhancing the interactive dynamics of the group, and if necessary, removing members.

users of this application have the ability to join or request to join multiple syndicates, subject to the group rules. They can opt in or out of contributing to draws and decide on the amount they wish to invest in a particular draw. Rewards are then distributed according to their respective contributions.

Key features of the application include:

Communication: Users can communicate within their respective syndicates, fostering a sense of community and collaboration.
Live Lotto Results: Users can access a live stream of lotto results in a separate chat. If voting is enabled by the moderator, contributors can decide whether to reinvest the winnings into more tickets or to distribute the winnings among themselves.
Reviews: Users can leave reviews on the syndicates they have been part of for a minimum of one week (to prevent hit-and-run reviewing) and after contributing to at least one draw.
Automatic Payments: Users can set up an automatic payments system to facilitate contributions whenever a specific draw happens in a particular group.
Identification: For legal compliance, users will be required to provide valid identification.
Profile Customization: An integrated camera feature allows users to personalize their profile with pictures and syndicate groups to set unique cover photos.
cash bonuses: To stimulate people to buy more tickets, cash rewards will be given to groups with the highest win rates

## problem definition
Lottery pools often face numerous challenges, as outlined by sources like the Health Lottery. With substantial sums of money involved, there's always a heightened risk of unscrupulous individuals attempting to defraud other participants. This risk has precipitated several lawsuits, revolving around disputes such as participant inclusion, correct number selection, ticket purchase authenticity, group or private ticket procurement, among others. There have been instances of deceitful pool managers who collected funds for lottery pools, but absconded with the cash without buying the intended tickets. Measures to prevent such conduct are currently insufficient.

Setting up a lottery syndicate typically requires a manager responsible for controlling group activities. Traditional duties of a manager include collecting money, purchasing tickets, managing the prize money, and distributing winnings. This responsibility necessitates extensive record keeping and can lead to errors, particularly in larger groups.

Another prevalent issue with lottery pools is the division of prize money among participants, which often results in smaller winnings per individual. Some lottery pools introduce a shares system, where your contribution directly impacts your potential winnings: the more you contribute, the higher your share of the prize.

Trust is another key issue in lottery pools. To ensure safety, every participant who contributes should receive a copy of the purchased tickets, mitigating the risk of false claims. However, it's inconvenient and time-consuming to conduct due diligence on moderators or members within a pool, which involves conducting background checks and scouring the internet for information about them. A centralized hub providing information on individual's past dealings would be immensely beneficial for transparency.

Timely payment from individual participants is another significant issue plaguing many lottery pools.

Additional problems become evident when reviewing large syndicates like the Lotter. Participants often express concerns about ticket security. Once you pay, the syndicate owns the ticket, leaving room for potential denials of your rightful claim.

## Requirements
I will use the MoSCoW prioritization technique for managing the requirements, M - must have, S- Should have, C- Could have, W- Will not have.

### Must have

.A user must be able to log on


.A user must be able to customise their own profile  

.A user must be able to use the camera to take photos

.A user must be able to create their own syndicate

.A moderator must be able to make their syndicate private or public

.A moderator  must be able to customise their syndicate

.A moderator must be able to  invite members to their syndicate .

.A user must be able to search for syndicates to join

.A user must be able to request to join private syndicates

.A user must be able to join public syndicates

.A user must be able to communicate with other syndicate members

.A member must be able to contribute towards a draw

.A user must be able to join multiple syndicates

.A member must contribute a limit set by the moderator

.A member must be able to opt in or out of draws

.A member must be able to leave a group

.A user must be able to leave reviews 

.A user must be able to access this application on the web or their phone

.A user must be able to view any syndicate's reviews 

### Should have
.A moderator should be able to customise their syndicate’s rules

.A user must be able to receive the percentage of what they contributed to the tickets from the rewards

.A user should be able to vote whether to carry on holding the winnings to buy more tickets, or receive winnings

.A moderator should be able to promote users to different positions within their syndicate

.A user should have access, and be able to search for live lotto results

.A member must only be able to review a group, after a week, and contributing to a draw

### Could have
.A syndicate will record their win loss history, and total profits

.A user will be able to view their win/loss history and total profits

.A member could be able to enter another chat, with anyone who bought tickets

.A member could be able to live stream the lottery results within that chat

.A user could have to produce identification in order to verify their login details

.A member could receive a copy of the lotto tickets bought

.A user could download the application on their phone

.A user could be able to set up automatic payments to particular draws

### Will not have
.The system won’t have it’s own payment method, it will need to use stripe

.The system won’t give out rewards for the groups with highest win rates
##  domain model diagram
erDiagram
    Users }|--|{ Syndicate : places
    Syndicate }|--|{ payment : requires
    Syndicate ||--|{ draw : contains
   Users ||--|{ payment : requires
    Syndicate ||--|{ game : uses
    game ||--|{ draw:contains
    draw ||--|{ gameChat: uses
    draw ||--|{ payment: requires
    Syndicate ||--|{ Board: contains



## ER diagram
```mermaid
erDiagram
users ||--|{ user_syndicate_reviews : ""
users ||--|{ user_syndicates : ""
users ||--|{ syndicates : ""
syndicates ||--|{ user_syndicate_reviews : ""
syndicates||--|{user_syndicates : ""
syndicates ||--|{boards : ""
roles ||--|{ user_syndicates : ""
games ||--|{ game_user_syndicates_ticket: ""
user_syndicates ||--|{ game_user_syndicates_ticket: ""
game_user_syndicates_ticket||--|{ ticket_status: ""
user_syndicates ||--|{ board_message: ""
user_syndicates ||--|{ games: ""
boards ||--|{ board_message : "" 



users{
int id PK
string first_name 
string last_name
string password
string email

}

user_syndicate_reviews{
    int id PK
    date created_date 
    string title 
    string content
    int user_id FK
    int syndicate_id FK

}
user_syndicates{
    int id PK
    date start_date
    int user_id FK
    int syndicate_id FK
    int role_id FK
}

roles{
    int id PK
    string name
}

syndicates{
    int id PK
    date created_date
    string name 
    string description
    string avatar
    int owner_id
}
games{
    int id PK
    string name 
    date draw_date
    float reward
    string required_ticket_number
    int user_syndicate_id
    
}
game_user_syndicates_ticket{
    int id PK
    int ticket_code
    float total_reward_value
    int ticket_status_id FK
    int user_syndicate_id FK
    int game_id FK
}
boards{
    int id PK
    string name 
    int syndicate_id 
}
board_message{
    int id PK
    text message
    date created_date
    int board_id FK
    int user_syndicate_id FK
}

ticket_status{
    int id PK
    string name 
}
```
## API design
### users
#### getting all the info on all the users


GET /users


Response : 200 - OK


```json
[
  {
    "id": 1,
    "first_name": "Lorna",
    "last_name": "McKinley",
    "email": "john@example.com",
  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "smith",
    "email": "jane@example.com",
    
  }
]
```
other Responses :


404 - not found





#### returns one user


GET /users/{id}

response 200


```json
  {
    "id": 1,
    "first_name": "Lorna",
    "last_name": "McKinley",
    "password": "password123",
    "email": "john@example.com",
  },
```
other responses 




400: bad request



   


  #### allows a user to add an account

POST/users


  Request


  ```json
  {
 "first_name": "Thomas",
    "last_name": "McKee",
    "password": "password123",
    "email": "Thomas@example.com",
  }
  ```
  responses:


   201 Created


  ```json
{
    "id" : "3",
   "first_name": "Thomas",
    "last_name": "McKee",
    "password": "password123",
    "email": "Thomas@example.com",
}
```
400: Bad Request





#### Updates user's details


PUT /users/{id}


request


```json
{
   "first_name": "john",
    "last_name": "McKee",
    "password": "password123",
    "email": "Thomas@example.com",
}
```


Responses: 200 OK


```json
{
   "first_name": "john",
    "last_name": "McKee",
    "password": "password123",
    "email": "Thomas@example.com",
}
```
other responses


400 Bad Request


#### deleting an account 


  DELETE /users/{id}


response


204 : not found




400 Bad Request



### syndicates


#### this gets a list of all the syndicates

GET /syndicates





response 200: OK


```json
[
{
    "id": "1",
    "created_date": "24/09/2020",
    "name": "top syndicate",
    "description": "good syndicate",
    "avatar": "image.png",
       "owner": { 
        "user_id": "3",
        "name": "Thomas",
       
    },
}

]
```


#### this lets you make a syndicate


POST /syndicates/{id}



request


```json
{
    "created_date": "01/10/2022",
    "name": "bestSyndicate",
    "description": "A great syndicate",
    "avatar": "cover photo",
    "owner_id": "1"

}
```


response 200: OK


```json
{
    "id": "2",
    "created_date": "01/10/2022",
    "name": "bestSyndicate",
    "description": "A great syndicate",
    "avatar": "cover photo",
    "owner_id": "2",
}
```
Other responses : 


400 Bad Request


#### this allows users to update their syndicate


PUT /syndicates/{id}
 

request


```json
{
   
    "name": "new name for syndicate",
    "description": "A great syndicate",
    "avatar": "cover photo",


}
```

response 200: OK


```json
{
    "id": "2",
    "date": "01/10/2022",
    "name": "new syndicate name",
    "description": "A great syndicate",
    "avatar": "cover photo",

}
```
Other responses : 




400 Bad Request



#### delete syndicates 


DELETE /syndicates/{id}


204: not found


### user syndicates

#### this gets the syndicates a user is a part of


GET /users/{id}/syndicates

response 200


```json
{
    "id": "1",
    "created_date": "02:10:2022",
    "name": "syndicate",
    "user_id": "1",
    "syndicate": {
        "syndicate_id": "1",
        "syndicate_name": "new syndicate",
    },
    "role_id": "1",

},
{
    "id": "2",
    "created_date": "09:02:2023",
     "user_id": "2",
      "syndicate": {
        "syndicate_id": "3",
        "syndicate_name": "second syndicate"
      },
      "role_id": "2"
}
```
other responses 

400: Bad Request


#### creates user syndicate

POST users/{id}/syndicates/{id}



response 200 : success


```json

    {
  
    "created_": "20/10/2021",

}

```

response: 201 - OK






400: bad request




#### deletes a user syndicate


DELETE /users/{id}/syndicate/{id}


response : 204 no data

### user_syndicates


#### getting user syndicates


GET users/{id}/syndicates


response 200 OK


```json

    {
    "id": "3",
    "created_date": "3/08/2022",
    "syndicate": {
        "id": "1",
        "name": "first syndicate"
    },
    "user": {
        "id": "2",
        "name":"Thomas"
    },
    "role": {
        "id": "1",
        "name": "master"    },
    }

```
response: 404 - not found



### games

#### showing the different games


GET /games


response 200: OK


```json
{
"id": "1",
"date": "10/09/2015",
"title": "powerball",
"reward": "2000",
"number_of_tickets": "5",
"user_syndicate": {
    "id":"1",
    "user_id":{
        "id": "3",
        "name":"Thomas"
    }
}
}
```

#### creating a game



POST /syndicates/{id}/games

request


```json

{
"date": "10/10/2022",
"title": "Euromillions",
"reward": "9000",
"number_of_tickets": "5",
"user_syndicate_id": "1"
}

```


response 200 OK


```json
{
"id": "2",
"date": "10/10/2022",
"title": "Euromillions",
"reward": "9000",
"number_of_tickets": "5",
"user_syndicate_id": "1"
}
```


other responses 


400 : bad request

#### updating a game


PUT /syndicates/{id}/games


request


```json
{

"name": "national Lottery",
"number_of_tickets": "7",
"user_syndicate_id": "1"
}
```
response : 200 OK


```json
{
"id": "3",
"date": "10/10/2022",
"name": "national Lottery",
"number_of_tickets": "7",
"user_syndicate_id": "1"
}
```
other responses 


400 : bad request


### message board

#### getting a message board
GET syndicate/{id}/boards

response

```json
{
    "id": "1",
    "name": "test message board",
    "messages":[{
    "date": "10/12/2020",
    "id": "1",
    "users":{
    "id": "1",
     "name": "Thomas"
    },
"body":"hi whats up"
    },{
     "id": "2",
     "date":"10/12/2020",
        "body":"im great whats up with you"   ,
            "users":{
          "id": "1",
     "name": "Thomas"
        },
    }]
}
```

other responses 


400 : bad request


#### returns a syndicate's boards


GET syndicates{id}/boards


response


```json

[{
{
    "id": "1",
"name": "example board name",
 "syndicate":{
        "id": "3",
        "name": "Thomas's 2nd syndicate",
    },
},
{
    "id": "3",
    "name":"syndicates board",
    "syndicate":{
        "id": "2",
        "name": "Thomas's syndicate",
    },
}
}],
```
other responses 


400 : bad request


#### create a board





POST /boards


request


```json
{
"name": "powerball message board",
"syndicate_id": "1"
}
```


response:
 200: OK
 ```json
 {
"id":"1",
"name": "powerball message board",
"syndicate_id": "1"
}
```



#### creating a message
POST /boards/{id}/messages


request
```json
[{
"message": "hi, whats up",
"date": "20/10/2020",
"board_id": "1",
"user_syndicate_id": "1",
}]
```

response : 200
```json
[{
    "id": "1",
"message": "hi, whats up",
"date": "20/10/2020",
"board_id": "1",
"user_syndicate_id": "1",
}]
```

#### getting all messages


GET /boards/{id}/messages
```json
{
    "id": "1",
    "message": "hi, whats up",
    "date": "20/10/2020",
    "board": {
        "id": "1",
        "name":"fun board"
    },
    "user_syndicate": {
        "user_id": {
            "id": "3",
            "name": "Thomas"
        },
        "syndicate": {
            "id": "3",
            "name": "new syndicate"
        }
    }
}


```
respones 


400: bad request






### tickets and outcomes


#### getting the tickets by game

GET games/{id}/tickets

response
```json
[{
    "id": "1",
    "ticket_code": "PG0341O",
    "reward": "0",
    "ticket_status":{
        "id": "3",
        "name": "pending"
    },
     "user_syndicate": {
        "user": {
            "id": "3",
            "name": "Thomas"
        },
        "syndicate": {
            "id": "3",
            "name": "new syndicate"
        },
    

},
{
    "id": "2",
   "ticket_code": "PGq34w4",
    "reward": "0",
      "ticket_status":{
        "id": "3",
        "name": "pending"
    },
    "user_syndicate": {
        "users": {
            "id": "3",
            "name": "Thomas"
        },
        "syndicates": {
            "id": "3",
            "name": "new syndicate"
        },
  
},
{
    "id": "3",
    "ticket_code": "P840193",
    "reward": "0",
      "ticket_status":{
        "id": "3",
        "name": "pending"
    },
    "user_syndicate_id": {
        "user_id": {
            "id": "3",
            "name": "Thomas"
        },
        "syndicate_id": {
            "id": "3",
            "name": "new syndicate"
        },
    "game_id": "1"
}]

```
other responses: 

400: bad request



#### adding a ticket
POST /syndicates/{id}/games/{id}/tickets


request : 


```json
{
"ticket_code": "PA34129",
"reward": "0",
"ticket_status_id": "3",
    "user_syndicate_id": "3",
    "game_id": "1"

}
```
response : 200 OK


```json
{
"id": "4",
"ticket_code": "PA34129",
"reward": "0",
"ticket_status_id": "3",
    "user_syndicate_id": "3",
    "game_id": "1"

}
```
other responses: 

400: bad request


404: no data


#### updating tickets if user wins

PUT /tickets{id}


request 


```json
{

"reward": "100",


}
```
response : 200 - OK
```json


{
"id": "4",
"reward": "100",


}

```


#### deleting a ticket

DELETE /tickets/{id}


response

204 - no data
other responses


400: bad request





### other functions
 
 #### getting a syndicate's reviews


 GET syndicates/{id}/reviews

 ```json
 [{
    "id": "1",
    "title": "disappointing",
    "content":"very disappointed with this syndicate, they stole my money",
    "users": {
        "id": "3",
        "name": "Thomas"
    },
      "syndicate":{
        "id":"1",
        "name":"thomas's syndicate",
    }
 },
 {
    "id": "2",
        "title": "great",
    "content":"they worked very well with me",
      "users": {
        "id": "2",
        "name": "phil"
    },
    "syndicate":{
        "id":"1",
        "name":"thomas's syndicate",
    }
 }
 ]
 ```
 other responses 


 400: bad request




