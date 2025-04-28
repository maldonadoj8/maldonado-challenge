/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/

/*-------------------------------- Predicates --------------------------------*/
/**
 * Returns true/false if a character is alphanumeric.
 *
 * @param {string} character - Character to test.
 * 
 * @returns {boolean} True if the character is a letter (uppercase or lowercase) or 
 * a number; otherwise, false.
 */
export const isAlphanumeric = (character) => {
  return /^[a-zA-Z0-9]$/.test(character); };

/**
 * Returns true/false if a keycode is in the list of allowed keycodes.
 * 
 * @param {string} keycode - Keycode to test.
 * 
 * @returns {boolean}
 */
export const isAllowedKeyCode = (keycode) => {
  return [
    "ArrowLeft", 
    "ArrowRight", 
    "ArrowUp", 
    "ArrowDown",
    "Backspace", 
    "Delete", 
    "Tab", 
    "Escape" ].includes(keycode); };

/**
 * Returns true/false if the keyboard event is a command (Ctrl+V, Cmd+V, 
 * Shift+Insert).
 *
 * @param {KeyboardEvent} e - Keyboard event.
 * 
 * @returns {boolean} True if it is a paste or similar command.
 */
export const isAllowedCommand = (e) => {
  return (
    ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'v') ||
    (e.shiftKey && e.key === 'Insert')); };
     
/**
 * Returns true/false if a character is a letter or space.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean}
 */
export const isLetterOrSpace = (character) => {
  return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]$/.test(character); };

/**
 * Returns true/false if a character is a number.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean}
 */
export const isNumber = (character) => {
  return /[0-9]/.test(character); };

/**
 * Returns true/false if a character is a number or space.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean}
 */
export const isNumberOrSpace = (character) => {
  return /[0-9 ]/.test(character); };

/**
 * Returns true/false if a character is a number or dot.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean}
 */
export const isNumberOrDot = (character) => {
  return /[0-9.]/.test(character); };

/**
 * Returns true/false if a character is a number, dot, or currency symbol.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean} True if the character is a number, dot, or currency symbol.
 */
export const isMoney = (character) => {
  return /[0-9.$]/.test(character); };

/**
 * Returns true/false if a character is valid for a description.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean} True if the character is allowed in a description.
 */
export const isDescriptionChar = (character) => {
  return character === "Enter" 
    || /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s.,;:¡!¿?"'()\-_•\n\r]$/.test(character); };

/**
 * Returns true/false if a character is valid for a basic description.
 * 
 * @param {string} character - Character to test.
 * 
 * @returns {boolean} True if the character is allowed in a basic description 
 * basic.
 */
export const isBasicDescriptionChar = (character) => {
  return /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s.]$/.test(character); };

/**
 * Returns true/false if all characters in the string are valid for an email address.
 *
 * Allowed characters: letters, numbers, @, ., _, -, !, #, $, %, &, ', *, +, /, =, ?, ^, `, {, |, }, ~
 *
 * @param {string} email - String to validate.
 * @returns {boolean} True if all characters are allowed in an email address.
 */
