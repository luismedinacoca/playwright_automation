export const obtenerFechaHoraActual = () => {
  // Obtiene la fecha y hora actual
  var ahora = new Date();

  // Obtiene los componentes de la fecha y hora
  var año = ahora.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año
  var mes = ("0" + (ahora.getMonth() + 1)).slice(-2); // Mes (01-12)
  var dia = ("0" + ahora.getDate()).slice(-2); // Día (01-31)
  var horas = ("0" + ahora.getHours()).slice(-2); // Horas (00-23)
  var minutos = ("0" + ahora.getMinutes()).slice(-2); // Minutos (00-59)
  var segundos = ("0" + ahora.getSeconds()).slice(-2); // Segundos (00-59)

  // Formatea la cadena
  var fechaHoraFormateada = año + mes + dia + "_" + horas + minutos + segundos;

  return fechaHoraFormateada;
};


// Importa la librería faker
const { faker } = require('@faker-js/faker');

export const generarUsuarioFalso = () => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = `${firstname} ${lastname}`;
  const email = `${firstname.toLowerCase()}${lastname.toLowerCase()}@mailinator.com`;
  const password = faker.internet.password({ length: 12 });
  const telefono = faker.phone.number("##########");

  const usuario = {
    username: username,
    email: email,
    password: password,
    telefono: telefono
  };
  return usuario;
}
