import "./App.css";
import { Button, Card, createTheme, ThemeProvider } from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import { useState } from "react";
import GuessTheName from "./components/TheGame/GuessTheName";

function App() {
	const [page, setPage] = useState(<PokemonList toProfile={changeToPokemonProfile} />);
	const [onGame, setOnGame] = useState(false);

	function changeToGameGame() {
		setOnGame(true);
		setPage(<GuessTheName onFinishGame={changeToPokemonList} />);
	}

	function changeToPokemonProfile(id) {
		console.log("Changing profile to: " + id);
		setPage(<PokemonProfile id={id} toList={changeToPokemonList} toProfile={changeToPokemonProfile} />);
	}

	function changeToPokemonList() {
		setOnGame(false);
		setPage(<PokemonList toProfile={changeToPokemonProfile} toGame={changeToGameGame} />);
	}

	return (
		<div className="App">
			<Card sx={{ background: "rgba(227,26,26,255)", marginBottom: "2rem", position: "relative" }}>
				<h1 style={{ color: "rgba(251,251,251,255)" }}>Pokedex</h1>
				{onGame ? null : (
					<Button variant="text" sx={{ color: "white" }} onClick={changeToGameGame}>
						Play PokeGuess
					</Button>
				)}
			</Card>
			{page}
		</div>
	);
}

export default App;
