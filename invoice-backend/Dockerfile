FROM php:8.2-cli

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chmod -R 775 storage bootstrap/cache

# EXPOSE cuma dokumentasi, Railway tetap route ke $PORT saat runtime
EXPOSE 10000

# Pakai $PORT dari environment Railway, fallback ke 10000 kalau dijalankan lokal tanpa env PORT
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}