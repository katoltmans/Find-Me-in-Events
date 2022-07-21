#!/bin/bash
git pull
pm2 status
pm2 stop server
cd Client
npm install --force
npm run build
sudo rm -rf /var/www/html 
sudo mv build /var/www/html
sudo service nginx restart
sudo grep -rl localhost /var/www/html | xargs sed -i 's/http:\/\/localhost:8000//g'
cd ../Server
npm install --force
pm2 start server.js
pm2 status