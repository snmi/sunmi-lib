import Des from './Des';

/**
 * [decodeURL description]
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
export default function decodeURL(argument: string) {

  if (!argument) {
    return 'no argument';
  }

  const url = decodeURIComponent(argument);
  const jsonString = Des.decrypt(url);

  try {
    const output = jsonString && jsonString !== 'undefined' ? JSON.parse(jsonString) : jsonString;
    return output;
  } catch (e) {

    console.error(e, jsonString, url);
    return jsonString;
  }
}
