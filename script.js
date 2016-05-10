var formContact = document.querySelector("#contact"); // получаем ссылку на тег формы
var listContacts = document.querySelector(".list-contacts"); // получаем ссылку на div с информацией об истории контактов
var divAlert = document.querySelector(".type-error"); // получаем ссылку на div с текстом ошибки
var listTitle = document.querySelector(".list-title"); // получаем ссылку на div с текстом ошибки
var inputNameValue = formContact.querySelector("#name"); // получаем ссылку на input с именем
var inputSurnameValue = formContact.querySelector("#surname"); // получаем ссылку на input с фамилией.
var inputTelNumberValue = formContact.querySelector("#telNumber"); // получаем ссылку на input с телефоном
var inputAvatarValue = formContact.querySelector("#avatar"); // получаем ссылку на input с фото
var inputMailValue = formContact.querySelector("#mail"); // получаем ссылку на input с фото
var inputGenderValue;//  хранит значение input-а пол
var inputMaritalValue;// хранит значение input-а семейный статус
var buttonSubmitForm = formContact.querySelector("button"); // получаем ссылку на кнопку отправки результатов формы

divAlert.style.display = "none";
listTitle.style.display = "none";

function getGender(genderStr)
{
    inputGenderValue = genderStr;  
}

function getMarital(maritalStr)
{
    inputMaritalValue = maritalStr; 
}

// функция-обработчик формы
function addContact(e) {
	// отменяем действие action-а (для предотвращения перехода по аттрибуту action, который все равно не был указан)
	e.preventDefault();

	// получаем значение поля #name
	var nameValue = inputNameValue.value;
	// получаем значение поля #surname
	var surnameValue = inputSurnameValue.value;
	// получаем значение поля #surname
	var telNumberValue = inputTelNumberValue.value;
	// получаем значение поля #surname
	var avatarValue = inputAvatarValue.value;
	// получаем значение поля #surname
	var mailValue = inputMailValue.value;
	
	var genderValue = (inputGenderValue) ? inputGenderValue : "не указанно";
	var maritalValue = (inputMaritalValue) ? inputMaritalValue : "не указанно";

	listTitle.style.display = "block";
	 
	// объявляем пустую строку, в которой будем формировать текст для вывода
	var logString = "";

	// проверяем ЕСЛИ пользователь не ввел ничего в одном из полей
	// аналогично можно было бы написать if (nameValue.length === 0 || surnameValue === 0.....)
	if (!nameValue || !surnameValue || !telNumberValue || !avatarValue || !mailValue || inputGenderValue === undefined || inputMaritalValue === undefined) {
		// показываем ошибку, вызывая функцию, которая ее покажет
		showAlert("Все поля должны быть заполнены!");
		// завершаем выполнение текущей функции addContact путем возврата пустого значения
		return;
	}

	function isTelNumber( value ) { //проверяем нет ли букв в строке с номером телефона
	  return (/^(\+\d{3}|\+\d{2}|\+\d{1}|8)(\(\d{3}\)|\d{3})\d{7}$/).test( value );
	}
	
	function isNameSurnameCorrect( value ) { //проверяем, что в строке с именем или фамилией нет цифры 
		return (/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/).test( value );
	}

	function isUrlCorrect( value ) { //проверяем ссылку
		return (/^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i).test( value );
	}

	if( !isNameSurnameCorrect(nameValue) ) { //проверяем корректность имени
  showAlert("Имя содержат недопустимые символы");
		// завершаем выполнение текущей функции addContact путем возврата пустого значения
		return;
	}

	if( !isNameSurnameCorrect(surnameValue) ) { //проверяем корректность фамилии
  showAlert("Фамилия содержат недопустимые символы");
		// завершаем выполнение текущей функции addContact путем возврата пустого значения
		return;
	}

	if( !isTelNumber(telNumberValue) ) {  //проверяем корректность номера телефона
  showAlert("Неверный формат телефонного номера");
		// завершаем выполнение текущей функции addContact путем возврата пустого значения
		return;
	}

	if( !isUrlCorrect(avatarValue) ) { //проверяем корректность ссылки на фото
  showAlert("Сыылка на фото не распознана");
		// завершаем выполнение текущей функции addContact путем возврата пустого значения
		return;
	} 

	logString = '<div class="center-block contact-block">\
					<p>Имя: ' + nameValue + '</p>\
					<p>Фамилия: ' + surnameValue + '</p>\
					<p>Телефон: ' + telNumberValue + '</p>\
					<p>Cсылка на фото: <a target="_blank" href="' + avatarValue + '">Посмотреть</a></p>\
					<p>E-mail: ' + mailValue + '</p>\
					<p>Пол: ' + genderValue + '</p>\
					<p>Семейный статус: ' + maritalValue + '</p>\
				</div>';
	
	var contactCard = document.createElement('div');
  contactCard.innerHTML = logString;

	// добавляем строку в виде HTML-тега li в ul список
	listContacts.insertBefore(contactCard, listContacts.firstChild); // += logString;
}

// функция показа ошибки
function showAlert(message) {
	// выводим внутрь div-а с ошибкой необходимый текст
	divAlert.innerHTML = message;
	// показываем блок с ошибкой (так как изначально в css мы задали этому блоку display: none)
	divAlert.style.display = "block";
	// отключаем возможность ввода значений в input-ы на время показа ошибки
	inputNameValue.disabled = true;
	inputSurnameValue.disabled = true;
	inputTelNumberValue.disabled = true;
	inputAvatarValue.disabled = true;
	inputMailValue.disabled = true;

	// отключаем нажатие на кнопку отправки формы на время показа ошибки
	buttonSubmitForm.disabled = true;
	// устанавливаем таймер на 2 секунды, по истечению времени которого выполнится вложенная анонимная функция

	// функция, задача которой включить снова все input-ы и кнопку, очистить блок от показанной ошибки и скрыть его
	function whenTimeOut() {
		// очищаем div от текста с описанием ошибки
		divAlert.innerHTML = "";
		// скрываем его
		divAlert.style.display = "none";
		// включаем обратно все элементы формы
		inputNameValue.disabled = false;
		inputSurnameValue.disabled = false;
		inputTelNumberValue.disabled = false;
		inputAvatarValue.disabled = false;
		inputMailValue.disabled = false;
		buttonSubmitForm.disabled = false;
	}

	// устанавливаем таймер, по истечению времени которого выполнится функция whenTimeOut
	setTimeout(whenTimeOut, 2000);	
}
