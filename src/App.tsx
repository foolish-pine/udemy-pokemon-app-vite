import { FC, useEffect, useState } from "react";
import { PokeApiUrl, PokemonDetail } from "types/pokemon";
import { getAllPokemon, getPokemon } from "utils/pokemon";
import "App.css";
import { Card } from "components/Card/Card";

export const App: FC = () => {
	const initialUrl = "https://pokeapi.co/api/v2/pokemon";
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState<[] | PokemonDetail[]>([]);

	const loadPokemon = async (
		data: Array<{ name: string; url: PokeApiUrl }>
	) => {
		const _pokemonData = await Promise.all(
			data.map(async (pokemon) => await getPokemon(pokemon.url))
		);
		setPokemonData(_pokemonData);
	};

	useEffect(() => {
		const fetchPokemonData = async (): Promise<void> => {
			// すべてのポケモンデータを取得する
			const res = (await getAllPokemon(initialUrl)) as {
				results: Array<{ name: string; url: PokeApiUrl }>;
			};
			// 各ポケモンの詳細なデータを取得
			await loadPokemon(res.results);
			setLoading(false);
		};
		void fetchPokemonData();
	}, []);

	return (
		<div className="App">
			{loading ? (
				<h1>ロード中・・・</h1>
			) : (
				<div className="pokemonCardContainer">
					{pokemonData.map((pokemon) => {
						return <Card key={pokemon.name} pokemon={pokemon} />;
					})}
				</div>
			)}
		</div>
	);
};
