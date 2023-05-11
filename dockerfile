FROM node:16.16.0-alpine

WORKDIR /trying

COPY ../
RUN npm install bcrypt
RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 3005