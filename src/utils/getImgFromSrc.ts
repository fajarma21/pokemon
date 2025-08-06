import noImg from '@/assets/no-img.jpg';
import getPokemonImg from '@/utils/getPokemonImg';

const getImgFromSrc = (url: string) => {
  try {
    const regx = url.match(/\/(\d+)\//) || [];
    const index = regx[1] || '';

    if (index) return getPokemonImg(index);
    throw new Error('no image');
  } catch {
    return noImg;
  }
};

export default getImgFromSrc;
