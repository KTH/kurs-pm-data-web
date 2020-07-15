FROM kthse/kth-nodejs:12.0.0
LABEL maintainer="KTH-Webb web-developers@kth.se"

WORKDIR /application

COPY ["config", "config"]
COPY ["i18n", "i18n"]
COPY ["public", "public"]
COPY ["server", "server"]

COPY [".babelrc", ".babelrc"]
COPY ["app.js", "app.js"]
COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

RUN apk add --no-cache --virtual .gyp-dependencies python make g++ util-linux && \
  npm run docker && \
  apk del .gyp-dependencies

EXPOSE 3000

ENV NODE_PATH /application
CMD ["node", "app.js"]
