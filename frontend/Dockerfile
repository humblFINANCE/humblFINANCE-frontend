FROM node:20.12.2-alpine as Builder

WORKDIR /frontend
COPY ./package.json ./package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]