export const isEmail = (email) => {
  if (!email) return false;
  return /^[\w.!#$%&'*+/=?^_`{|}~@-]+$/.test(email);
};

/*----------------------------- Transformations -----------------------------*/

/*--------------------------------- Formatting ---------------------------------*/
/**
 * Formats a 2FA code.
 *
 * This function receives text that may include numbers and letters,
 * removes all non-alphanumeric characters, converts all letters to uppercase, 
 * and groups the characters into groups of a specified size (default 6). 
 * Additionally, the maximum number of groups to format can be limited.
 *
 * @param {string} text - The 2FA code to format.
 * @param {number} [group=6] - Number of characters per group.
 * @param {number} [maxGroups=Infinity] - Maximum number of groups to include 
 * in the result.
 * 
 * @returns {string} Formatted 2FA code.
 */
export const format2FACode = (text, group = 6, 
maxGroups = 1) => {
  const ALPHANUMERIC = sanitizeAlphanumeric(text).toUpperCase();
  const GROUPS = [];
  for(let i = 0; i < ALPHANUMERIC.length; i += group) {
    GROUPS.push(ALPHANUMERIC.slice(i, i + group)); }
  // Limit to the first maxGroups groups
  const LIMITED_GROUPS = GROUPS.slice(0, maxGroups);
  return LIMITED_GROUPS.join(' '); };

/**
 * Transforms a military time range to "HH:MM - HH:MM".
 * 
 * @param {number} start - Start time in military format.
 * @param {number} end - End time in military format.
 * 
 * @returns {string} - Time range formatted as "HH:MM - HH:MM"
 */
export const formatMilitaryTimeRange = (start, end) => {
  return `${militaryHourToString(start)} - ${militaryHourToString(end)}`; };

/**
 * Transforms decimal texts "34.", ".0"  to "34.0", "0.0", etc.
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string}
 */
export const formatDecimalNumber = (text) => {
  // Removes characters that are not digits or dots.
  let decimal = sanitizeDecimalNumber(text);
  // Adds a 0 at the beginning if decimal starts with a dot.
  if(decimal.startsWith('.')) {
    decimal = `0${decimal}`; }
  // If decimal is only 0, converts it to 0.0.
  if(decimal === '0') {
    decimal = '0.'; }
  return decimal; };

/**
 * Transforms decimal texts "34.", ".0"  to "34.0", "0.0", etc.
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string}
 */
export const formatDecimalNumberPost = (text) => {
  // Removes characters that are not digits or dots.
  let decimal = sanitizeDecimalNumber(text);
  // Ensures at least one character.
  decimal = decimal.padStart(1, '0');
  // Adds a 0 at the beginning if decimal starts with a dot.
  if(decimal.startsWith('.')) {
    decimal = `0${decimal}`; }
  // Adds a 0 at the end if decimal ends with a dot.
  if(decimal.endsWith('.')) {
    decimal += '0'; }
  // If it has no dot, adds .0 at the end.
  if(!decimal.includes('.')) {
    decimal += '.0'; }
  // If decimal is only 0, converts it to 0.0.
  if(decimal === '0') {
    decimal = '0.0'; }
  return decimal; };

/**
 * Transforms numeric text "4111111111111111" to "4111 1111 1111 1111".
 * 
 * @param {string} text - Text to transform.
 * @param {number} max - Maximum number of characters the text should have.
 * 
 * @returns {string} - Text transformed to card format.
 */
export const formatCardNumber = (text, max) => {
  const DIGITS = sanitizeNumber(text).slice(0, max);
  return DIGITS.replace(/(.{4})/g, '$1 ').trim(); };

/**
 * Formats a phone number by removing all non-numeric characters,
 * limiting the number of digits to 10, and determining the format based on the 
 * area code.
 *
 * Uses a list of two-digit area codes (e.g., "55", "56", "33", and "81"). If 
 * the first two digits are in that list, it is assumed that the area code has 
 * 2 digits, and it is formatted as "XX XXXX XXXX". Otherwise, it is assumed 
 * that the area code has 3 digits and is formatted as "XXX XXX XXXX".
 *
 * This implementation avoids adding unnecessary spaces when a group is 
 * incomplete, making it easier to delete spaces with the backspace key.
 *
 * @param {string} text - Numeric text to format.
 * @param {number} [max=10] - Maximum number of digits to consider.
 * 
 * @returns {string} Formatted phone number.
 */
export const formatPhoneNumber = (text, max = 10) => {
  const DIGITS = sanitizeNumber(text).slice(0, max);
  // List of two-digit area codes in Mexico.
  const AREA_CODES = new Set(["55", "56", "33", "81"]);
  // Determines the length of the area code: 2 if the first two digits are in 
  // the list; otherwise, 3.
  const CODE_LENGTH = AREA_CODES.has(DIGITS.slice(0, 2)) ? 2 : 3;
  if(CODE_LENGTH === 2) {
    const AREA   = DIGITS.slice(0, 2);
    const PART1 = DIGITS.slice(2, 6);
    const PART2 = DIGITS.slice(6, 10);
    let formatted = AREA;
    if(PART1) {
      formatted += ` ${PART1}`; }
    if(PART2) {
      formatted += ` ${PART2}`; }
    return formatted; } 
  else {
    const AREA   = DIGITS.slice(0, 3);
    const PART1 = DIGITS.slice(3, 6);
    const PART2 = DIGITS.slice(6, 10);
    let formatted = AREA;
    if(PART1) {
      formatted += ` ${PART1}`; }
    if(PART2) {
      formatted += ` ${PART2}`; }
    return formatted; }};

/**
 * Formats a phone number showing only the last 4 digits and 
 * hiding the rest with bullets.
 *
 * This function receives text that may contain a phone number,
 * removes all non-numeric characters, and then replaces all 
 * digits except the last 4 with the "•" character (bullet).
 *
 * @param {string} text - The phone number to format.
 * 
 * @returns {string} Phone number with only the last 4 digits visible.
 */
export const formatSecurePhoneNumber = (text) => {
  // Sanitize to get only the digits
  const DIGITS = sanitizeNumber(text);
  // If there are no digits, return an empty string
  if(!DIGITS) {
    return ''; }
  // Get the length of the number
  const LENGTH = DIGITS.length;
  // If there are 4 or fewer digits, show them all
  if(LENGTH <= 4) {
    return DIGITS; }
  // Calculate how many digits to hide
  const DIGITS_TO_HIDE = LENGTH - 4;
  // Create a string of bullets of the required size
  const BULLETS = '•'.repeat(DIGITS_TO_HIDE);
  // Get the last 4 digits
  const LAST_DIGITS = DIGITS.substring(DIGITS_TO_HIDE);
  // Return the combination of bullets and last digits
  return `${BULLETS}${LAST_DIGITS}`; };

/**
 * Transforms text to "PascalCase".
 *
 * This function performs the following:
 *  - Removes leading and trailing spaces.
 *  - Splits the text into "segments" or "words" using any character that is not 
 * a letter (a-z or A-Z) or a digit (0-9) as a delimiter.
 *  - Filters out empty segments, in case there are multiple consecutive 
 * delimiters.
 *  - For each segment, checks if the first character is a letter:
 *       - If it is a letter, converts it to uppercase and leaves the rest of 
 * the segment intact.
 *       - If it is not a letter (e.g., starts with a number), returns the 
 * segment unchanged.
 *  - Finally, joins the segments without any separator to produce a single 
 * PascalCase string.
 *
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Text transformed to PascalCase.
 */
export const formatPascalCase = (text) => {
  return text
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter(segment => segment.length > 0)
    .map(segment => {
      const firstLetter = segment.charAt(0);
      if(/[a-zA-Z]/.test(firstLetter)) {
        return firstLetter.toUpperCase() + segment.slice(1); }
      return segment; })
    .join(''); };

/**
 * Transforms text to "snake_case".
 *
 * The function performs the following transformations:
 *  - Removes leading and trailing spaces.
 *  - Replaces spaces and dashes ("-") with underscores ("_").
 *  - Inserts an underscore between a lowercase letter or digit and an uppercase 
 * letter.
 *  - Collapses multiple consecutive underscores into one.
 *  - Removes characters that are not alphanumeric or underscores.
 *  - Converts the resulting text completely to lowercase.
 *
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Text transformed to snake_case.
 */
export const formatSnakeCase = (text) => {
  return text
    .trim()
    .replace(/[\s-]+/g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/_+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase(); };

/**
 * Formats a country code to always display with "+" at the beginning.
 * 
 * @param {string} text - Text containing the country code.
 * 
 * @returns {string} - Country code formatted with "+" at the beginning.
 */
export const formatCountryCode = (text) => {
  // Sanitize the country code to get only the digits
  const digits = sanitizeCountryCode(text);
  // If there are no digits, return only the "+"
  if(!digits) {
    return "+"; }
  // Return the code with "+" at the beginning
  return `+${digits}`; };

/**
 * Formats a description applying capitalization and cleaning.
 * 
 * @param {string} text - Text to format.
 * @param {number} [maxLength=null] - Optional maximum length for the 
 * description.
 * 
 * @returns {string} Text formatted as a description.
 */
export const formatDescription = (text, maxLength = null) => {
  // Sanitize first.
  let description = sanitizeDescription(text);
  // Remove extra spaces (multiple spaces become one) but preserve line breaks.
  description = description.replace(/[ \t]+/g, ' ');
  // Capitalize the first letter of each sentence
  description = description.replace(/(^\w|[.!?]\n+\w|[.!?]\s+\w)/g, match => match.toUpperCase());
  // Apply length limit if specified
  if(maxLength && typeof maxLength === 'number') {
    description = description.slice(0, maxLength); }
  return description; };

/**
 * Formats a basic description applying capitalization and cleaning.
 * Only allows letters, digits, spaces, and dots.
 * 
 * @param {string} text - Text to format.
 * @param {number} [maxLength=null] - Optional maximum length for the 
 * description.
 * 
 * @returns {string} Text formatted as a basic description.
 */
export const formatBasicDescription = (text, maxLength = null) => {
  // Sanitize first.
  let description = sanitizeBasicDescription(text);
  // Remove extra spaces
  description = description.replace(/\s+/g, ' ');
  // Capitalize the first letter of each sentence
  description = description.replace(/(^\w|[.]\s+\w)/g, match => match.toUpperCase());
  // Apply length limit if specified
  if(maxLength && typeof maxLength === 'number') {
    description = description.slice(0, maxLength); }
  return description; };

/**
 * Formats a value as an amount of money.
 * 
 * @param {string} text - Text to format as money.
 * 
 * @returns {string} Text formatted as an amount of money with $ at the 
 * beginning.
 */
export const formatMoney = (text) => {
  // Sanitize the value to keep only numbers and a decimal point.
  let value = sanitizeDecimalNumber(text);
  // If empty, return only the currency symbol.
  if(!value) {
    return '$'; }
  // Add a 0 at the beginning if it starts with a dot.
  if(value.startsWith('.')) {
    value = `0${value}`; }
  // Return the value with the currency symbol.
  return `$${value}`;
};

/**
 * Formats a value as an amount of money with full format for use in onBlur.
 * Ensures there is always a decimal point and at least one digit after the 
 * point.
 * 
 * @param {string} text - Text to format as money.
 * 
 * @returns {string} Text formatted as an amount of money with $ at the 
 * beginning and full decimal format (always with a point and decimal).
 */
export const formatMoneyPost = (text) => {
  // Removes characters that are not digits or dots.
  let value = sanitizeDecimalNumber(text);
  // Ensures at least one character.
  value = value.padStart(1, '0');
  // Adds a 0 at the beginning if it starts with a dot.
  if(value.startsWith('.')) {
    value = `0${value}`; }
  // Adds a 0 at the end if it ends with a dot.
  if(value.endsWith('.')) {
    value += '0'; }
  // If it has no dot, adds .0 at the end.
  if(!value.includes('.')) {
    value += '.0'; }
  // If value is only 0, converts it to 0.0.
  if(value === '0') {
    value = '0.0'; }
  // Return the value with the currency symbol.
  return `$${value}`; };

/**
 * Formats an email address by trimming spaces and converting to lowercase.
 *
 * @param {string} email - Email address to format.
 * @returns {string} Formatted email address.
 */
export const formatEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/*------------------------------- Sanitization -------------------------------*/
/**
 * Transforms text like "34.aSDAS2" to "34AS2", keeping only alphanumeric 
 * characters.
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Transformed text with only alphanumeric characters.
 */
export const sanitizeAlphanumeric = (text) => {
  return text.replace(/[^a-zA-Z0-9]/g, ''); };

/**
 * Trims a text to a maximum length.
 * 
 * @param {string} text - Text to trim.
 * @param {number} max - Maximum number of characters.
 * 
 * @returns {string} Trimmed text.
 */
export const sanitizeMaxLength = (text, max) => {
  return text.slice(0, max); };

/**
 * Transforms text like "34.aSDAS2" to "342", keeping only numbers.
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Transformed text with only numbers.
 */
export const sanitizeNumber = (text) => {
  // Remove non-digit characters.
  let number = text.replace(/[^\d]/g, '');
  return number; };

/**
 * Transforms numeric text like "34.4234.34" to "34.423434".
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Transformed text as a decimal number.
 */
export const sanitizeDecimalNumber = (text) => {
  // Remove non-digit and non-dot characters.
  let decimal = text.replace(/[^\d.]/g, '');
  // If there are multiple dots, keep one and join the rest.
  const PARTS = decimal.split('.');
  if(PARTS.length > 2) {
    decimal = PARTS[0] + '.' + PARTS.slice(1).join(''); }
  return decimal; };

/**
 * Transforms text with spaces to text without spaces.
 * 
 * @param {string} text - Text to transform.
 * 
 * @returns {string} Text without spaces.
 */
export const sanitizeNoSpaces = (text) => {
  return text.replace(/\s/g, ''); };

/**
 * Extracts only the digits from a country code, removing any other character.
 * 
 * @param {string} text - Text containing the country code (may include "+").
 * 
 * @returns {string} Only the digits of the country code.
 */
export const sanitizeCountryCode = (text) => {
  // Remove any character that is not a digit
  return text.replace(/[^\d]/g, ''); };

/**
 * Sanitizes a description allowing letters, numbers, spaces, line breaks, and 
 * common punctuation including bullets.
 * 
 * @param {string} text - Text to sanitize.
 * 
 * @returns {string} Sanitized text keeping only allowed characters.
 */
export const sanitizeDescription = (text) => {
  // Allow letters (including accented), numbers, spaces, line breaks, and 
  // common punctuation
  return text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s.,;:¡!¿?"'()\-_•\n\r]/g, ''); 
};

/**
 * Sanitizes a basic description allowing only letters, digits, spaces, and 
 * dots.
 * 
 * @param {string} text - Text to sanitize.
 * 
 * @returns {string} Sanitized text keeping only basic allowed characters.
 */
export const sanitizeBasicDescription = (text) => {
  // Allow only letters (including accented), numbers, spaces, and dots.
  return text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s.]/g, ''); };

/**
 * Sanitizes an email address by removing invalid characters and trimming spaces.
 *
 * @param {string} email - Email address to sanitize.
 * @returns {string} Sanitized email address.
 */
export const sanitizeEmail = (email) => {
  if (!email) return '';
  // Remove spaces and any character not allowed in emails
  return email.trim().replace(/[^\w.!#$%&'*+/=?^_`{|}~@-]/g, '').toLowerCase();
};