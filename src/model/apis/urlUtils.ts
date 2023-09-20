/* eslint-disable no-prototype-builtins */
type JoinWithSlash = {
  (...args: string[]): string
}

export const joinWithSlash: JoinWithSlash = (...args) => args.join('/')

export const objectToQueryString = (obj: anyObject) => {
  const queryString = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      if (typeof value === 'string' || typeof value === 'number') {
        queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
      } else if (Array.isArray(value) && value.length > 0) {
        value.forEach((item) => {
          queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(item))
        })
      }
    }
  }

  return queryString.length > 0 ? '?' + queryString.join('&') : ''
}
