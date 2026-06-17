# 1. Usamos la imagen oficial de PHP con FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /var/www

# 3. Instalamos las dependencias del sistema que necesita Laravel y extensiones de PHP
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev

# 4. Limpiamos el caché de instalación para que la imagen pese menos
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 5. Instalamos las extensiones de PHP cruciales para bases de datos (MySQL)
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# 6. Descargamos e instalamos Composer de forma oficial desde su imagen de Docker
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Copiamos los archivos de nuestro proyecto Laravel al contenedor
COPY . /var/www

# 8. Otorgamos los permisos correctos a las carpetas de almacenamiento de Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 9. Exponemos el puerto interno 9000 para que el servidor web se comunique con PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]