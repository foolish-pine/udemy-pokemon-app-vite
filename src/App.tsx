import { FC, useEffect, useState } from "react";
import { AllPokemonData, PokeApiUrl, PokemonDetail } from "types/pokemon";
import { getAllPokemon, getPokemon } from "utils/pokemon";
import { Card } from "components/Card/Card";
import { Navbar } from "components/Navbar/Navbar";

import "App.css";

export const App: FC = () => {
	const initialUrl = "https://pokeapi.co/api/v2/pokemon";
	const [loading, setLoading] = useState(true);
	const [nextPageUrl, setNextPageUrl] = useState<null | PokeApiUrl>(null);
	const [prevPageUrl, setPrevPageUrl] = useState<null | PokeApiUrl>(null);
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
			const data = (await getAllPokemon(initialUrl)) as AllPokemonData;
			setNextPageUrl(data.next);
			setPrevPageUrl(data.previous);

			// 各ポケモンの詳細なデータを取得
			await loadPokemon(data.results);

			setLoading(false);
		};
		void fetchPokemonData();
	}, []);

	const handlePrevPage = async () => {
		if (prevPageUrl === null) return;

		setLoading(true);

		const data = (await getAllPokemon(prevPageUrl)) as AllPokemonData;
		setNextPageUrl(data.next);
		setPrevPageUrl(data.previous);

		// 各ポケモンの詳細なデータを取得
		await loadPokemon(data.results);

		setLoading(false);
	};

	const handleNextPage = async () => {
		if (nextPageUrl === null) return;

		setLoading(true);

		const data = (await getAllPokemon(nextPageUrl)) as AllPokemonData;
		setNextPageUrl(data.next);
		setPrevPageUrl(data.previous);

		await loadPokemon(data.results);

		setLoading(false);
	};

	return (
		<>
			<Navbar />
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
				<div className="btn">
					<button onClick={handlePrevPage}>前へ</button>
					<button onClick={handleNextPage}>次へ</button>
				</div>
			</div>
		</>
	);
};
