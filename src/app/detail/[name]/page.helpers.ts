import { POKEMON_API } from '@/constants/url';

export const getPokemonData = async (value: string) => {
  try {
    const response = await fetch(`${POKEMON_API}/pokemon/${value}`);
    if (response.ok) return await response.json();
    throw new Error('Not Found');
  } catch (error) {
    console.log(error);
  }
};
