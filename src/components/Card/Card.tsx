import { FC } from "react";
import { PokemonDetail } from "types/pokemon";

type Props = {
	pokemon: PokemonDetail;
};

export const Card: FC<Props> = ({ pokemon }) => {
	return (
		<div className="card">
			<div className="cardImg">
				<img src={pokemon.sprites.front_default} alt="" />
			</div>
			<h3 className="cardName">{pokemon.name}</h3>
			<div className="cardTypes">
				<p>タイプ</p>
				{pokemon.types.map((type) => {
					return (
						<div key={type.type.name}>
							<span className="typeName">{type.type.name}</span>
						</div>
					);
				})}
			</div>
			<div className="cardInfo">
				<div className="cardData">
					<p className="title">高さ：{pokemon.height}</p>
				</div>
				<div className="cardData">
					<p className="title">重さ：{pokemon.weight}</p>
				</div>
				<div className="cardData">
					<p className="title">
						アビリティ：{pokemon.abilities[0].ability.name}
					</p>
				</div>
			</div>
		</div>
	);
};
