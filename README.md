# Phonebook API
### Phonebook API service in NodeJS, Express and MongoDB
### Requirements
Write a Javascript based server (preferably using NodeJS and Express) that acts as an API and provides Phonebook services.
The phonebook should contain phone numbers and subscribers.
For any subscriber, one or more phone numbers can be assigned.
For any phone number exactly one subscriber can be assigned.
The records of the phonebook can be stored in a database, or locally on the server in the data structure of your choice.
Make sure there are some pre-set records when you hand in your homework, so your server can be tested. (either by filling the local data structure, or sql commands to fill the database with example records)
Subscriber's name could be anything.
Incoming phone number's format should be validated against a pre-set regexp for EVERY request. Use Middleware for it if you can. Return an error message when the phone number was malformed in the request without fulfilling the original request.

Your API server should accept the following html requests:

1. GET request to receive all the phonebook records in JSON format
2. GET request that expects a phone number, and returns either the subscriber's name belonging to it, or a not found message (use correct HTML response codes in both cases)
3. GET request that expects a subscriber's name and returns either all the phone numbers belinging to him/her, or a not found message (use correct HTML response codes in both cases)
4. POST request that expects a name and a phone number, and adds these to your phonebook as a pair. Send an OK response if it is added, or an error message when the exact same record is already in the phonebook, or if the input is malformed. (use correct HTML response codes in all cases)
5. POST request that expects a name and a phone number, and deletes the record defined by the input parameters. Send an OK response if it was deleted, or a not found message if the given record is not in the phonebook. (use correct HTML response codes in both cases)

Provide an example input for the requests you were able to finish during the homework in a text file.
Write clean, well-organized, self documenting code.
