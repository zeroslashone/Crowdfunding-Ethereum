#Base Image of the Docker File [Alpine version of Linux with Node]
FROM node:alpine3.12

#Set Working Directory
WORKDIR /app

#Move everything to the working directory
COPY . /app

#Install all the dependencies and create a production build of the app
RUN apk add git
RUN yarn install
RUN yarn build

#Set the yarn entrypoint
ENTRYPOINT [ "yarn" ]

#Run the start command 
CMD [ "start" ]

#Expose port 8081 to the outside once the container has launched
EXPOSE 8081