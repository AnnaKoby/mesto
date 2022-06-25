const button = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const popup = document.querySelector('.popup'); // переменная для обращения к окну изменения имени пользоваеля
const popupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия окна изменения имени пользователя
const formElement = document.querySelector('.popup__form'); //переменная для доступа к элементам ввода в окне изменения имени пользователя
const nameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода окна изменения имени пользователя
const jobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода 
const profileName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

const newCardpopup = document.querySelector('.popup__card-add');
const newCardButton = document.querySelector('.profile__add-button');// кнопка для добавления новой каточки мест
const newCardpopupCloseButton = newCardpopup.querySelector('.popup__close-button');
const newCardformElement = newCardpopup.querySelector('.popup__form');
const newCardName = newCardpopup.querySelector('.popup__input_name');
const newCardLink = newCardpopup.querySelector('.popup__input_link');



let cards = []; //хранение карточек на странице;

//добавление карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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

function closeNewCardPopupOnClick(e) {
  if (e.target === e.currentTarget) {
    closeNewCardPopup();
  }
}

function closeNewCardPopupOnEscape(e) {
  if (e.key === 'Escape') {
    closeNewCardPopup();
  }
}

function formNewCardSubmitHandler(evt) {
  //debugger;
  evt.preventDefault();
  //добавляем новую карточку
  maxCounterForId += 1;
  cards.push({name: newCardName.value, link: newCardLink.value, like: false, id: `${maxCounterForId}`});
  showContent();
  //закрываем попап
  closeNewCardPopup();
}

function closeNewCardPopup() {
  newCardpopup.classList.remove('popup_opened');
  newCardpopupCloseButton.removeEventListener('click', closeNewCardPopup);
  newCardpopup.removeEventListener('click', closeNewCardPopupOnClick);
  document.body.removeEventListener('keyup', closeNewCardPopupOnEscape);
  newCardformElement.removeEventListener('submit', formNewCardSubmitHandler);
}

//действия необходимые для открытия попапа добавления новой карточки с фотографией
function openNewCardPopup() {
  //debugger;
  newCardpopup.classList.add('popup_opened');
  newCardpopupCloseButton.addEventListener('click', closeNewCardPopup);
  newCardpopup.addEventListener('click', closeNewCardPopupOnClick);
  document.body.addEventListener('keyup', closeNewCardPopupOnEscape);
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  newCardformElement.addEventListener('submit', formNewCardSubmitHandler);
  //установим значение полей ввода
}

//debugger;
// открытие попап при нажатии на "карандаш"
button.addEventListener('click', function () {
  openPopup();
});

newCardButton.addEventListener('click', function () {
  openNewCardPopup();
  //debugger;
});

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

function likeButtonPress(evt) {
  changeLikeStatus(evt.target.attributes.id.value.substr(3),evt.target);
}

function deleteCard(element_id,likeElement) {
  debugger;
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

function binButtonPress(evt) {
  deleteCard(evt.target.attributes.id.value.substr(3),evt.target)
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
      elementToAdd.querySelector(".elements__image").src = currentCard.link;
      elementToAdd.querySelector(".elements__image").alt = currentCard.name;
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

cards = Object.assign([], initialCards);
maxCounterForId = 1000000;
cards.forEach((element) => {
  element.onPage = false;
  element.like = false;
  maxCounterForId += 1;
  element.id = `${maxCounterForId}`;
}
)

showContent();


