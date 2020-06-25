FROM node:latest
WORKDIR /user/src/app/pp_tefeta
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", ".dist/tefeta.js"]