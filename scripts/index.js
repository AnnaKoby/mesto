const cardElement = document.querySelector('template');
const cardElementsNode = document.querySelector('.elements');

const profileBoxButton = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const profileBoxPopup = document.querySelector('#profile-add'); // переменная для обращения к окну изменения имени пользоваеля
const profileBoxPopupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия окна изменения имени пользователя
const profileBoxFormElement = profileBoxPopup.querySelector('.popup__form'); //переменная для доступа к элементам ввода в окне изменения имени пользователя
const profileBoxNameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода окна изменения имени пользователя
const profileBoxJobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода 
const profileBoxName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileBoxDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

const newCardPopup = document.querySelector('#card-add');//переменная для обращения изменения новой карточки
const newCardButton = document.querySelector('.profile__add-button');// кнопка для добавления новой каточки мест
const newCardPopupCloseButton = newCardPopup.querySelector('.popup__close-button');//переменная для закрытия окна изменения новой карточки
const newCardFormElement = newCardPopup.querySelector('.popup__form');//переменная для доступа к элементам ввода в окне изменения новой карточки
const newCardName = newCardPopup.querySelector('.popup__input_name');//переменная для доступа к первой строке ввода новой карточки
const newCardLink = newCardPopup.querySelector('.popup__input_link');//переменная для доступа ко второй строке ввода новой карточки

const largeImagePopup = document.querySelector('#large-image');//переменная для открытия просмотра картинки
const largeImagePopupCloseButton = largeImagePopup.querySelector('.popup__close-button');//переменная для закрытия просмотра картинки
const imagePreview = largeImagePopup.querySelector('.popup__large-image-preview');
const imageCaption = largeImagePopup.querySelector('.popup__image-title');

function makePopupInvisible(elementPopupToClose){
  elementPopupToClose.classList.remove('popup_opened');
}
function turnOffEventOnEsc(elementPopupToClose){
  document.body.removeEventListener('keyup', closePopupOnEscape);
}
function closePopup(elementPopupToClose) {
  makePopupInvisible(elementPopupToClose);
  turnOffEventOnEsc(elementPopupToClose);
}
function makePopupVisible(elementPopupToOpen){
  elementPopupToOpen.classList.add('popup_opened');
}
function turnOnEventOnEsc(elementPopupToClose){
  document.body.addEventListener('keyup', closePopupOnEscape);
}
//закрывает переданный в 1м аргументе попап
function openPopup(elementPopupToOpen) {
  makePopupVisible(elementPopupToOpen);
  turnOnEventOnEsc(elementPopupToOpen);
}
//обработчик закрытия любого попапа по ескейпу
function closePopupOnEscape(evt) {
  console.log('press button event worked');
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
//обработчик закрытия окна просмотра любого попапа при нажатии вне попапа
function closePopupOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
//закрытие попапов по крестику
function closePopupOnButton(evt) {
  closePopup(evt.target.closest('.popup_opened'));//во всех попапах закрытие по крестику
}
//попап с изменением пользователя; Обработчик для сохранения данных пользователя
function formProfileBoxSubmitHandler(evt) {
  evt.preventDefault();
  //меняю текст
  profileBoxName.textContent = profileBoxNameInput.value;
  profileBoxDescription.textContent = profileBoxJobInput.value;
  //закрываем попап
  closePopup(profileBoxPopup);
}
//попап добавления новой карточки; обработчик сохранения новой дабавленной карточки по кнопке "сохранить"
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  //добавляем новую карточку
  addNewCard({ 'name': newCardName.value, 'link': newCardLink.value });
  //закрываем попап
  closePopup(newCardPopup);
}

