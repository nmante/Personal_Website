cp -rf bin/* ../personal.backend/public/
cd ../personal.backend
scp -r public/* $AWS_PERSONAL_IP:/home/ubuntu/www/niimante.com/public
