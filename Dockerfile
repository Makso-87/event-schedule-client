FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

RUN chown -R node /app
USER node

RUN npm run build

CMD ["npm", "start"]