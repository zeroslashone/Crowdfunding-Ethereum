#Base Image of the Docker File [Alpine version of Linux with Node]
FROM node:alpine3.12

#Set Working Directory
WORKDIR /app

#Move everything to the working directory
COPY ./package.json ./

#Install all the dependencies
RUN apk add git
RUN yarn install

#Copy Everything to Working Directory
COPY . ./

#Create a production build of the app
RUN yarn build

#Run the start command 
CMD [ "yarn","start" ]