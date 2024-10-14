### Backend  nodejs + express + MongoDB

# nodejs + express
1. npm install
2. npm run start

# MongoDB Installation
## Ubuntu :
1. sudo apt-get install gnupg curl
2. curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
3. echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

4. sudo apt-get update

5. sudo apt-get install -y mongodb-org

## Windows: 

1. 載點: https://www.mongodb.com/try/download/community