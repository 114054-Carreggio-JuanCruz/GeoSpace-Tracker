# GeoSpace Tracker — Lista de Tareas (Sprint nocturno)

---

## FASE 1 — Setup (0h → 1.5h)

### Int. 1 — Backend
- [ ] Crear proyecto Spring Boot con `spring-boot-starter-data-mongodb` y `spring-boot-starter-web`
- [ ] Configurar `application.properties` (puerto, conexión MongoDB, CORS)
- [ ] Crear clase `EventoEspacial.java` con campos: nombre, tipo, fecha, ubicacion (GeoJsonPoint), detalles (Map)
- [ ] Crear `EventoRepository.java` extendiendo `MongoRepository`
- [ ] Crear `EventoController.java` con GET `/api/eventos` y POST `/api/eventos`
- [ ] Probar GET y POST en Postman

### Int. 2 — Datos
- [ ] Googlear coordenadas reales de 15+ sitios espaciales (Kennedy, Baikonur, Kourou, Houston, Malargüe, Goldstone, Madrid DSN, Paranal, Tanegashima, Satish Dhawan, Wenchang, Plesetsk, Vandenberg, Esrange, Alcântara)
- [ ] Escribir `seed.js` con `db.eventoEspacial.insertMany([...])`
- [ ] Ejecutar seed en MongoDB
- [ ] Crear índice: `db.eventoEspacial.createIndex({ ubicacion: "2dsphere" })`
- [ ] Verificar con un `$near` desde Mongo shell que el índice funciona

### Int. 3 — Mapa
- [ ] Crear `index.html` con CDN de Leaflet (CSS + JS)
- [ ] Inicializar mapa centrado en [0, 0] zoom 2 (vista mundial)
- [ ] Poner 3 markers hardcodeados para verificar que Leaflet funciona
- [ ] Definir íconos distintos por tipo (pueden ser colores de marker: rojo=lanzamiento, azul=centro, verde=estación)

### Int. 4 — UI
- [ ] Crear layout HTML: sidebar izquierdo (formularios) + mapa a la derecha
- [ ] Formulario de alta: inputs para nombre, tipo (select), fecha, latitud, longitud, agencia/misión
- [ ] Sección de búsqueda geo: inputs latitud, longitud, distancia (km) + botón "Buscar cerca"
- [ ] CSS mínimo: sidebar con ancho fijo, mapa ocupa el resto, font legible

**✅ CHECKPOINT 1:** Backend responde en Postman. MongoDB tiene datos. Mapa se ve en el browser.

---

## FASE 2 — Funcionalidad core (1.5h → 4h)

### Int. 1 — Backend
- [ ] Agregar endpoint PUT `/api/eventos/{id}`
- [ ] Agregar endpoint DELETE `/api/eventos/{id}`
- [ ] Agregar filtro por tipo: GET `/api/eventos?tipo=lanzamiento`
- [ ] Configurar `@CrossOrigin("*")` en el controller (o config global CORS)
- [ ] Verificar que los 5 endpoints responden bien desde Postman

### Int. 2 — Queries Geo
- [ ] Inyectar `MongoTemplate` en un `EventoService`
- [ ] Implementar búsqueda `$near`: `GET /api/eventos/cerca?lng=X&lat=Y&distancia=Z`
- [ ] Implementar búsqueda `$geoWithin` + `$centerSphere`: `GET /api/eventos/radio?lng=X&lat=Y&radioKm=Z`
- [ ] Probar ambas en Postman con coords de Córdoba (-64.18, -31.42)
- [ ] Si queda tiempo: implementar `$geoWithin` con polígono (si no, descartarla)

### Int. 3 — Mapa conectado
- [ ] Crear `api.js` con funciones: `getEventos()`, `crearEvento()`, `eliminarEvento()`, `buscarCerca()`
- [ ] Al cargar la página: fetch GET `/api/eventos` → pintar markers en el mapa
- [ ] Click en marker → popup con nombre, tipo, fecha, agencia
- [ ] Agregar checkboxes de filtro por tipo → mostrar/ocultar markers

### Int. 4 — CRUD UI
- [ ] Botón "Guardar" del formulario → fetch POST → refrescar markers en mapa
- [ ] Tabla debajo del formulario: listar eventos con botón "Eliminar" → fetch DELETE → refrescar
- [ ] Botón "Editar" en tabla → cargar datos en el formulario → cambiar a modo PUT
- [ ] Feedback mínimo: alert() o mensajito de "Evento creado" / "Evento eliminado"

**✅ CHECKPOINT 2:** CRUD funciona desde el browser. Mapa muestra datos reales de la API.

---

## FASE 3 — Geo en el mapa + pulido (4h → 6h)

### Int. 2 + Int. 3 (juntos)
- [ ] Conectar panel de búsqueda → fetch al endpoint `/api/eventos/cerca`
- [ ] Con los resultados: limpiar markers anteriores, pintar solo los encontrados
- [ ] Dibujar un círculo azul semitransparente en el mapa con el radio de búsqueda
- [ ] Botón "Limpiar búsqueda" → volver a mostrar todos los markers
- [ ] Probar la demo estrella: buscar desde Córdoba, 3000km → debe aparecer Malargüe y otros cercanos

### Int. 1 — Soporte
- [ ] Fixear bugs que surjan (CORS, serialización de GeoJsonPoint, fechas)
- [ ] Verificar que el seed tiene datos variados en distintos continentes
- [ ] Ayudar a Int. 2/3 si se traban con la integración

### Int. 4 — Presentación
- [ ] Escribir guión de demo (3-5 min): qué mostrar y en qué orden
- [ ] Preparar 3 argumentos de por qué MongoDB > SQL para geodatos
- [ ] Preparar 2 desventajas honestas de MongoDB vs SQL
- [ ] Definir quién presenta qué parte
- [ ] Opcional: 3-4 slides simples (título, arquitectura, comparativa, cierre)

**✅ CHECKPOINT 3:** Demo completa funciona de punta a punta.

---

## FASE 4 — Ensayo (6h → 7h)

### Todos
- [ ] Correr la demo completa como si fuera la presentación real
- [ ] Cada integrante explica su parte en voz alta
- [ ] Preparar respuestas a preguntas típicas del docente:
  - "¿Por qué MongoDB y no PostgreSQL con PostGIS?"
  - "¿Qué pasa si necesitan relaciones entre eventos?"
  - "¿Qué es un índice 2dsphere?"
  - "¿Cómo funciona $near internamente?"
- [ ] Verificar que MongoDB y el backend arrancan sin problemas (anotar comandos de inicio)
- [ ] Tener plan B: si el backend no arranca en el lab, mostrar consultas directo en Mongo shell

---

## 🚨 Si faltan menos de 3 horas y algo no funciona

| Situación | Plan B |
|-----------|--------|
| El CRUD UI no funciona | Mostrar CRUD por Postman. El mapa es lo que importa. |
| Solo funciona `$near` | Suficiente. Es la consulta más visual y demuestra el concepto. |
| Leaflet no pinta bien | Markers básicos sin íconos custom. El popup con data es lo clave. |
| No hay tiempo para slides | Presentar directo con la demo abierta. Hablar sobre el mapa en vivo. |
| El PUT no funciona | Eliminar + crear de nuevo. Nadie va a notar. |
