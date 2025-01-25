
FROM nginx:latest

COPY html/ /usr/share/nginx/html
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

#RUN apt-get update && apt-get install vim -y
#RUN apt-get update 
#RUN apt-get install vim -y

#FROM ubuntu:latest
#ENTRYPOINT [ "echo", "Always execute!" ]
#CMD [ "What a great saturday!" ]