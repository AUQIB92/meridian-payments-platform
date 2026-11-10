FROM node:16-bullseye
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY src ./src
EXPOSE 8443
CMD ["node", "src/signing.js"]
