import { PokeApiUrl, PokemonDetail } from "types/pokemon";

export const getAllPokemon = async (
	url: PokeApiUrl
): Promise<{
	results: Array<{ name: string; url: PokeApiUrl }>;
}> => {
	const res = await fetch(url);

	return await ((await res.json()) as Promise<{
		results: Array<{ name: string; url: PokeApiUrl }>;
	}>);
};

export const getPokemon = async (url: PokeApiUrl): Promise<PokemonDetail> => {
	const res = await fetch(url);

	return await ((await res.json()) as Promise<PokemonDetail>);
};
