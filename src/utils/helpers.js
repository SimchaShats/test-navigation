export function buildLocalName(firstName, lastName, middleName) {
  if (firstName[0].search(/[a-zA-Z]/) > -1) {
    return `${firstName}  ${lastName} son of ${middleName}`;
  } else if (firstName[0].search(/[а-яА-Я]/) > -1) {
    return `${firstName} ${lastName} ${middleName}`;
  } else if (firstName[0].search(/[א-ת]/) > -1) {
    return `${firstName} בן ${middleName} ${lastName}`;
  }
}