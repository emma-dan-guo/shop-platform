# Demo Address: http://goodapp.ca
# Order Analysis System

Analyzing and visualizing orders to promote business success!

## Getting Started

node version: >= 18

package management tools: yarn

### Debuging And Testing

```bash
npm install yarn

# start the front-end service
yarn
yarn start

# start the back-end service
cd ./server
export DATABASE_URL='mysql://<user>:<password>@<host>:<port>/<dbname>'  # DSN

# initialize database as follows if needs
npx prisma migrate dev --name init
npx prisma generate

# importing data if wants to debug
python3 ./test/mooc_data.py  # inserting around 10000 rows

# perhaps, do something if troubleshooting
# ...

# start back-end service and listen at the address http://localhost:8000
yarn watch
```

### Deployment
Before deploying, you must finish all of initialization chores, such as installing dependencies and setting up database.

```bash
# advice to use nginx
# nginx demo configuration file: deploy/nginx.conf
# modify the file for your own path

# compile front-end files
# at the root directory
npm run build

# make sure nginx can redirect the static files to your compiled product

# we can copy pre-written scripts to help us start / stop the service
cp ./server/deploy/start.sh ./server
# give your own DSN by updating the following file
vim ./server/start.sh

cp ./server/deploy/stop.sh ./server

cd ./server
chmod +x ./start.sh

# start the back-end service
# the running service logs to nohup.log
./start.sh

# if we want to stop the service
./stop.sh

```

# A live Demo

Visit the following website you can get a demo page of the project:

> http://goodapp.ca

Notice: (Not used SSL/TLS yet)
