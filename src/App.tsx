import { FC, useEffect, useState } from "react";
import { getAllPokemon } from "utils/pokemon";
import "App.css";

const App: FC = () => {
	const initialUrl = "https://pokeapi.co/api/v2/pokemon";
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPokemonData = async (): Promise<void> => {
			// すべてのポケモンデータを取得する
			const res = await getAllPokemon(initialUrl);
			console.log(res);
			setLoading(false);
		};
		void fetchPokemonData();
	}, []);

	return (
		<div className="App">
			{loading ? (
				<h1>ロード中・・・</h1>
			) : (
				<h1>ポケモンデータを取得しました。</h1>
			)}
		</div>
	);
};

export default App;
