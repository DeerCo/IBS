# Create a new user with sudo access
```
sudo adduser ibs
sudo usermod -aG sudo ibs
sudo su ibs
git clone https://github.com/DeerCo/IBS.git
cd ~/IBS
```

# Install Node 18
```
curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install -y nodejs
```

# Install and setup PostgreSQL
```
sudo apt-get install -y postgresql postgresql-contrib libpq-dev
sudo -u postgres createuser ibs
sudo -u postgres createdb ibs
sudo -u ibs psql
\password
\i backend/utilities/db.sql
INSERT INTO user_info (username, password, email, admin) VALUES ('admin', crypt('pass', gen_salt('bf', 8)), 'admin@utoronto.ca', true);
quit
```

# Setup the backend
```
cd ~/IBS/backend
npm install
cp utilities/env_template.txt .env
vim .env
```


# Run the backend
```
npm start
```

# Deploy the backend using PM2
```
sudo npm install -g pm2
pm2 start ~/IBS/backend/app.js
```
