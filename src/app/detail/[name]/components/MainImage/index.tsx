'use client';

import Image from 'next/image';

import getPokemonImg from '@/utils/getPokemonImg';

import ImageWrapper from './components/ImageWrapper';
import type { MainImageProps } from './index.types';

const MainImage = ({ id, name }: MainImageProps) => {
  return (
    <ImageWrapper id={id} name={name}>
      <Image
        priority
        src={getPokemonImg(id)}
        alt={name}
        height={300}
        width={300}
      />
    </ImageWrapper>
  );
};

export default MainImage;
