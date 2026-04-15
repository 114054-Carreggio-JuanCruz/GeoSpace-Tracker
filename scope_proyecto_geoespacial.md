# 🚀 GeoSpace Tracker — Scope del Proyecto

## 1. Visión General

**Sistema de visualización y gestión de eventos espaciales geolocalizados**, permitiendo registrar, consultar y explorar en un mapa interactivo ubicaciones vinculadas a la actividad espacial (lanzamientos, centros de control, estaciones de seguimiento, observatorios, etc.).

**Stack tecnológico:**
- **Backend:** Java (Spring Boot) + MongoDB Driver
- **Frontend:** HTML + CSS + JavaScript vanilla
- **Base de datos:** MongoDB (colección con índice `2dsphere`)
- **Mapa:** Leaflet.js (open source, sin API key)

---

## 2. Modelo de Datos (MongoDB)

### Colección: `eventoEspacial`

```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "tipo": "string",           // lanzamiento | centro_control | estacion | observatorio
  "fecha": "ISODate",
  "ubicacion": {
    "type": "Point",
    "coordinates": [longitud, latitud]
  },
  "detalles": {
    // Propiedades variables según tipo
    "agencia": "string",
    "mision": "string",
    "cobertura": "string"
  }
}
```

**Índice geoespacial:**
```js
db.eventoEspacial.createIndex({ ubicacion: "2dsphere" })
```

### Datos de carga inicial (mínimo 15-20 registros)

Preparar un script `seed.js` o `init-mongo.js` con datos reales:
- Kennedy Space Center, Cabo Cañaveral
- Baikonur Cosmodrome, Kazajistán
- Centro Espacial Guayanés (Kourou)
- Houston Mission Control
- Estación Malargüe (ESA, Argentina)
- Estación Goldstone (DSN, California)
- Estación Madrid (DSN, España)
- Observatorio Paranal (ESO, Chile)
- Tanegashima Space Center (JAXA, Japón)
- Satish Dhawan Space Centre (ISRO, India)
- Wenchang (China)
- Plesetsk Cosmodrome (Rusia)
- Etc.

---

## 3. Funcionalidades (Scope)

### 3.1 CRUD completo sobre `eventoEspacial`

| Operación | Endpoint REST             | Método | Descripción                          |
|-----------|---------------------------|--------|--------------------------------------|
| Crear     | `/api/eventos`            | POST   | Alta de nuevo evento espacial        |
| Listar    | `/api/eventos`            | GET    | Listado completo (con filtros opcionales por `tipo`) |
| Obtener   | `/api/eventos/{id}`       | GET    | Detalle de un evento                 |
| Actualizar| `/api/eventos/{id}`       | PUT    | Modificación de un evento            |
| Eliminar  | `/api/eventos/{id}`       | DELETE | Baja de un evento                    |

### 3.2 Consultas geoespaciales (el diferencial del TP)

| Consulta                  | Endpoint                          | Operador MongoDB       |
|---------------------------|-----------------------------------|------------------------|
| Buscar por proximidad     | `/api/eventos/cerca?lng=X&lat=Y&dist=Z` | `$near` + `$maxDistance` |
| Buscar dentro de un área  | `/api/eventos/dentro`             | `$geoWithin` + `$geometry` (polígono) |
| Buscar por radio          | `/api/eventos/radio?lng=X&lat=Y&radio=Z` | `$geoWithin` + `$centerSphere` |

> **Estas 3 consultas son las que más peso tienen en la presentación.** Demuestran por qué MongoDB es superior a un RDBMS para este caso de uso.

### 3.3 Frontend — Pantallas

| Pantalla         | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Mapa principal** | Mapa Leaflet con markers de todos los eventos. Filtro por tipo. Click en marker → popup con detalle. |
| **Panel lateral / modal** | Formulario para crear/editar evento (nombre, tipo, fecha, coords, detalles). |
| **Búsqueda geoespacial** | Input de coordenadas + distancia → dibuja radio en el mapa y muestra resultados. |
| **Tabla de eventos** | Vista tabular con acciones de editar/eliminar. Ordenable por nombre/fecha/tipo. |

---

## 4. Arquitectura del Proyecto

