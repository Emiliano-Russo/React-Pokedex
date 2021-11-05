export const pokemonTypeColors = {
	Fire: "rgba(255,151,65,255)	",
	Grass: "rgba(56,191,75,255)	",
	Ice: "rgb(204, 255, 255)",
	Poison: "rgb(170, 128, 255)",
	Water: "rgb(26, 140, 255)",
	Electric: "rgb(255, 255, 77)",
	Fighting: "rgb(255, 26, 26)",
	Fairy: "rgb(255, 179, 255)",
	Flying: "rgb(179, 204, 255)",
	Psychic: "rgb(255, 77, 77)",
	Bug: "rgba(130,187,10,255)",
	Rock: "rgb(213, 213, 139)",
	Ground: "rgb(255, 102, 26)",
	Steel: "rgb(99, 140, 182)",
	Dragon: "rgb(77, 77, 255)",
	Ghost: "rgb(0, 77, 153)",
	Normal: "rgb(158, 158, 158)",
	Dark: "rgb(77, 77, 77)",
};

export const buildGradient = (types) => {
	let gradient = "linear-gradient(to right";
	for (let i = 0; i < types.length; i++) {
		const type = types[i];
		gradient += "," + pokemonTypeColors[type];
	}
	gradient += ")";
	return gradient;
};

/*
backgroundImage: `linear-gradient(to right, ${pokemonTypeColors.Ice}, ${pokemonTypeColors.Fire}, ${pokemonTypeColors.Grass})`,
*/
