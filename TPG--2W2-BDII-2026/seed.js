// seed.js — Ejecutar con: mongosh geospace seed.js
// O si usás el cliente viejo: mongo geospace seed.js

// Limpieza
db.eventoEspacial.drop();

db.eventoEspacial.insertMany([

  // ===== SITIOS DE LANZAMIENTO =====
  {
    nombre: "Kennedy Space Center",
    tipo: "lanzamiento",
    fecha: new Date("1962-07-01"),
    ubicacion: { type: "Point", coordinates: [-80.604, 28.608] },
    detalles: { agencia: "NASA", pais: "Estados Unidos", mision_destacada: "Apollo 11, Artemis" }
  },
  {
    nombre: "Cosmódromo de Baikonur",
    tipo: "lanzamiento",
    fecha: new Date("1955-06-02"),
    ubicacion: { type: "Point", coordinates: [63.342, 45.965] },
    detalles: { agencia: "Roscosmos", pais: "Kazajistán", mision_destacada: "Sputnik 1, Vostok 1" }
  },
  {
    nombre: "Centro Espacial Guayanés (Kourou)",
    tipo: "lanzamiento",
    fecha: new Date("1968-04-09"),
    ubicacion: { type: "Point", coordinates: [-52.768, 5.236] },
    detalles: { agencia: "ESA / CNES / Arianespace", pais: "Guayana Francesa", mision_destacada: "Ariane 5, James Webb" }
  },
  {
    nombre: "Vandenberg Space Force Base",
    tipo: "lanzamiento",
    fecha: new Date("1958-12-16"),
    ubicacion: { type: "Point", coordinates: [-120.568, 34.742] },
    detalles: { agencia: "USSF / SpaceX", pais: "Estados Unidos", mision_destacada: "Lanzamientos polares, Falcon 9" }
  },
  {
    nombre: "Tanegashima Space Center",
    tipo: "lanzamiento",
    fecha: new Date("1969-09-01"),
    ubicacion: { type: "Point", coordinates: [131.004, 30.400] },
    detalles: { agencia: "JAXA", pais: "Japón", mision_destacada: "H-IIA, Hayabusa" }
  },
  {
    nombre: "Satish Dhawan Space Centre (Sriharikota)",
    tipo: "lanzamiento",
    fecha: new Date("1971-10-09"),
    ubicacion: { type: "Point", coordinates: [80.235, 13.720] },
    detalles: { agencia: "ISRO", pais: "India", mision_destacada: "Chandrayaan, Mangalyaan" }
  },
  {
    nombre: "Wenchang Space Launch Site",
    tipo: "lanzamiento",
    fecha: new Date("2016-06-25"),
    ubicacion: { type: "Point", coordinates: [110.951, 19.614] },
    detalles: { agencia: "CNSA", pais: "China", mision_destacada: "Estación Espacial Tiangong" }
  },
  {
    nombre: "Cosmódromo de Plesetsk",
    tipo: "lanzamiento",
    fecha: new Date("1966-03-17"),
    ubicacion: { type: "Point", coordinates: [40.680, 62.960] },
    detalles: { agencia: "Roscosmos", pais: "Rusia", mision_destacada: "Satélites militares, Soyuz" }
  },
  {
    nombre: "Centro de Lanzamiento de Alcântara",
    tipo: "lanzamiento",
    fecha: new Date("1990-02-21"),
    ubicacion: { type: "Point", coordinates: [-44.396, -2.373] },
    detalles: { agencia: "AEB", pais: "Brasil", mision_destacada: "VLS-1 (programa en desarrollo)" }
  },
  {
    nombre: "Starbase (Boca Chica)",
    tipo: "lanzamiento",
    fecha: new Date("2019-08-27"),
    ubicacion: { type: "Point", coordinates: [-97.155, 25.997] },
    detalles: { agencia: "SpaceX", pais: "Estados Unidos", mision_destacada: "Starship" }
  },

  // ===== CENTROS DE CONTROL =====
  {
    nombre: "Johnson Space Center (Houston)",
    tipo: "centro_control",
    fecha: new Date("1963-02-19"),
    ubicacion: { type: "Point", coordinates: [-95.089, 29.560] },
    detalles: { agencia: "NASA", pais: "Estados Unidos", funcion: "Control de misiones tripuladas e ISS" }
  },
  {
    nombre: "Centro Europeo de Operaciones Espaciales (ESOC)",
    tipo: "centro_control",
    fecha: new Date("1967-09-08"),
    ubicacion: { type: "Point", coordinates: [8.625, 49.869] },
    detalles: { agencia: "ESA", pais: "Alemania", funcion: "Control de misiones ESA" }
  },
  {
    nombre: "Jet Propulsion Laboratory (JPL)",
    tipo: "centro_control",
    fecha: new Date("1936-10-31"),
    ubicacion: { type: "Point", coordinates: [-118.176, 34.198] },
    detalles: { agencia: "NASA / Caltech", pais: "Estados Unidos", funcion: "Control de misiones robóticas interplanetarias" }
  },
  {
    nombre: "Centro de Control de Tsukuba",
    tipo: "centro_control",
    fecha: new Date("1972-01-01"),
    ubicacion: { type: "Point", coordinates: [140.073, 36.066] },
    detalles: { agencia: "JAXA", pais: "Japón", funcion: "Control de misiones y módulo Kibo (ISS)" }
  },
  {
    nombre: "Centro de Control de Misión de Pekín",
    tipo: "centro_control",
    fecha: new Date("1996-01-01"),
    ubicacion: { type: "Point", coordinates: [116.339, 39.978] },
    detalles: { agencia: "CNSA", pais: "China", funcion: "Control de Tiangong, Chang'e, Tianwen" }
  },

  // ===== ESTACIONES DE SEGUIMIENTO (DSN + ESTRACK) =====
  {
    nombre: "Goldstone Deep Space Complex",
    tipo: "estacion",
    fecha: new Date("1958-12-01"),
    ubicacion: { type: "Point", coordinates: [-116.890, 35.427] },
    detalles: { agencia: "NASA/JPL", pais: "Estados Unidos", red: "Deep Space Network", antena: "70m DSS-14" }
  },
  {
    nombre: "Madrid Deep Space Complex (Robledo de Chavela)",
    tipo: "estacion",
    fecha: new Date("1964-01-01"),
    ubicacion: { type: "Point", coordinates: [-4.249, 40.431] },
    detalles: { agencia: "NASA/JPL", pais: "España", red: "Deep Space Network", antena: "70m DSS-63" }
  },
  {
    nombre: "Canberra Deep Space Complex (Tidbinbilla)",
    tipo: "estacion",
    fecha: new Date("1965-01-01"),
    ubicacion: { type: "Point", coordinates: [148.981, -35.401] },
    detalles: { agencia: "NASA/JPL + CSIRO", pais: "Australia", red: "Deep Space Network", antena: "70m DSS-43" }
  },
  {
    nombre: "Estación Malargüe (DSA-3)",
    tipo: "estacion",
    fecha: new Date("2012-12-18"),
    ubicacion: { type: "Point", coordinates: [-69.398, -35.776] },
    detalles: { agencia: "ESA", pais: "Argentina", red: "ESTRACK", antena: "35m DSA-3" }
  },
  {
    nombre: "Estación Cebreros (DSA-2)",
    tipo: "estacion",
    fecha: new Date("2005-09-28"),
    ubicacion: { type: "Point", coordinates: [-4.368, 40.453] },
    detalles: { agencia: "ESA", pais: "España", red: "ESTRACK", antena: "35m DSA-2" }
  },
  {
    nombre: "Estación New Norcia (DSA-1)",
    tipo: "estacion",
    fecha: new Date("2002-03-01"),
    ubicacion: { type: "Point", coordinates: [116.192, -31.048] },
    detalles: { agencia: "ESA", pais: "Australia", red: "ESTRACK", antena: "35m DSA-1" }
  },

  // ===== OBSERVATORIOS =====
  {
    nombre: "Observatorio Paranal (VLT)",
    tipo: "observatorio",
    fecha: new Date("1998-05-25"),
    ubicacion: { type: "Point", coordinates: [-70.404, -24.627] },
    detalles: { agencia: "ESO", pais: "Chile", instrumento: "Very Large Telescope (VLT)" }
  },
  {
    nombre: "Observatorio ALMA",
    tipo: "observatorio",
    fecha: new Date("2011-10-03"),
    ubicacion: { type: "Point", coordinates: [-67.755, -23.029] },
    detalles: { agencia: "ESO / NAOJ / NRAO", pais: "Chile", instrumento: "66 antenas radiotelescópicas" }
  }
]);

// Crear índice geoespacial
db.eventoEspacial.createIndex({ ubicacion: "2dsphere" });

// Verificación
const total = db.eventoEspacial.countDocuments();
print(`\n✅ Seed completado: ${total} eventos insertados.`);
print("✅ Índice 2dsphere creado en 'ubicacion'.\n");

// Query de prueba: buscar eventos cerca de Córdoba, Argentina (3000km)
print("🔍 Test: eventos a menos de 3000km de Córdoba, Argentina:");
const cercanos = db.eventoEspacial.find({
  ubicacion: {
    $near: {
      $geometry: { type: "Point", coordinates: [-64.18, -31.42] },
      $maxDistance: 3000000
    }
  }
}).toArray();

cercanos.forEach(e => {
  print(`   📍 ${e.nombre} (${e.tipo})`);
});
print(`\n   Total encontrados: ${cercanos.length}\n`);
