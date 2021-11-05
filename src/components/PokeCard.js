import { Button, Card, CardContent, CardMedia, Typography, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { logos } from "./../Pokemon_Inventory/TypesLogos";
import "./PokeCard.css";
import { motion } from "framer-motion";

/*
props:
pokemon img
pokemon name
pokemon types
*/

function PokeCard(props) {
	return (
		<motion.div whileHover={{ scale: [1, 1.3] }}>
			<Card raised={false} sx={{ margin: "1rem", width: "250px", paddingTop: "1rem" }}>
				<img id="PokemonImg" onClick={() => props.toProfile(props.id)} src={props.img}></img>
				<CardContent sx={{ background: "linear-gradient(0deg, rgba(255,14,14,1) 0%, rgba(255,255,255,1) 100%);" }}>
					<h4>{props.name}</h4>
					{props.types.map((t) => (
						<Tooltip title={t}>
							<img src={logos[t.toLowerCase()]} style={{ width: "40px" }}></img>
						</Tooltip>
					))}
				</CardContent>
			</Card>
		</motion.div>
	);
}

export default PokeCard;
