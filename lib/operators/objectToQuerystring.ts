import encodeURL from 'lib/secure/encodeURL'

export default function objectToQuerystring(obj: any) {
  let queryString: string = '?'

  queryString += Object.keys(obj)
    .map((key: string) => (`${key}=${encodeURL(obj[key] ? obj[key] : '')}`))
    .join('&')

  return queryString
}
