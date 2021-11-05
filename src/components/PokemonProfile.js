import { queryForPokeProfile } from "../graphql/pokemonQuery";
import { client } from "../graphql/client";
import React, { useEffect, useState } from "react";
import { CircularProgress, Button, Tooltip, ButtonGroup, styled, colors } from "@mui/material";
import { logos } from "./../Pokemon_Inventory/TypesLogos";
import "./PokemonProfile.css";
import { ArrowBack } from "@mui/icons-material";
/*
image, name, weight, height, maxHp, types, resistant, weakness , evolutions , Attacks [Normal, Special]
*/

function PokemonProfile(props) {
	const [profileInfo, setprofileInfo] = useState(undefined);

	function average(a, b) {
		a = parseFloat(a);
		b = parseFloat(b);
		return ((a + b) / 2).toFixed(2);
	}

	useEffect(() => {
		client
			.query({
				query: queryForPokeProfile(props.id),
			})
			.then((result) => {
				setprofileInfo(result.data.pokemon);
			})
			.catch((err) => {
				console.log(JSON.stringify(err, null, 2));
			});
	}, [props.id]);

	const ColorButton = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(colors.red[400]),
		backgroundColor: colors.red[400],
		"&:hover": {
			backgroundColor: colors.blue[700],
		},
	}));

	if (profileInfo === undefined) return <CircularProgress />;

	return (
		<React.Fragment>
			<Button variant="contained" onClick={() => props.toList()} sx={{ marginBottom: "1rem", background: "red" }}>
				<ArrowBack></ArrowBack>
			</Button>
			<div id="PokeProfile">
				<div>
					<h1>{profileInfo.name}</h1>
					<img id="PokemonPic" src={profileInfo.image} alt="pokemon"></img>
				</div>
				<div id="Description">
					<div id="Logos">
						<p>Types</p>
						{profileInfo.types.map((t) => (
							<Tooltip title={t}>
								<img src={logos[t.toLowerCase()]} style={{ width: "40px" }} alt="typeLogo"></img>
							</Tooltip>
						))}
						<p>Resistant</p>
						{profileInfo.resistant.map((t) => (
							<Tooltip title={t}>
								<img src={logos[t.toLowerCase()]} style={{ width: "40px" }} alt="typeLogo"></img>
							</Tooltip>
						))}
						<p>Weaknesses</p>
						{profileInfo.weaknesses.map((t) => (
							<Tooltip title={t}>
								<img src={logos[t.toLowerCase()]} style={{ width: "40px" }} alt="typeLogo"></img>
							</Tooltip>
						))}
					</div>
					<div id="Info">
						<div>
							<h4>Points</h4>
							<p>Avg Weight: {average(profileInfo.weight.minimum, profileInfo.weight.maximum)}kg</p>
							<p>Avg Height: {average(profileInfo.height.minimum, profileInfo.height.maximum)}m</p>
							<p>Max Health: {profileInfo.maxHP}hp</p>
						</div>
						{profileInfo.evolutions === null ? null : (
							<div>
								<h4>Evolutions</h4>
								<ButtonGroup variant="text" aria-label="text button group">
									{profileInfo.evolutions.map((ev) => (
										<ColorButton onClick={() => props.toProfile(ev.id)}>{ev.name}</ColorButton>
									))}
								</ButtonGroup>
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default PokemonProfile;
