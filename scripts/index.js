const cardElement = document.querySelector('template');
const cardElementsNode = document.querySelector('.elements');

const setProfileButton = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const setProfilePopup = document.querySelector('#profile-add'); // переменная для обращения к окну изменения имени пользоваеля
const setProfilePopupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия окна изменения имени пользователя
const setProfileFormElement = document.querySelector('.popup__form'); //переменная для доступа к элементам ввода в окне изменения имени пользователя
const setProfileNameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода окна изменения имени пользователя
const setProfileJobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода 
const profileName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

const newCardPopup = document.querySelector('#card-add');//переменная для обращения изменения новой карточки
const newCardButton = document.querySelector('.profile__add-button');// кнопка для добавления новой каточки мест
const newCardPopupCloseButton = newCardPopup.querySelector('.popup__close-button');//переменная для закрытия окна изменения новой карточки
const newCardFormElement = newCardPopup.querySelector('.popup__form');//переменная для доступа к элементам ввода в окне изменения новой карточки
const newCardName = newCardPopup.querySelector('.popup__input_name');//переменная для доступа к первой строке ввода новой карточки
const newCardLink = newCardPopup.querySelector('.popup__input_link');//переменная для доступа ко второй строке ввода новой карточки

const largeImagePopup = document.querySelector('#large-image');//переменная для открытия просмотра картинки
const largeImagePopupCloseButton = largeImagePopup.querySelector('.popup__close-button');//переменная для закрытия просмотра картинки