```
geospace-tracker/
├── backend/                          # Java (Spring Boot)
│   ├── src/main/java/com/geospace/
│   │   ├── model/
│   │   │   └── EventoEspacial.java   # Entidad con GeoJSON Point
│   │   ├── repository/
│   │   │   └── EventoRepository.java # MongoRepository + queries custom
│   │   ├── service/
│   │   │   └── EventoService.java    # Lógica de negocio
│   │   ├── controller/
│   │   │   └── EventoController.java # REST endpoints
│   │   └── config/
│   │       └── MongoConfig.java      # Conexión + índice 2dsphere
│   └── src/main/resources/
│       └── application.properties    # Config MongoDB
│
├── frontend/                         # HTML + CSS + JS vanilla
│   ├── index.html                    # Mapa principal + layout
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js                    # Inicialización del mapa (Leaflet)
│   │   ├── api.js                    # Fetch calls al backend
│   │   ├── eventos.js                # CRUD UI logic
│   │   └── geo.js                    # Lógica de búsqueda geoespacial
│   └── assets/
│       └── markers/                  # Íconos custom por tipo de evento
│
├── scripts/
│   └── seed.js                       # Script de carga inicial de datos
│
└── README.md
```

---

## 5. Asignación de Roles (4 integrantes)

### 👤 Integrante 1 — Backend Core + Base de Datos
**Responsabilidad principal:** Java + MongoDB

- Configurar proyecto Spring Boot con dependencia `spring-boot-starter-data-mongodb`
- Crear el modelo `EventoEspacial` con anotaciones `@Document`, `@GeoSpatialIndexed`
- Implementar `EventoRepository` extendiendo `MongoRepository`
- Implementar los endpoints REST del CRUD
- Escribir el script de seed con los datos iniciales
- Configurar `application.properties` para conexión a MongoDB

**Entregable:** Backend funcional con CRUD operativo vía Postman.

---

### 👤 Integrante 2 — Consultas Geoespaciales + Lógica Avanzada
**Responsabilidad principal:** Queries geoespaciales en Java/MongoDB

- Implementar las 3 consultas geoespaciales (`$near`, `$geoWithin`, `$centerSphere`)
- Crear los endpoints REST específicos para búsquedas geo
- Usar `MongoTemplate` para queries custom con `Criteria` y `NearQuery`
- Documentar cada consulta (qué hace, qué operador usa, ejemplo de request/response)
- Preparar comparativa técnica: cómo se resolvería esto mismo en SQL (para la presentación oral)

**Entregable:** Endpoints geoespaciales funcionando + documento comparativo NoSQL vs SQL.

---

### 👤 Integrante 3 — Frontend: Mapa + Visualización
**Responsabilidad principal:** Leaflet.js + integración visual

- Montar la página principal con Leaflet.js
- Renderizar markers con íconos diferenciados por tipo (🚀 lanzamiento, 🧭 centro, 📡 estación)
- Implementar popups al hacer click en un marker (nombre, tipo, fecha, agencia)
- Dibujar círculos/polígonos en el mapa cuando se ejecuta una búsqueda geoespacial
- Implementar filtro por tipo de evento (checkboxes o botones toggle)
- Diseño responsive para que se vea bien en la presentación con proyector

**Entregable:** Mapa interactivo consumiendo la API del backend.

---

### 👤 Integrante 4 — Frontend: CRUD UI + Presentación
**Responsabilidad principal:** Formularios, tabla, UX y presentación oral

- Formulario de alta/edición de eventos (con selector de coordenadas en el mapa)
- Tabla de eventos con acciones (editar, eliminar, ver en mapa)
- Panel de búsqueda geoespacial (inputs de lat, lng, distancia + botón buscar)
- Feedback visual: loading states, confirmaciones, errores
- CSS general de la aplicación (layout, colores, tipografía)
- Armar la presentación oral (estructura, slides si aplica, guión)

**Entregable:** UI completa del CRUD + presentación armada.

---

## 6. Argumentos para la Presentación Oral

### ¿Por qué MongoDB y no un RDBMS?

| Aspecto | MongoDB (NoSQL) | PostgreSQL/MySQL (SQL) |
|---------|----------------|----------------------|
| Datos geoespaciales | Soporte nativo GeoJSON + índice `2dsphere` | Requiere extensiones (PostGIS) o tipos espaciales limitados |
| Esquema flexible | `detalles` varía por tipo de evento sin migraciones | Requeriría tablas auxiliares o columnas nullable |
| Consultas de proximidad | `$near`, `$geoWithin` nativos y optimizados | Funciones ST_Distance, ST_Within con sintaxis más compleja |
| Rendimiento geo | Índice esférico optimizado para consultas radiales | PostGIS es potente pero con mayor overhead de config |
| Modelo de datos | Un documento = un evento completo (sin JOINs) | Normalización requeriría 2-3 tablas + JOINs |

