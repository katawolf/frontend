FROM node:10.18.1-jessie-slim as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn test:ci && yarn build

FROM nginx:1.12-alpine
COPY nginx.conf /etc/nginx/templates/default.template
ENV PORT ${PORT:-80}
ENV DECISION_SERVICE_URL ${DECISION_SERVICE_URL:-"http://localhost:3000"}
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE ${PORT:-80}
CMD envsubst < /etc/nginx/templates/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
