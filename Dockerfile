FROM node:latest
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
ENV MONGO_UNAME=Osama
ENV MONGO_PASS=Osama
EXPOSE 5000
CMD [ "node", "index.js" ]