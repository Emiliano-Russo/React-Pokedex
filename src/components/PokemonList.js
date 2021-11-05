import PokeCard from "./PokeCard";
import { useEffect, useState } from "react";
import { queryForPokecards } from "./../graphql/pokemonQuery";
import { TextField, CircularProgress } from "@mui/material";
import { client } from "../graphql/client";
import { motion } from "framer-motion";

function PokemonList(props) {
	const [pokemons, setPokemons] = useState(undefined);
	const [filterLetters, setfilterLetters] = useState("");

	useEffect(() => {
		client
			.query({
				query: queryForPokecards(10000),
			})
			.then((result) => {
				console.log(result);
				setPokemons(result.data.pokemons);
			});
	}, []);

	function changeHandler(e) {
		const inputText = e.target.value;
		console.log(inputText);
		setfilterLetters(inputText);
	}

	if (pokemons === undefined) return <CircularProgress style={{ marginTop: "5rem" }} />;

	return (
		<div>
			<motion.div animate={{ opacity: ["0%", "100%"] }} transition={{ duration: 2 }} style={{ width: "fit-content", margin: "0 auto" }}>
				<TextField label="Pokemon" onChange={changeHandler} />
			</motion.div>
			<motion.div
				animate={{ y: [1000, 0] }}
				transition={{ ease: "easeOut", duration: 2 }}
				style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", padding: "2rem", margin: "1rem" }}
			>
				{pokemons
					.filter((pokemon) => pokemon.name.toLowerCase().includes(filterLetters.toLowerCase()))
					.map((value) => {
						return <PokeCard key={value.id} toProfile={props.toProfile} id={value.id} name={value.name} img={value.image} types={value.types} />;
					})}
			</motion.div>
		</div>
	);
}

export default PokemonList;
