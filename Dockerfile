FROM node:16-alpine
RUN mkdir -p /home/app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /home/app
RUN chown -R appuser:appgroup /home/app
USER appuser
LABEL author="Mohd Jeeshan"
LABEL automation="api"
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
ENTRYPOINT [ "npm" ]
CMD [ "run", "test" ]