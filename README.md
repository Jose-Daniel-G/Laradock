# 🐳 API Stack — Laravel + Docker

![Laravel](https://img.shields.io/badge/Laravel-11-red?style=flat-square)
![PHP](https://img.shields.io/badge/PHP-8.3-blue?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square)
![Nginx](https://img.shields.io/badge/Nginx-proxy-green?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8-orange?style=flat-square)
![Wordpress](https://img.shields.io/badge/Wordpress-7.0-blue?style=flat-square)

Entorno de desarrollo y producción para una API REST en Laravel, orquestado con Docker Compose. Incluye Nginx como proxy reverso y MySQL como base de datos.

---

## 📁 Estructura del proyecto

```
api-stack/
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
└── docker-compose/
    └── nginx/
        └── laravel.conf         # Configuración de Nginx
```

---

## 🚀 Instalación desde cero

### Paso 1 — Levantar la infraestructura

```bash
docker compose up -d --build
```

### Paso 2 — Configurar el entorno

Copia la plantilla de variables de entorno:

```bash
cp .env.example .env
```

Edita `.env` con los siguientes valores de base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=db             # Nombre del servicio en docker-compose.yml, no "localhost"
DB_PORT=3306
DB_DATABASE=laravel_db # Debe coincidir con el valor definido en docker-compose.yml
DB_USERNAME=root
DB_PASSWORD=root
```

> ⚠️ **`DB_HOST` debe ser `db`**, el nombre del contenedor definido en `docker-compose.yml`, no `localhost`.

### Paso 3 — Inicializar Laravel

```bash
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

---

## SOLO si no esta en docker-compose.yml 🖥️ Frontend (Angular) 

En la raíz del proyecto Angular, ejecuta:

```bash
# Construir imagen con Node 22 y Nginx internos
docker build -t front-stack-app .

# Exponer la app en el puerto 4200
docker run -d -p 4200:80 --name angular-frontend front-stack-app
```

---

## ⚡ Comandos del día a día

| Acción | Comando |
|---|---|
| Encender todo el ecosistema | `docker compose up -d` |
| Apagar todo | `docker compose down` |
| Ver logs en tiempo real | `docker compose logs -f` |
| Entrar al contenedor de la app | `docker compose exec app bash` |
| Reconstruir imágenes | `docker compose up -d --build` |

---

## 🔒 Laravel Sanctum (autenticación de API)

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

---

## 🛠️ Generación de recursos

```bash
# Genera Model + Migration + Resource Controller en un solo comando
php artisan make:model Task -mrc
```

El flag `-mrc` crea simultáneamente el modelo, su migración y un controlador con todos los métodos REST (`index`, `store`, `show`, `update`, `destroy`).

---

## 🌐 Integración con WordPress (opcional)

Si el proyecto consume contenido desde una instalación de WordPress, debes apuntar al endpoint de la REST API de WP. Agrega estas variables a tu `.env`:

```env
WORDPRESS_API_URL=http://laraword.test/wp-json/wp/v2
WORDPRESS_API_USER=josedgo
WORDPRESS_API_PASSWORD="**** **** **** **** **** ****@"
```

> 🔑 La contraseña corresponde a una **Application Password** generada desde el panel de WordPress (`Usuarios → Editar perfil → Contraseñas de aplicación`). No es la contraseña de acceso al admin.

> ⚠️ **Nunca subas el `.env` al repositorio.** Asegúrate de que `.env` esté en tu `.gitignore`.


## Si ya esta configurado DOCKER en el proyecto 
docker compose up -d  > Para encender todo el ecosistema
docker compose down   > Para apagar absolutamente todo

# Forzamos la reconstrucción completa del frontend con los nuevos archivos en assets
docker compose build --no-cache frontend
docker compose up -d