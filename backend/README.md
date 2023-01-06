# Create a new user with sudo access
```
sudo adduser ibs
sudo usermod -aG sudo ibs
sudo su ibs
git clone https://github.com/DeerCo/DeerCo.git
cd ~/DeerCo
```

# Install Node.js
```
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
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
quit
```

# Setup the backend
```
cd ~/DeerCo/backend
npm install
cp utilities/env_template.txt .env
```

# Run the backend
```
sudo npm install -g pm2
pm2 start ~/DeerCo/backend/app.js
```
