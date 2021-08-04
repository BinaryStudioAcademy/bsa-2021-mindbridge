export const DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY = '(only digits, Latin letters and special characters allowed)';
export const LATIN_LETTER_ONLY = '(only Latin letters allowed)';
export const DIGITS_LATIN_LETTERS_ONLY = '(only digits, Latin letters allowed)';
export const EMAIL_MESSAGE = `Email length must be 3-320(with @) symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORD_MESSAGE = `Password length must be at least 5 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORDS_NOT_MATCH = 'Passwords do not match.';
export const NICKNAME_MESSAGE = `Nickname must be 2-40 symbols ${DIGITS_LATIN_LETTERS_ONLY}.`;
export const NAME_MESSAGE = `Name must be 2-40 symbols ${LATIN_LETTER_ONLY}.`;
export const SURNAME_MESSAGE = `Surname must be 2-40 symbols ${LATIN_LETTER_ONLY}.`;

// eslint-disable-next-line max-len
const emailRegex = /^\w[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~"-]*@((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z0-9][a-zA-Z\-0-9]*\.)+[a-zA-Z]+))$/;
const passwordRegex = /^(?=^.{5,}$)(?=\S+$).+$/;
const userNameSurnameRegex = /^[a-zA-Z]{2,40}$/;
const userNicknameRegex = /^[a-zA-Z0-9- ]{2,40}$/;

export const isValidEmail = (str: string): boolean => emailRegex.test(str) && str.length >= 3 && str.length <= 320;
export const isValidPassword = (str: string): boolean => passwordRegex.test(str) && str.length >= 5;
export const isValidNickname = (str: string): boolean => userNicknameRegex.test(str);
export const isValidNameSurname = (str: string): boolean => userNameSurnameRegex.test(str);
