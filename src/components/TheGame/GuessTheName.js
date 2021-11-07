import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { client } from "../../graphql/client";
import { queryForGuessGame } from "../../graphql/pokemonQuery";
import { CircularProgress, Input, Button, Alert } from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import "./GuessTheGame.css";
import { Fragment } from "react";

function GuessTheName(props) {
	const [pokemons, setPokemons] = useState(undefined);
	const [counter, setCounter] = useState(0);
	const [lettersTyped, setLettersTyped] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [onGame, setOnGame] = useState(true);
	const inputEl = useRef(null);

	useEffect(() => {
		client
			.query({
				query: queryForGuessGame(10000),
			})
			.then((result) => {
				setPokemons(result.data.pokemons);
			});
	}, []);

	function typeHandler(e) {
		const length = e.target.value?.length;
		setLettersTyped(length);
	}

	function finishGame() {
		console.log("game finished!");
		setOnGame(false);
	}

	function onGuessHandler() {
		const value = inputEl.current.children[0].value.toLowerCase();
		console.log(value);
		if (pokemons[counter].name.toLowerCase() == value) {
			//Guessed!
			setCounter((prev) => {
				if (prev >= pokemons.length - 1) finishGame();
				return prev + 1;
			});
			inputEl.current.children[0].value = "";
			setLettersTyped(0);
		} else {
			//Not Guessed!
			setAnimation((prev) => !prev);
		}
	}

	if (pokemons === undefined) return <CircularProgress />;

	const variants = {
		rotate: { x: [0, -14, 0], transition: { duration: 0.5 } },
		// You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
		stop: { x: [0, -15, 0], transition: { duration: 0.5 } },
	};

	return (
		<div id="Game">
			<Button variant="outlined" onClick={props.onFinishGame} id="BtnBack">
				<ArrowBack />
			</Button>
			{!onGame ? (
				<h1 style={{ margin: " 100px auto" }}>Game Finished!</h1>
			) : (
				<motion.div id="GuessCard">
					<img src={pokemons[counter].image} alt="pokeimage"></img>
					<p>{pokemons[counter].name.length} letters</p>
					<Input ref={inputEl} onChange={typeHandler} />
					<p>{lettersTyped}</p>
					<motion.div variants={variants} animate={animation ? "rotate" : "stop"}>
						<Button variant="contained" onClick={onGuessHandler}>
							<Send />
						</Button>
					</motion.div>
					<h4>Combo: {counter}</h4>
				</motion.div>
			)}
		</div>
	);
}

export default GuessTheName;
