// Cerrar con Esc
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Cerrar haciendo click afuera
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup__opened")) {
    closePopup(evt.target);
  }
}

// -- Abrir pop-up
export function openPopup(popupElement) {
  popupElement.classList.add("popup__opened");
  document.addEventListener("keydown", handleEscKey);
  popupElement.addEventListener("mousedown", handleOverlayClick);
}

// -- Cerrar pop-up
export function closePopup(popupElement) {
  popupElement.classList.remove("popup__opened");
  document.removeEventListener("keydown", handleEscKey);
  popupElement.removeEventListener("mousedown", handleOverlayClick);
}
