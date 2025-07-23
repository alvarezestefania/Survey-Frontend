# Survey App (React)

Este proyecto es una aplicación web frontend desarrollada con **React 19**, diseñada para interactuar con una API REST de gestión de encuestas. La aplicación permite a los usuarios registrarse, autenticarse y completar una encuesta sobre desafíos operativos en droguerías, consumiendo los servicios del backend Laravel.

## 🔍 Descripción general

La aplicación permite:

- Registro y autenticación de usuarios con manejo de cookies
- Navegación protegida basada en estado de autenticación
- Completar encuesta con diferentes tipos de campos (texto, radio, checkbox, select, range)
- Visualizar respuestas previamente registradas por el usuario
- Interfaz responsive con componentes de Ant Design

---

## 🚀 Instrucciones para ejecutar el proyecto

### 📋 Requisitos previos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Backend Survey API ejecutándose (ver [repositorio Survey-Backend](https://github.com/alvarezestefania/Survey-Backend))

### 1. Clonar el repositorio

```bash
    git clone https://github.com/tu-usuario/Survey-Frontend.git
```

### 2. Ir a la carpeta del proyecto

```bash
    cd Survey-Frontend
```

### 3. Cambiarse a la rama develop

```bash
    git checkout develop
```

### 4. Instalar dependencias con npm

```bash
    npm install
```

### 5. Copiar archivo de variables de entorno

```bash
    cp .env.local.example .env.local
```

### 6. Levantar el servidor de desarrollo

```bash
    npm start
```

💡 La aplicación estará disponible en http://localhost:3000

## 🌐 Funcionalidades principales

- **Autenticación:** Login/registro con gestión de tokens y cookies
- **Rutas protegidas:** Navegación condicional según estado de usuario
- **Formulario dinámico:** Campos adaptativos según tipo de pregunta
- **Gestión de estado:** Hooks personalizados para autenticación y encuestas
- **Validación:** Validación en tiempo real de formularios
- **Responsive:** Diseño adaptable con Ant Design

## 🛠️ Tecnologías utilizadas

- **React 19** - Librería principal
- **React Router DOM 7.7.0** - Navegación y rutas
- **Ant Design** - Componentes UI
- **Axios 1.10.0** - Cliente HTTP para API
- **React Cookie 8.0.1** - Manejo de cookies para autenticación

## 🧠 Notas adicionales

- Las funcionalidades están organizadas en ramas de feature (`feat/auth`, `feat/survey`) y luego integradas en develop
- La rama `master` se mantiene limpia como rama base

🧑‍💻 Autor
Estefanía Álvarez
