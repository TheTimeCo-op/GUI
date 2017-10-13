let on = (eventType, elementId, cb) => {
  document.addEventListener(eventType, function (event) {
    let el = event.target
    let found;
    let identifier = elementId.slice(0, 1);

    if (identifier === '#') {
      while (el && !(found = el.id === elementId.slice(1))) {
          el = el.parentElement;
      }

      if (found) {
          cb(event);
      }
    }
    else if (identifier === '.') {
      let classNames = el.className.split(' ')
      classNames.forEach(function(name){
        if (name == elementId.slice(1)) found = true
        // while (el && !(found = name === elementId.slice(1))) {
        //   el = el.parentElement;
        // }
      })
    if (found) {
        cb(event);
    }
    }
  });
}

let grabAttr = (attribute) => {
  return event.target.attributes[attribute].nodeValue
}

let setAttr = (element, attributeName, attributeValue) => {
  element.setAttribute(attributeName, attributeValue)
}

let grabById = (id, event) => {
  if (event) {
    return (event.id == id) ? event.target : {}
  }
  return document.getElementById(id)
}

let grabByClass = (className) => {
  return document.getElementsByClassName(className)
}

/**
 * grabByIdInContainer
 * 
 * @description This function is broken - it should grab the id of an element in the specified container
 * @param containerID 
 * @param childID 
 */
let grabByIdInContainer = (containerID, childID) => {
  let elm = document.getElementById(containerID);
  var parent = elm ? elm.parentNode : {};
  return (parent.id && parent.id === containerID) ? elm : {};
}

let grabNextSibling = (className, event) => {
  let sibling;
  let classList = event.target.nextElementSibling.className.split(' ')

  classList.forEach((siblingName) => {
    if (siblingName === className) sibling = event.target.nextElementSibling
  })
  return sibling
}

let grabPreviousSibling = (className, event) => {
  let sibling;
  let classList = event.target.previousElementSibling.className.split(' ')

  classList.forEach((siblingName) => {
    if (siblingName === className) sibling = event.target.previousElementSibling
  })
  return sibling
}

module.exports = {
  on: on,
  grabAttr: grabAttr,
  setAttr: setAttr,
  grabById: grabById,
  grabByClass: grabByClass,
  grabByIdInContainer: grabByIdInContainer,
  grabNextSibling: grabNextSibling,
  grabPreviousSibling: grabPreviousSibling
}