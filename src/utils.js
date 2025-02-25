export const formatPhoneNumber = (value) => {

    const numbers = value.replace(/\D/g, ''); // Удаляем все нечисловые символы


    const phoneNumber = numbers.slice(0, 11); // Берем только первые 11 цифр


    let formattedNumber = ''; // Форматируем номер
    if (phoneNumber.length > 0) {
        formattedNumber = '+7';
    }
    if (phoneNumber.length > 1) {
        formattedNumber += ` (${phoneNumber.slice(1, 4)}`;
    }
    if (phoneNumber.length > 4) {
        formattedNumber += `) ${phoneNumber.slice(4, 7)}`;
    }
    if (phoneNumber.length > 7) {
        formattedNumber += `-${phoneNumber.slice(7, 9)}`;
    }
    if (phoneNumber.length > 9) {
        formattedNumber += `-${phoneNumber.slice(9, 11)}`;
    }

    return formattedNumber;
}

const sanitizeInput = (value) => {
    if (!value) return '';
    // Удаляем потенциально опасные символы и скрипты
    return value
        .replace(/[<>&"']/g, (match) => ({
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#x27;'
        }[match]))
        .replace(/script/gi, ''); // Дополнительная защита от script тегов
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Валидация со стак оверфлоу
    return regex.test(email);
}
export const sendForm = ({ name, phoneNumber, email,userMessage }) => {
    // Санитизируем все входные данные
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedUserMessage = sanitizeInput(userMessage);
    const phoneNumberCleared = phoneNumber.replace(/\D/g, '');

    const errorsMessage = {};

    // Валидация очищенных данных
    if (phoneNumberCleared.length !== 11) {
        errorsMessage.phoneNumber = 'Укажите правильный номер';
    }

    if (!sanitizedName.trim()) {
        errorsMessage.name = 'Укажите ваше имя';
    }

    if (!sanitizedEmail || !validateEmail(sanitizedEmail)) {
        errorsMessage.email = 'Укажите правильный email';
    }
    if(!sanitizedUserMessage.trim()){
        errorsMessage.userMessage = 'Укажите ваше сообщение';
    }

    if (Object.keys(errorsMessage).length > 0) {
        console.log(errorsMessage);
        throw new Error(JSON.stringify(errorsMessage));
    } else {
        // Используем санитизированные данные в выводе
        alert(`Данные отправлены\nИмя: ${sanitizedName}\nПочта: ${sanitizedEmail}\nНомер телефона: ${phoneNumberCleared}\nПользовательское сообщение: ${sanitizedUserMessage}`);
    }
};
