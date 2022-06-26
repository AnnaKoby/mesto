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

function closePopup() {
  //debugger;
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function formSetProfileSubmitHandler(evt) {
  evt.preventDefault();
  //меняю текст
  profileName.textContent = setProfileNameInput.value;
  profileDescription.textContent = setProfileJobInput.value;
  //закрываем попап
  closePopup();
}
function openPopup(elementPopupToOpen) {
  elementPopupToOpen.classList.add('popup_opened');
}
//действия необходимые для открытия попапа изменения имени пользователя
function SetProfilePopupSetInitValues() {
  setProfileNameInput.value = profileName.textContent;
  setProfileJobInput.value = profileDescription.textContent;
}
//действия необходимые для открытия попапа добавления новой карточки с фотографией
function NewCardPopupSetInitValues() {
  //установим значение полей ввода
  newCardFormElement.reset();
}
//действия для открытия картинки
function PreviewImageLargeInit(ElementToPreview) {
  largeImagePopup.classList.add('popup__large-image');//для прохождения валидации по BEM
  imagePreview = largeImagePopup.querySelector(".popup__large-image-preview");
  imageCaption = largeImagePopup.querySelector(".popup__image-title");
  imagePreview.src = ElementToPreview.src;
  imagePreview.alt = ElementToPreview.alt;
  imageCaption.innerText = ElementToPreview.alt;
}
//сохранение новой дабавленной карточки по кнопке "сохранить"
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  //добавляем новую карточку
  addNewCard(newCardName.value,newCardLink.value);
  //закрываем попап
  closePopup();
}
// открытие попап при нажатии на "карандаш"
setProfileButton.addEventListener('click', function () {
  SetProfilePopupSetInitValues();
  openPopup(setProfilePopup);
});
//обработка события по нажатию кнопки добавления новой карточки
newCardButton.addEventListener('click', function () {
  NewCardPopupSetInitValues();
  openPopup(newCardPopup);
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
function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}
//закрытие окна просмотра картинки при нажатии вне попапа
function closePopupOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}
//открытие окна просмотра картинки
function largeImagePress(evt) {
  openPopup(largeImagePopup);
  PreviewImageLargeInit(evt.target);
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

setProfilePopupCloseButton.addEventListener('click', closePopup);
setProfilePopup.addEventListener('click', closePopupOnClick);
document.body.addEventListener('keyup', closePopupOnEscape);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
setProfileFormElement.addEventListener('submit', formSetProfileSubmitHandler);
//установим значение полей ввода
newCardPopupCloseButton.addEventListener('click', closePopup);
newCardPopup.addEventListener('click', closePopupOnClick);
document.body.addEventListener('keyup', closePopupOnEscape);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newCardFormElement.addEventListener('submit', formNewCardSubmitHandler);
largeImagePopupCloseButton.addEventListener('click', closePopup);
largeImagePopup.addEventListener('click', closePopupOnClick);
document.body.addEventListener('keyup', closePopupOnEscape);
//покажем карточки, которые пока не видимы
showInitialContent();

