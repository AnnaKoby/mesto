const button = document.querySelector('.profile__pen-button'); // переменная для обращения кнопки "карандаш"
const popup = document.querySelector('.popup'); // переменная для обращения к окну попапа
const popupCloseButton = document.querySelector('.popup__close-button'); // переменная для закрытия попапа
const formElement = document.querySelector('.popup__form'); //переменная для доступа к элементам ввода в попапе
const nameInput = document.querySelector('.popup__input_type_name'); //переменная для доступа к первой строке ввода
const jobInput = document.querySelector('.popup__input_type_description'); //переменная для доступа ко второй строке ввода
const profileName = document.querySelector('.profile__name'); //переменная для доступа к месту отражения первой строки на странице
const profileDescription = document.querySelector('.profile__description'); //переменная для доступа к месту отражения второй строки на странице

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
    profileName.textContent=nameInput.value;
    profileDescription.textContent=jobInput.value;
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
    nameInput.value=profileName.textContent;
    jobInput.value=profileDescription.textContent;
}

// открытие попап при нажатии на "карандаш"
button.addEventListener('click', function () {
    openPopup();
});