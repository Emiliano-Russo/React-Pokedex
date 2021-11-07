import { gql } from "@apollo/client";

export const queryForPokecards = (amountPokemons) => gql`
	{
		pokemons(first: ${amountPokemons}) {
			id
			name
			image
			types
		}
	}
`;

export const queryForPokeProfile = (id) => gql`
{
	pokemon(id: "${id}") {
		name
		weight{
			minimum
			maximum
		}
		height{
			minimum
			maximum
		  }
		types
		resistant
		weaknesses
		maxHP
		image
		evolutions{
			id
			name
		  }
	}
}
`;

export const queryForGuessGame = (amountPokemons) => gql`
{
	pokemons(first: ${amountPokemons}) {
		name
		image
	}
}
`;
