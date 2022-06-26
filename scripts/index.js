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

function closePopup(elementPopupToClose) {
  elementPopupToClose.classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function formSetProfileSubmitHandler(evt) {
  evt.preventDefault();
  //меняю текст
  profileName.textContent = setProfileNameInput.value;
  profileDescription.textContent = setProfileJobInput.value;
  //закрываем попап
  closePopup(setProfilePopup);
}
// функция закрывающая попап при нажатии esc
function closeSetProfilePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(setProfilePopup);
  }
}
// функция закрывающая попап при нажатии на страницу вне попапа
function closeSetProfilePopupOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(setProfilePopup);
  }
}
function openPopup(elementPopupToOpen) {
  elementPopupToOpen.classList.add('popup_opened');
}
//действия необходимые для открытия попапа изменения имени пользователя
function openSetProfilePopup() {
  openPopup(setProfilePopup);
  setProfileNameInput.value = profileName.textContent;
  setProfileJobInput.value = profileDescription.textContent;
}
//действия необходимые для открытия попапа добавления новой карточки с фотографией
function openNewCardPopup() {
  openPopup(newCardPopup);
  //установим значение полей ввода
  newCardFormElement.reset();
}
//действия для открытия картинки
function PreviewImageLarge(ElementToPreview) {
  openPopup(largeImagePopup);
  largeImagePopup.classList.add('popup__large-image');
  imagePreview = largeImagePopup.querySelector(".popup__large-image-preview");
  imageCaption = largeImagePopup.querySelector(".popup__image-title");
  imagePreview.src = ElementToPreview.src;
  imagePreview.alt = ElementToPreview.alt;
  imageCaption.innerText = ElementToPreview.alt;
}
//закрытие попапа, когда добавляю новую карточку
function closeNewCardPopupOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(newCardPopup);
  }
}
//закрытие попапа новой карточки по нажатию кнопки ескейп
function closeNewCardPopupOnEscape(e) {
  if (evt.key === 'Escape') {
    closePopup(newCardPopup);
  }
}
//сохранение новой дабавленной карточки по кнопке "сохранить"
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  //добавляем новую карточку
  addNewCard(newCardName.value,newCardLink.value);
  //закрываем попап
  closePopup(newCardPopup);
}
// открытие попап при нажатии на "карандаш"
setProfileButton.addEventListener('click', function () {
  openSetProfilePopup();
});
//обработка события по нажатию кнопки добавления новой карточки
newCardButton.addEventListener('click', function () {
  openNewCardPopup();
});
//проставление лайка
function changeLikeStatus(likeElement) {
  likeElement.classList.toggle('elements__like-button_active');
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
//закрытие окна просмотра картинки по ескейпу
function closeLargeImagePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(largeImagePopup);
  }
}
//закрытие окна просмотра картинки при нажатии вне попапа
function closeLargeImagePopupOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(largeImagePopup);
  }
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
//реакция на нажатие кнопки закрытия попапов
function closeSetProfilePopup() {
  closePopup(setProfilePopup);
}
function closeNewCardPopup() {
  closePopup(newCardPopup);
}
function closeLargeImagePopup() {
  closePopup(largeImagePopup);
}

setProfilePopupCloseButton.addEventListener('click', closeSetProfilePopup);
setProfilePopup.addEventListener('click', closeSetProfilePopupOnClick);
document.body.addEventListener('keyup', closeSetProfilePopupOnEscape);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
setProfileFormElement.addEventListener('submit', formSetProfileSubmitHandler);
//установим значение полей ввода
newCardPopupCloseButton.addEventListener('click', closeNewCardPopup);
newCardPopup.addEventListener('click', closeNewCardPopupOnClick);
document.body.addEventListener('keyup', closeNewCardPopupOnEscape);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newCardFormElement.addEventListener('submit', formNewCardSubmitHandler);
largeImagePopupCloseButton.addEventListener('click', closeLargeImagePopup);
largeImagePopup.addEventListener('click', closeLargeImagePopupOnClick);
document.body.addEventListener('keyup', closeLargeImagePopupOnEscape);
//покажем карточки, которые пока не видимы
showInitialContent();

