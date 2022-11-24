type PokeApiUrl = `https://pokeapi.co/api/v2/${string}`;
type AllPokemonData = {
	count: number;
	next: PokeApiUrl;
	previous: null;
	results: Array<{ name: string; url: PokeApiUrl }>;
};

export const getAllPokemon = async (
	url: PokeApiUrl
): Promise<AllPokemonData> => {
	const res = await fetch(url);

	return await ((await res.json()) as Promise<AllPokemonData>);
};
