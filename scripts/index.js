const button = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const popup = document.querySelector('.popup'); // переменная для обращения к окну попапа
const popupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия попапа
const formElement = document.querySelector('.popup__form'); //переменная для доступа к элементам ввода в попапе
const nameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода
const jobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода
const profileName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

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
  //меняю текс
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

//действия необходимые для открытия попапа
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

// открытие попап при нажатии на "карандаш"
button.addEventListener('click', function () {
  openPopup();
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
  console.log(evt.target);
  console.log(evt.target.attributes.id.value);
  changeLikeStatus(evt.target.attributes.id.value.substr(4),evt.target);
}

//добавление карточек 
function showContent() {
  const cardElement = document.getElementsByTagName("template")[0];
  const cardElementsNode = document.getElementsByClassName("elements")[0];
  cards.forEach((currentCard) => {
    if (!currentCard.onPage) {
      let elementToAdd = cardElement.content.cloneNode(true);
      elementToAdd.querySelector(".elements__card").setAttribute('id',currentCard.id);
      elementToAdd.querySelector(".elements__title").innerText = currentCard.name;
      elementToAdd.querySelector(".elements__image").src = currentCard.link;
      elementToAdd.querySelector(".elements__image").alt = currentCard.name;
      likeButton = elementToAdd.querySelector(".elements__like-button")
      likeButton.setAttribute('id',`like${currentCard.id}`)
      likeButton.addEventListener('click', likeButtonPress);
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


