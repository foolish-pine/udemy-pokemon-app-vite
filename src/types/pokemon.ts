export type PokeApiUrl = `https://pokeapi.co/api/v2/${string}`;
export type PokemonDetail = {
	name: string;
	types: Array<{
		type: {
			name: string;
		};
	}>;
	sprites: { front_default: string };
	height: number;
	weight: number;
	abilities: Array<{
		ability: {
			name: string;
		};
	}>;
};
