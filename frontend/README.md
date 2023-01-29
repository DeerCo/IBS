# Setup the frontend
```
cd ~/DeerCo/frontend
npm install
cp utilities/env_template.txt .env
vim .env
```

# Run the frontend
```
npm start
```

# Deploy the frontend using PM2
```
sudo npm install -g pm2 serve
npm run build
pm2 serve -s build/ PORT_NUMBER --name "frontend" --spa
```
