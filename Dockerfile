FROM node:10.18.1-jessie-slim as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn test:ci && yarn build

FROM nginx:1.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.template
ENV PORT ${PORT:-80}
ENV DECISION_SERVICE ${DECISION_SERVICE:-decisionservice.katawolf.jtutzo.fr}
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE ${PORT:-80}
CMD envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
