FROM php:7.4-cli

WORKDIR /var/www

RUN apt-get update && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip
 
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel

ENTRYPOINT [ "php", "laravel/artisan", "serve" ]

# Can be used as 
# docker run --rm --name laravel -d -p 8001:8001 kleberaluizio/laravel --host=0.0.0.0 --port=8001
# change default port which is 8000
CMD [ "--host=0.0.0.0" ] 