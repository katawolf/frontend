FROM node:10.18.1-jessie-slim as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn test:ci && yarn build

FROM nginx:1.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.template
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
CMD envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