### Desventajas de MongoDB en este escenario
- Sin transacciones ACID multi-documento (irrelevante para este caso simple)
- Sin JOINs nativos (no los necesitamos, todo está en un documento)
- Menor madurez en herramientas de reporting vs SQL

---

## 7. Cronograma Real — Sprint de 1 día (4 personas en paralelo)

> **Principio rector:** La consigna dice "solamente la muestra de las consultas".
> No necesitamos un sistema perfecto. Necesitamos una demo que funcione y una
> presentación oral que convenza. Recortamos todo lo que no se vea en la demo.

### FASE 1 — Setup simultáneo (0h → 1.5h)

| Quién | Qué hace | Duración |
|-------|----------|----------|
| **Int. 1 (Backend)** | Crear proyecto Spring Boot + conectar MongoDB + modelo `EventoEspacial` + CRUD endpoints básicos | 1.5h |
| **Int. 2 (Geo)** | Escribir el `seed.js` con 15+ eventos reales (googlear coords) + cargar en MongoDB + crear índice `2dsphere` | 1h |
| **Int. 3 (Mapa)** | Montar `index.html` con Leaflet.js + mapa centrado + markers hardcodeados para probar estilos | 1h |
| **Int. 4 (UI+Pres)** | Armar estructura HTML del formulario CRUD + panel de búsqueda + CSS base | 1h |

**Checkpoint 1:** Backend responde en Postman, MongoDB tiene datos, mapa se ve.

### FASE 2 — Funcionalidad core (1.5h → 4h)

| Quién | Qué hace | Duración |
|-------|----------|----------|
| **Int. 1** | Terminar endpoints CRUD + endpoint GET con filtro por `tipo` | 1.5h |
| **Int. 2** | Implementar los 3 endpoints geoespaciales (`$near`, `$geoWithin`, `$centerSphere`) usando `MongoTemplate` | 2.5h |
| **Int. 3** | Conectar mapa a la API real (fetch → pintar markers). Popups con detalle. Filtro por tipo. | 2h |
| **Int. 4** | Conectar formulario de alta/edición a la API. Tabla de listado con eliminar. | 2h |

**Checkpoint 2:** CRUD funciona desde el browser, mapa muestra datos reales.

### FASE 3 — Consultas geo en el mapa + pulido (4h → 6h)

| Quién | Qué hace | Duración |
|-------|----------|----------|
| **Int. 2 + Int. 3** | Integrar búsqueda por proximidad en el mapa: input de coords + radio → dibujar círculo + mostrar resultados | 2h |
| **Int. 1** | Fix de bugs, CORS, edge cases. Ayudar donde haga falta. | 2h |
| **Int. 4** | Armar guión de presentación oral + preparar argumentos NoSQL vs SQL + slides mínimos (opcional) | 2h |

**Checkpoint 3:** La demo completa funciona de punta a punta.

### FASE 4 — Ensayo y cierre (6h → 7h)

| Todos | Qué hace | Duración |
|-------|----------|----------|
| **Los 4** | Correr la demo completa simulando la presentación. Cada uno practica explicar su parte. Preparar respuestas a preguntas típicas del docente. | 1h |

### Total estimado: ~7 horas de trabajo en paralelo

### ⚠️ Qué RECORTAR si falta tiempo

| Prioridad | Feature | Decisión |
|-----------|---------|----------|
| 🟢 Imprescindible | Seed de datos + mapa con markers + al menos `$near` funcionando | NO recortar |
| 🟢 Imprescindible | Al menos 1 operación de alta y 1 de eliminación desde la UI | NO recortar |
| 🟡 Deseable | Las 3 consultas geo distintas | Si falta tiempo, dejar solo `$near` que es la más visual |
| 🟡 Deseable | Formulario de edición (PUT) | Puede mostrarse directo en Postman durante la demo |
| 🔴 Prescindible | CSS pulido, animaciones, responsive | Con que se entienda alcanza |
| 🔴 Prescindible | Validaciones de formulario | No aporta a la nota |
| 🔴 Prescindible | Búsqueda por polígono (`$geoWithin` con polygon) | La más compleja, sacrificarla primero |

---

## 8. Checklist Pre-Entrega (mínimo viable)

- [ ] MongoDB corriendo con datos cargados (15+ eventos reales)
- [ ] Al menos alta y eliminación funcionando desde el browser
- [ ] Mapa Leaflet mostrando todos los eventos con markers
- [ ] Búsqueda `$near` funcionando y visible en el mapa (círculo + resultados)
- [ ] Cada integrante puede explicar su parte y el concepto general
- [ ] Argumentación NoSQL vs SQL preparada (aunque sea verbal, sin slides)
