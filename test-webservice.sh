#Get Users
curl http://localhost:3000/api/users

#Get Terminals
curl http://localhost:3000/api/terminals


#Create User
curl --data "param1=value1&param2=value2" http://localhost:3000/api/user

#Create Terminal
curl --data "param1=value1&param2=value2" http://localhost:3000/api/user


#Update User Info
#curl -X PUT --data "id=0&name=value2&username=value3&phone=23232323&email=value3" http://localhost:3000/api/user/0/name/samix/email/samix@samix.co
curl -X PUT  --data "id=0&name=value2&username=value3&phone=23232323&email=value3" http://localhost:3000/api/user/0

#Check top
curl http://localhost:3000/api/tap/0/timestamp/100/

curl http://localhost:3000/api/tap/1/timestamp/400/
