FROM centos:8

RUN mkdir -p /var/www

WORKDIR /var/www

COPY ./index.js /var/www
COPY ./package-lock.json /var/www
COPY ./package.json /var/www
COPY ./log-config.json /var/www

RUN yum install -y @nodejs:12/common && npm install

EXPOSE 8080

ARG TEST
RUN echo $TEST

CMD ["node", "index.js"]