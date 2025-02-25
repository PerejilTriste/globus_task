import {CustomInput} from "./CustomInput.jsx";
import {useState} from "react";
import {formatPhoneNumber, sendForm} from "./utils.js";

export const Form = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')
    const [errors, setErrors] = useState({});

    const handleChangePhone = (e) => {
        const inputValue = e.target.value;
        const formatted = formatPhoneNumber(inputValue);
        setPhoneNumber(formatted);
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangeUserMessage = (e) => {
        setUserMessage(e.target.value);
    };

    const sendFormBackend = (e) => {
        e.preventDefault();
        try {
            sendForm({name, phoneNumber, email, userMessage});
            setPhoneNumber('');
            setName('');
            setEmail('');
            setErrors({});
        } catch (e) {
            setErrors(JSON.parse(e.message));
        }

    }
    return (
        <div className="flex flex-col h-screen py-[68px] px-[103px] bg-white">
            <div className="flex flex-col max-w-[325px] text-left gap-2">
                <h1 className="rewrite-h1">Получить консультацию</h1>
                <p>Заполните форму и мы свяжемся с вами в ближайшее время</p>
            </div>
            <form className="pt-[34px] flex flex-col gap-[10px] max-w-[400px]">
                <CustomInput inputProps={{
                    id: 'name', // Сделано для автоподставление браузером
                    required: true, // По сути это исключает нужду в валидации имени, но мы ее добавим на всякий случай
                    minLength: 1 // Для уверенности
                }} value={name} label="Имя" errorMsg={errors?.name}
                             onChangeCallback={handleChangeName}/>
                <CustomInput inputProps={{maxLength: 18, id: 'phone'}} value={phoneNumber} label="Телефон"
                             errorMsg={errors?.phoneNumber}
                             onChangeCallback={handleChangePhone}/>
                <CustomInput inputProps={{
                    id: 'email',
                    required: true // Тут все равно придется писать валидацию
                }} value={email} label="Email" errorMsg={errors?.email}
                             onChangeCallback={handleChangeEmail}/>
                <CustomInput inputProps={{
                    required: true
                }} value={userMessage} label="Текст сообщения" errorMsg={errors?.userMessage}
                             onChangeCallback={handleChangeUserMessage} customHeight={140} isTextArea/>
                <button
                    className="w-[163px] h-[50px] bg-[#016FDD] text-[white] font-[bold] text-[18px] rounded-[6px] hover:bg-[#005B9F]"
                    onClick={sendFormBackend}
                >
                    Отправить
                </button>
            </form>


        </div>
    )
}
