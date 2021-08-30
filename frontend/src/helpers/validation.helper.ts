export const DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY = '(only digits, Latin letters and special characters allowed)';
export const LATIN_LETTER_ONLY = '(only Latin letters allowed)';
export const DIGITS_LATIN_LETTERS_ONLY = '(only digits, Latin letters allowed)';
export const EMAIL_MESSAGE = `Email length must be 4-320(with @) symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORD_MESSAGE = `Password length must be 5-32 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const NEW_CURRENT_PASSWORDS_MATCH = 'New and current passwords match.';
export const PASSWORDS_NOT_MATCH = 'Passwords do not match.';
export const NICKNAME_MESSAGE = `Nickname must be 1-30 symbols ${DIGITS_LATIN_LETTERS_ONLY}.`;
export const NICKNAME_ENGAGED_MESSAGE = 'This nickname is already in use. Please, choose another one.';
export const NAME_MESSAGE = `Name must be 1-30 symbols ${LATIN_LETTER_ONLY}.`;
export const SURNAME_MESSAGE = `Surname must be 1-30 symbols ${LATIN_LETTER_ONLY}.`;

/* eslint-disable max-len */
const emailRegex = /^(([!#$%&'*+-/=?^_`{|A-Za-z0-9]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((?![-])([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
const passwordRegex = /^[!@#$%&'":;*+-/\\=?^_`{}|().<>A-Za-z0-9]*$/;
const userNameSurnameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;
const userNicknameRegex = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;

export const isValidEmail = (str: string): boolean => emailRegex.test(str.toLowerCase()) && str.length >= 4 && str.length <= 320;
export const isValidPassword = (str: string): boolean => passwordRegex.test(str) && str.length >= 5 && str.length <= 32;
export const isValidNickname = (str: string): boolean => userNicknameRegex.test(str) && str.length >= 1 && str.length <= 30;
export const isValidNameSurname = (str: string): boolean => userNameSurnameRegex.test(str) && str.length >= 1 && str.length <= 30;
