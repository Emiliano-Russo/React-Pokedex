import "./App.css";
import { Button, Card, createTheme, ThemeProvider } from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import { useState } from "react";

function App() {
	const [page, setPage] = useState(<PokemonList toProfile={changeToPokemonProfile} />);

	function changeToPokemonProfile(id) {
		console.log("Changing profile to: " + id);
		setPage(<PokemonProfile id={id} toList={changeToPokemonList} toProfile={changeToPokemonProfile} />);
	}

	function changeToPokemonList() {
		setPage(<PokemonList toProfile={changeToPokemonProfile} />);
	}

	return (
		<div className="App">
			<Card sx={{ background: "rgba(227,26,26,255)", marginBottom: "2rem" }}>
				<h1 style={{ color: "rgba(251,251,251,255)" }}>Pokedex</h1>
			</Card>
			{page}
		</div>
	);
}

export default App;
