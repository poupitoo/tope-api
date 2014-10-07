## RESTful URLs

### Users

* List all users:
    * GET http://tope-it.com/api/users

* Create an user:
    * POST http://tope-it.com/api/user

Request body:

    [
        {}
    ]

* Update an user's information:
    * PUT http://tope-it.com/api/user/:id

Request body:

    [
        {
            "userId" : 1
            "name" : "Jane",
            "username" : "Jany",
            "email" : "Jane@top-it.com",
            "phone" : "0612435687"
        }
    ]

### Terminals

* List all terminals:
    * GET http://tope-it.com/api/terminals

* Create a terminal:
    * POST http://tope-it.com/api/terminal

Request body:

    [
        {}
    ]

* Update a terminal's information:
    * PUT http://tope-it.com/api/terminal/:id

Request body:

    [
        {
            "userId" : 1
            "name" : "someClientName",
            "username" : "somePlaceBorne",
            "email" : "client@client.com",
            "phone" : "0612435687"
        }
    ]

### Others

* Create a top
    * GET http://tope-it.com/api/tap/:userId/timestamp/:timestamp

* Get server's timestamp
    * GET http://tope-it.com/api/timestamp

* Send an email
    * GET http://tope-it.com/api/mail/:userEmail