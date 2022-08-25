/**
 * 
 * @param name string which is to be validated
 * @returns false if string is whitespaces only
 */
export const stringValidator = (name: string): boolean => {
  if (!name.replace(/ /g, "")) {
    return false
  }
  return true;
};
