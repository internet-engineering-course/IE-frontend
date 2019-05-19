# node commands
npm install
npm install -g serve
npm run build
serve -s build

# docker commands
docker build -t joboonja-frontend .
docker run -d -p 5000:5000 joboonja-frontend