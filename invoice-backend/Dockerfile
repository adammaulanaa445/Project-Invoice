FROM php:8.2-cli

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl ca-certificates \
    chromium fonts-liberation \
    nodejs npm \
    && docker-php-ext-install pdo pdo_mysql zip bcmath \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV CHROME_PATH=/usr/bin/chromium

RUN node --version && npm --version && chromium --version

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

COPY . .

RUN npm install --omit=dev \
    && composer dump-autoload --optimize \
    && chmod -R 775 storage bootstrap/cache

ENV PHP_CLI_SERVER_WORKERS=4

EXPOSE 8000

CMD ["sh", "-c", "echo BOOTING PORT=$PORT && php artisan serve --host=0.0.0.0 --port=${PORT:-8000} --no-reload"]
