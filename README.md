# syndicate lotto manager application
## Overview

This application serves as a manager for various lottery syndicates. It allows users to log in as a lottery syndicate manager, create a syndicate, cutomise their syndicate.
inside that syndicate the users are able to create games, and minigames.

It allows users to log on as a player, search for different syndicates and deposit money into these games

it allows the lottery syndicate manager to buy tickets with the pooled money in the treasury

it allows the user to to take profile phots

it allows the user to chat with other users involved in the syndicate

there are also archived games.



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
•	All users must be able to log in to the application


•	All users must be able to sign up to the application as a syndicate manager


•	All users must be able to sign up to the application as a player


•	All users must be able to view all the syndicates they are apart of
•	All users must be able to create lottery syndicates as a syndicate manager
•	Players must be able to join syndicates
•	Players must have access to all the different game types provided by the national lottery
•	players must be able to play games and deposit money into a pot/treasury
•	syndicate managers must be able to create games that players can join 
•	all users must be able to enter their games and chat with other players
•	syndicate managers must be able to enter tickets and have the cost of each ticket enter their balance
•	all users must be able to view how much they have deposited and how much they should receive from the reward.


### Should have
.•	players and big players should be able to deposit more money into a game after initial deposit
•	big players must be able to join games with limited players, and higher necessary deposits
•	users should be able to join and leave a syndicate
•	a syndicate manager should be able to remove players from the syndicate
•	a syndicate manager should be able to promote and demote players
•	all users should be able to view a countdown, that in a real world sense would be in sync with the actual draws
•	all users should be able to take a profile photo, for extra verification
•	players should be able to join one of each game type in each syndicate.
•	All users should be able to effectively use this on a mobile and a computer
•	All users should have an easy experience navigating this application. 
•	All users should be able to select different types of tickets for different games, for example some games have balls.
•	All users should be able to view any archived games
•	All users should be able to access this application from a specific domain name
•	All the users personal data must be hashed so no one can get access to sensitive information

### Could have
.•	players could be able to easily delete their profile
•	Players and big players could be able to leave a game and withdraw their funds safely
•	Players could be able to set up  a direct debit system to automatically play games with a fixed deposit weekly(standing order).
•	Players, big players and syndicate managers could be able to become friends with other users and communicate with them on a direct message basis
•	Syndicate managers could be able to invite other users to join a particular syndicate
•	Big Players could be able to invite other users to play a game by generating an invite code
•	Players could be able to deposit and withdraw up to a specific time period, then their funds would be locked in
•	Players could be able to view other players profiles, and see what syndicates they are a part of

### Will not have
.•	The application wont have a simulation of the actual lottery, to demonstrate what happens when the game is won  
•	The application wont use any form of age verification to make sure people are legally buying lottery tickets 
•	The application wont have any real money, this is because it would require permission from a bank.  
•	The application wont have any actual way to verify the lottery tickets because it is out of scope, but ideally if the project was to be used it would need this 
•	The application wont have real time lottery information, it will be a simulation 
•	The application wont have a forgot password function  

```mermaid
erDiagram
   erDiagram
    user_types {
        int id PK
        varchar(255) name 
    }
    users {
        int id PK
        varchar(255) first_name
        varchar(255) last_name
        varchar(255) image
        varchar(255) password
        varchar(255) email
        float balance
        int user_type_id FK
    }
    syndicates {
        int id PK
        date created_date
        varchar(255) name
        text description
        varchar(255) avatar
        int owner_id FK
    }
    user_syndicate_reviews {
        int id PK
        date created_date
        varchar(255) title
        text content
        int user_id FK
        int syndicate_id FK
    }
    roles {
        int id PK
        varchar(255) name
    }
    user_syndicates {
        int id PK
        date start_date
        int user_id FK
        int syndicate_id FK
        int role_id FK
    }
    game_types {
        int id PK
        varchar(255) name
        date draw_date
        float reward
        varchar(255) image
        float ticket_cost
    }
    games {
        int id PK
        float maximum_players
        float treasury
        int syndicate_id FK
        int game_type_id FK
    }
    user_games {
        int id PK
        date start_date
        float deposit
        int role_id FK
        int game_id FK
        int user_id FK
    }
    ticket_status {
        int id PK
        varchar(255) name
    }
    game_user_game_ticket {
        int id PK
        varchar(255) ticket_code
        float total_reward_value
        int ticket_status_id FK
        int game_id FK
    }
    boards {
        int id PK
        varchar(255) name
        int game_id FK
    }
    board_message {
        int id PK
        text message
        date created_date
        int board_id FK
        int user_game_id FK
    }
    
    user_types ||--o{ users : user_type_id
    users ||--o{ syndicates : owner_id
    users ||--o{ user_syndicate_reviews : user_id
    syndicates ||--o{ user_syndicate_reviews : syndicate_id
    users ||--o{ user_syndicates : user_id
    syndicates ||--o{ user_syndicates : syndicate_id
    roles ||--o{ user_syndicates : role_id
    syndicates ||--o{ games : syndicate_id
    game_types ||--o{ games : game_type_id
    users ||--o{ user_games : user_id
    games ||--o{ user_games : game_id
    roles ||--o{ user_games : role_id
    ticket_status ||--o{ game_user_game_ticket : ticket_status_id
    games ||--o{ game_user_game_ticket : game_id
    games ||--o{ boards : game_id
    boards ||--o{ board_message : board_id
    user_games ||--o{ board_message : user_game_id

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
    "password": "qwerty12@",
    "email": "john@example.com",
    "balance": 2000

  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "smith",
    "password":"qwerty21",
    "email": "jane@example.com",
    "balance": 200,
    
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




