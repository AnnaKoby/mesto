const button = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const popup = document.querySelector('#profile-add'); // переменная для обращения к окну изменения имени пользоваеля
const popupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия окна изменения имени пользователя
const formElement = document.querySelector('.popup__form'); //переменная для доступа к элементам ввода в окне изменения имени пользователя
const nameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода окна изменения имени пользователя
const jobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода 
const profileName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

const newCardpopup = document.querySelector('#card-add');//переменная для обращения изменения новой карточки
const newCardButton = document.querySelector('.profile__add-button');// кнопка для добавления новой каточки мест
const newCardpopupCloseButton = newCardpopup.querySelector('.popup__close-button');//переменная для закрытия окна изменения новой карточки
const newCardformElement = newCardpopup.querySelector('.popup__form');//переменная для доступа к элементам ввода в окне изменения новой карточки
const newCardName = newCardpopup.querySelector('.popup__input_name');//переменная для доступа к первой строке ввода новой карточки
const newCardLink = newCardpopup.querySelector('.popup__input_link');//переменная для доступа ко второй строке ввода новой карточки

const largeImagePopup = document.querySelector('#large-image');//переменная для открытия просмотра картинки
const largeImagePopupCloseButton = largeImagePopup.querySelector('.popup__close-button');//переменная для закрытия просмотра картинки

let cards = []; //хранение карточек на странице;

//массив карточек появляющихся по умолчанию
const initialCards = [
  {
    name: 'Ижевск',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1908497/pub_605090ade781846a40ad1577_605090f90a7d51654ace9a25/scale_1200'
  },
  {
    name: 'Сарапул',
    link: 'https://pro-sarapul.ru/images/photo/usadyba-bashenina-sarapul-208.jpg'
  },
  {
    name: 'Глазов',
    link: 'https://s12.stc.yc.kpcdn.net/share/i/12/10752003/wr-960.webp'
  },
  {
    name: 'Воткинск',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/2352663/pub_5fc92ec76bcad04cbc676afa_5fc92f9852642f33b9b60acf/scale_1200'
  },
  {
    name: 'Можга',
    link: 'https://express-china.ru/upload/iblock/910/mozhga.jpg'
  },
  {
    name: 'Удмуртия',
    link: 'https://pbs.twimg.com/media/FM6VbegXwAURqlI.jpg'
  }
];

// функция делающая попап невидимым
function closePopup() {
  popup.classList.remove('popup_opened');
  popupCloseButton.removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopupOnClick);
  document.body.removeEventListener('keyup', closePopupOnEscape);
  formElement.removeEventListener('submit', formSubmitHandler);
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  //меняю текст
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
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
  popup.classList.add('popup_opened');
  popupCloseButton.addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupOnClick);
  document.body.addEventListener('keyup', closePopupOnEscape);
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', formSubmitHandler);
  //установим значение полей ввода
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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
  maxCounterForId += 1;
  cards.push({name: newCardName.value, link: newCardLink.value, like: false, id: `${maxCounterForId}`});
  showContent();
  //закрываем попап
  closeNewCardPopup();
}
//действия закрытия попапа добавляющего новую карточку
function closeNewCardPopup() {
  newCardpopup.classList.remove('popup_opened');
  newCardpopupCloseButton.removeEventListener('click', closeNewCardPopup);
  newCardpopup.removeEventListener('click', closeNewCardPopupOnClick);
  document.body.removeEventListener('keyup', closeNewCardPopupOnEscape);
  newCardformElement.removeEventListener('submit', formNewCardSubmitHandler);
}

//действия необходимые для открытия попапа добавления новой карточки с фотографией
function openNewCardPopup() {
  newCardpopup.classList.add('popup_opened');
  newCardpopupCloseButton.addEventListener('click', closeNewCardPopup);
  newCardpopup.addEventListener('click', closeNewCardPopupOnClick);
  document.body.addEventListener('keyup', closeNewCardPopupOnEscape);
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  newCardformElement.addEventListener('submit', formNewCardSubmitHandler);
  //установим значение полей ввода
  newCardName.value = "";
  newCardLink.value = "";
}

