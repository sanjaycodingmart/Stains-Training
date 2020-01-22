FROM node:alpine
WORKDIR /usr
COPY ./package.json ./
RUN npm install
RUN npm install express cors pg @sendgrid/mail
COPY . .

CMD [ "npm", "start"]