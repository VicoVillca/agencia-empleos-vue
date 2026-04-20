# Agencia de Empleos — Proyecto Final Vue 3

Aplicación web desarrollada con **Vue 3 + Vite** como proyecto final. Consiste en un sistema de reclutamiento y gestión de talento (Agencia de Empleos) interactuando con una API Fake REST (JSON Server).

Permite gestionar ofertas laborales agrupadas por categoría y controlar las postulaciones que envían los distintos candidatos. Incorpora filtrado en vivo, buscadores por coincidencia, rutas dinámicas y autenticación con Json Web Tokens.

---

## Tecnologías

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router 4 (rutas dinámicas, protección de rutas)
- Axios (con integraciones de Interceptors)
- JSON Server + JSON Server Auth
- Bootstrap 5 (Estilos base y UI)
- Variables de entorno (`.env`)

---

## Entidades del Sistema

| Entidad | Descripción |
|---------|-------------|
| **Categorías** | Rubros o sectores a los cuales pertenece un trabajo. |
| **Trabajos** | Ofertas de empleo publicadas, ligadas con una `categoriaId`. |
| **Postulaciones** | Registro de candidatos aplicando a un empleo, ligadas con un `trabajoId`. |
| **Usuarios** | Credenciales autorizadas para visualizar y manipular datos (vía `json-server-auth`). |

---

## Requisitos previos

- Node.js `>= 20.19.0` o `>= 22.12.0`
- npm

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/VicoVillca/agencia-empleos-vue.git
cd agencia-empleos-vue
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz de la carpeta `agencia-empleos-vue/` con el siguiente contenido:

```
VITE_API_URL=http://localhost:3000
VITE_TIMEOUT=10000
```

### 4. Ejecutar el proyecto

El comando principal `npm run dev` emplea la dependencia `concurrently` para ejecutar de manera paralela y silenciosa el proyecto frontend y el motor backend en una sola terminal:

```bash
npm run dev
```

- Pantalla (Frontend): [http://localhost:5173](http://localhost:5173)
- Base de datos (Backend): [http://localhost:3000](http://localhost:3000)

---

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia frontend + backend simultáneamente. |
| `npm run server` | Inicializa el backend standalone (JSON Server) en el puerto 3000. |
| `npm run build-only` | Compila el dist final para producción (usando Vite Build). |
| `npm run type-check` | Emite la validación estática de TypeScript para Vue-Tsc. |
| `npm run preview` | Levanta el live server de vista previa nativa. |

---

## Usuario de prueba

El archivo DB raíz `db.json` se entrega empaquetado junto a la app. Cuenta con un usuario de privilegios para superar la capa de login:

| Campo | Valor |
|-------|-------|
| Email | `admin@email.com` |
| Password | `123456` |

---

## Funcionalidades implementadas

- **CRUD completo** para Categorías, Trabajos y Postulaciones.
- **Relaciones complejas** entre entidades inyectando `_expand` al interactuar con Axios.
- **Doble Filtro combinable** en vivo: texto de búsqueda global y desplegable de categorías limitantes.
- **Rutas dinámicas anidadas**: Detalles absolutos visibles en los Job Details (`/trabajos/:id`).
- **Autenticación centralizada**: Rutas bloqueadas en los routers de Vue y accesos controlados vía Headers de autorización (JWT Tokens).
- **Diseño clásico responsivo**: Estructuras limpias apoyadas en clases convencionales de CSS y *Bootstrap 5* sin dependencias oscuras.