// открытие попап при нажатии на "карандаш"
button.addEventListener('click', function () {
  openPopup();
});
//обработка события по нажатию кнопки добавления новой карточки
newCardButton.addEventListener('click', function () {
  openNewCardPopup();
});
//проставление лайка
function changeLikeStatus(element_id,likeElement) {
  console.log(element_id);
  cardToSetLikeStatus = cards.find((cardArrayElement) => cardArrayElement.id === element_id);
  if (cardToSetLikeStatus != undefined) {
    cardToSetLikeStatus.like = !cardToSetLikeStatus.like;
    if (cardToSetLikeStatus.like) {
      likeElement.classList.add('elements__like-button_active')
    }
    else {
      likeElement.classList.remove('elements__like-button_active')
    }
  }
}
//лайк при нажатии на сердечко
function likeButtonPress(evt) {
  changeLikeStatus(evt.target.attributes.id.value.substr(4),evt.target);
}
//удаление карточки при нажатии на урну
function deleteCard(element_id,likeElement) {
  cardToDelete = cards.find((cardArrayElement) => cardArrayElement.id === element_id);
  if (cardToDelete != undefined) {
    cards.splice(cards.indexOf(cardToDelete),1);
    patternToSearch = `#card${element_id}`;
    elementToDelete = document.querySelector(patternToSearch);
    if (elementToDelete != undefined) {
      elementToDelete.remove();
    }
  };

}
//действие выполняемое при нажатии на урну
function binButtonPress(evt) {
  deleteCard(evt.target.attributes.id.value.substr(3),evt.target)
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
function PreviewImageLarge(idOfElementToPreview) {
  largeImagePopup.classList.add('popup_opened');//делаем попап окна просмотра картинки видимым
  largeImagePopupCloseButton.addEventListener('click', closeLargeImagePopup);
  largeImagePopup.addEventListener('click', closeLargeImagePopupOnClick);
  document.body.addEventListener('keyup', closeLargeImagePopupOnEscape);
  imagePreview = largeImagePopup.querySelector(".popup__large-image-preview");
  imageCaption = largeImagePopup.querySelector(".popup__image-title");
  card = cards.find((el) => el.id === idOfElementToPreview);
  if (card != undefined) {
    imagePreview.src = card.link;
    imagePreview.alt = card.name;
    imageCaption.innerText = card.name;
  }
  
}
//открытие окна просмотра картинки
function largeImagePress(evt) {
  idOfElement = evt.target.parentElement.id.substr(4);
  PreviewImageLarge(idOfElement);
}

//добавление карточек 
function showContent() {
  const cardElement = document.getElementsByTagName("template")[0];
  const cardElementsNode = document.getElementsByClassName("elements")[0];
  cards.forEach((currentCard) => {
    if (!currentCard.onPage) {
      let elementToAdd = cardElement.content.cloneNode(true);
      elementToAdd.querySelector(".elements__card").setAttribute('id',`card${currentCard.id}`);
      elementToAdd.querySelector(".elements__title").innerText = currentCard.name;
      imagePanel = elementToAdd.querySelector(".elements__image");
      imagePanel.src = currentCard.link;
      imagePanel.alt = currentCard.name;
      imagePanel.addEventListener('click', largeImagePress);
      likeButton = elementToAdd.querySelector(".elements__like-button")
      likeButton.setAttribute('id',`like${currentCard.id}`);
      likeButton.addEventListener('click', likeButtonPress);
      binButton = elementToAdd.querySelector(".elements__bin-button");
      binButton.setAttribute('id',`bin${currentCard.id}`);
      binButton.addEventListener('click', binButtonPress);
      //elements__bin-button
      cardElementsNode.appendChild(elementToAdd);
      currentCard.onPage = true;
    }
  })
}
//при открытии страницы нужно показать карточки по умолчанию, поэтому копирую из инишиалКардс в кардс
cards = Object.assign([], initialCards);
//переменная которая увеличивается каждый раз при добавлении новой карточки, ее смысл
//в том чтобы давать всегда уникальный код для айди карточек
maxCounterForId = 1000000;
//инициализирую массив карточек: ни одна карточка не показана на странице, не залайкана, уникальный айди у каждой карточки
cards.forEach((element) => {
  element.onPage = false;
  element.like = false;
  maxCounterForId += 1;
  element.id = `${maxCounterForId}`;
}
)
//покажем карточки, которые пока не видимы
showContent();


