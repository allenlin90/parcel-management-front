FROM node AS development

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY ./ /usr/src/app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 8000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]
