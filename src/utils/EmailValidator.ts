export const isInvalidEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/
  return email.length <= 0 || !re.test(email)
}