// функция делающая попап невидимым
function closePopup() {
  setProfilePopup.classList.remove('popup_opened');
  setProfilePopupCloseButton.removeEventListener('click', closePopup);
  setProfilePopup.removeEventListener('click', closePopupOnClick);
  document.body.removeEventListener('keyup', closePopupOnEscape);
  setProfileFormElement.removeEventListener('submit', formSubmitHandler);
}
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  //меняю текст
  profileName.textContent = setProfileNameInput.value;
  profileDescription.textContent = setProfileJobInput.value;
  //закрываем попап
  closePopup();
}
// функция закрывающая попап при нажатии esc
function closePopupOnEscape(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
}
// функция закрывающая попап при нажатии на страницу вне попапа
function closePopupOnClick(e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
}
//действия необходимые для открытия попапа изменения имени пользователя
function openPopup() {
  setProfilePopup.classList.add('popup_opened');
  setProfilePopupCloseButton.addEventListener('click', closePopup);
  setProfilePopup.addEventListener('click', closePopupOnClick);
  document.body.addEventListener('keyup', closePopupOnEscape);
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  setProfileFormElement.addEventListener('submit', formSubmitHandler);
  //установим значение полей ввода
  setProfileNameInput.value = profileName.textContent;
  setProfileJobInput.value = profileDescription.textContent;
}
//закрытие попапа, когда добавляю новую карточку
function closeNewCardPopupOnClick(e) {
  if (e.target === e.currentTarget) {
    closeNewCardPopup();
  }
}
//закрытие попапа новой карточки по нажатию кнопки ескейп
function closeNewCardPopupOnEscape(e) {
  if (e.key === 'Escape') {
    closeNewCardPopup();
  }
}
//сохранение новой дабавленной карточки по кнопке "сохранить"
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  //добавляем новую карточку
  addNewCard(newCardName.value,newCardLink.value);
  //закрываем попап
  closeNewCardPopup();
}
//действия закрытия попапа добавляющего новую карточку
function closeNewCardPopup() {
  newCardPopup.classList.remove('popup_opened');
  newCardPopupCloseButton.removeEventListener('click', closeNewCardPopup);
  newCardPopup.removeEventListener('click', closeNewCardPopupOnClick);
  document.body.removeEventListener('keyup', closeNewCardPopupOnEscape);
  newCardFormElement.removeEventListener('submit', formNewCardSubmitHandler);
}
//действия необходимые для открытия попапа добавления новой карточки с фотографией
function openNewCardPopup() {
  newCardPopup.classList.add('popup_opened');
  newCardPopupCloseButton.addEventListener('click', closeNewCardPopup);
  newCardPopup.addEventListener('click', closeNewCardPopupOnClick);
  document.body.addEventListener('keyup', closeNewCardPopupOnEscape);
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  newCardFormElement.addEventListener('submit', formNewCardSubmitHandler);
  //установим значение полей ввода
  newCardName.value = "";
  newCardLink.value = "";
}
// открытие попап при нажатии на "карандаш"
setProfileButton.addEventListener('click', function () {
  openPopup();
});
//обработка события по нажатию кнопки добавления новой карточки
newCardButton.addEventListener('click', function () {
  openNewCardPopup();
});
//проставление лайка
function changeLikeStatus(likeElement) {
  if (!likeElement.classList.contains('elements__like-button_active')) {
    likeElement.classList.add('elements__like-button_active')
  }
  else {
    likeElement.classList.remove('elements__like-button_active')
  }
}
//лайк при нажатии на сердечко
function likeButtonPress(evt) {
  changeLikeStatus(evt.target);
}
//удаление карточки при нажатии на урну
function deleteCard(cardElement) {
  cardElement.remove();
}
//действие выполняемое при нажатии на урну
function binButtonPress(evt) {
  deleteCard(evt.target.parentElement)
}
//закрытие окна просмотра картинки
function closeLargeImagePopup(e) {
  largeImagePopup.classList.remove('popup_opened');
  largeImagePopupCloseButton.removeEventListener('click', closeLargeImagePopup);
  largeImagePopup.removeEventListener('click', closeNewCardPopupOnClick);
  document.body.removeEventListener('keyup', closeLargeImagePopupOnEscape);
}
//закрытие окна просмотра картинки по ескейпу
function closeLargeImagePopupOnEscape(e) {
  if (e.key === 'Escape') {
    closeLargeImagePopup();
  }
}
//закрытие окна просмотра картинки при нажатии вне попапа
function closeLargeImagePopupOnClick(e) {
  if (e.target === e.currentTarget) {
    closeLargeImagePopup();
  }
}
//действия для открытия картинки
function PreviewImageLarge(ElementToPreview) {
  largeImagePopup.classList.add('popup_opened');//делаем попап окна просмотра картинки видимым
  largeImagePopup.classList.add('popup__large-image');
  largeImagePopupCloseButton.addEventListener('click', closeLargeImagePopup);
  largeImagePopup.addEventListener('click', closeLargeImagePopupOnClick);
  document.body.addEventListener('keyup', closeLargeImagePopupOnEscape);
  imagePreview = largeImagePopup.querySelector(".popup__large-image-preview");
  imageCaption = largeImagePopup.querySelector(".popup__image-title");
  imagePreview.src = ElementToPreview.src;
  imagePreview.alt = ElementToPreview.alt;
  imageCaption.innerText = ElementToPreview.alt;
}
//открытие окна просмотра картинки
function largeImagePress(evt) {
  PreviewImageLarge(evt.target);
}
function addNewCard(name,link) {
  let elementToAdd = cardElement.content.cloneNode(true);
  //elementToAdd.querySelector(".elements__card").setAttribute('id', `card${currentCard.id}`);
  elementToAdd.querySelector(".elements__title").innerText = name;
  imagePanel = elementToAdd.querySelector(".elements__image");
  imagePanel.src = link;
  imagePanel.alt = name;
  imagePanel.addEventListener('click', largeImagePress);
  likeButton = elementToAdd.querySelector(".elements__like-button")
  likeButton.addEventListener('click', likeButtonPress);
  binButton = elementToAdd.querySelector(".elements__bin-button");
  binButton.addEventListener('click', binButtonPress);
  cardElementsNode.appendChild(elementToAdd);
}
//добавление карточек 
function showInitialContent() {
  initialCards.forEach((currentCard) => {
    addNewCard(currentCard.name,currentCard.link);
  })
}
//покажем карточки, которые пока не видимы
showInitialContent();