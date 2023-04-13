import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
	const [eventGenreData, setEventGenreData] = useState([]);

	useEffect(() => {
		const getData = () => {
			const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
			const data = genres.map((genre) => {
				const value = events.filter((event) => event.summary.includes(genre)).length;
				return { name: genre, value };
			});
			console.log("genre data ", data);
			return data.filter((entry) => entry.value > 0);
		};

		setEventGenreData(() => getData());
	}, [events]);

	// getData = (events) => {
	// 	const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
	// 	const genreCount = events.filter((event) => event.summary.includes(genres).length);
	// 	console.log(genreCount);
	// };

	return (
		<div>
			<h4>Events by Genre</h4>
			<ResponsiveContainer height={250}>
				<PieChart>
					<Pie
						data={eventGenreData}
						cx='50%'
						cy='50%'
						labelLine={false}
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
						label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
					>
						{eventGenreData.map((entry, index) => (
							<Cell key={`cell-${index}`} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default EventGenre;
