import Des from './Des';

/**
 * [encodeURL description]
 * @param  {[any]} argument [description]
 * @return {[string]}          [description]
 */
export default function encodeURL(argument: string) {
  return encodeURIComponent(Des.encrypt(JSON.stringify(argument)));
}
