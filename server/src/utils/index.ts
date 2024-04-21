export const parseCookie = (
  cookie: string
): Partial<{
  userId: string
}> => {
  console.log('===cookie', cookie)
  if (!cookie) {
    return {}
  }
  return cookie
    ?.split(';')
    .map((item) => {
      const [key, value] = item.split('=')
      return [key, value ?? '']
    })
    .reduce((prevValue, curValue) => {
      const [key, value] = curValue
      prevValue[key] = value
      return prevValue
    }, {} as any)
}