//попап с изменением пользователя; установка значений полей предыдущими значениями
function profileBoxPopupSetInitValues() {
  profileBoxNameInput.value = profileBoxName.textContent;
  profileBoxJobInput.value = profileBoxDescription.textContent;
}
//попап добавления новой карточки; установка значений "по умолчанию"
function newCardPopupSetInitValues() {
  //установим значение полей ввода
  newCardFormElement.reset();
}
//попап просмотра увеличенного изображения; установка параметров показываемой картинки и её названия
function previewImageLargeInit(ElementToPreview) {
  imagePreview.src = ElementToPreview.src;
  imagePreview.alt = ElementToPreview.alt;
  imageCaption.innerText = ElementToPreview.alt;
}
//проставление лайка
function changeLikeStatus(likeElement) {
  likeElement.classList.toggle('elements__like-button_active');
}
//обработчик нажатия "лайк" при нажатии на сердечко 
function likeButtonPress(evt) {
  changeLikeStatus(evt.target);
}
//удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//обработчик при нажатии на "урну"
function binButtonPress(evt) {
  deleteCard(evt.target.closest('.elements__card'));
}
//обработчик открытия окна просмотра картинки
function largeImagePress(evt) {
  previewImageLargeInit(evt.target);
  openPopup(largeImagePopup);
}
//создание новой чистой карточки, которую потом можно будет испльзовать для вставки
function createCleanNewElementForAddNewCard() {
  return cardElement.content.cloneNode(true);
}
//заполнение карточки данными 
function fillElementWithDataForAddNewCard(elementToAdd, cardData, imagePanel) {
  elementToAdd.querySelector('.elements__title').innerText = cardData.name;
  imagePanel.src = cardData.link;
  imagePanel.alt = cardData.name;
  return;
}
//установка перехватчиков событий для карточек
function addEventsForAddNewCard(elementToAdd, imagePanel) {
  imagePanel.addEventListener('click', largeImagePress);
  const likeButton = elementToAdd.querySelector('.elements__like-button')
  likeButton.addEventListener('click', likeButtonPress);
  const binButton = elementToAdd.querySelector('.elements__bin-button');
  binButton.addEventListener('click', binButtonPress);
  return;
}
//вставка готовой карточки на страницу
function insertNewCard(elementToAdd, containerElement) {
  containerElement.prepend(elementToAdd);
  return;
}
//функция создания новой карточки; с картинкой и именем (из объекта-аргумента функции) и обработчиками
function createNewCard(cardData) {
  const elementToAdd = createCleanNewElementForAddNewCard();
  const imagePanel = elementToAdd.querySelector('.elements__image');
  fillElementWithDataForAddNewCard(elementToAdd, cardData, imagePanel);
  addEventsForAddNewCard(elementToAdd, imagePanel);
  return elementToAdd;
}
//добавляет новую карточку на страницу в начало, имя и ссылка передаются в объекте - аргумена в полях name и link
function addNewCard(cardData) {
  const elementToAdd = createNewCard(cardData);
  insertNewCard(elementToAdd, cardElementsNode);
}
//добавление первоначальных карточек "по умолчанию"
function showInitialContent() {
  initialCards.reverse().forEach((currentCard) => {
    addNewCard({ 'name': currentCard.name, 'link': currentCard.link });
  })
}
//папап с изменением пользователя; привязка обработчика для открытия попап при нажатии на "карандаш"
profileBoxButton.addEventListener('click', function () {
  profileBoxPopupSetInitValues();
  openPopup(profileBoxPopup);
});
//попап добавления новой карточки; привязка обработчика по нажатию кнопки добавления новой карточки
newCardButton.addEventListener('click', function () {
  newCardPopupSetInitValues();
  openPopup(newCardPopup);
});

profileBoxPopupCloseButton.addEventListener('click', closePopupOnButton);
profileBoxPopup.addEventListener('click', closePopupOnClick);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileBoxFormElement.addEventListener('submit', formProfileBoxSubmitHandler);
//установим значение полей ввода
newCardPopupCloseButton.addEventListener('click', closePopupOnButton);
newCardPopup.addEventListener('click', closePopupOnClick);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newCardFormElement.addEventListener('submit', formNewCardSubmitHandler);
largeImagePopupCloseButton.addEventListener('click', closePopupOnButton);
largeImagePopup.addEventListener('click', closePopupOnClick);
//покажем карточки, которые пока не видимы
showInitialContent();