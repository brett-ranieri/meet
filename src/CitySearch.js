import React, { Component } from "react";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
	state = {
		query: "",
		suggestions: [],
		showSuggestions: undefined,
		infoText: "",
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		const suggestions = this.props.locations.filter((location) => {
			return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
		});
		if (suggestions.length === 0) {
			this.setState({ showSuggestions: false });
			this.setState({
				query: value,
				infoText: "No city matches your query. Please try another city.",
			});
		} else if (value.length === 0) {
			this.setState({
				query: "",
				showSuggestions: false,
			});
		} else {
			this.setState({ showSuggestions: true });
			return this.setState({
				query: value,
				suggestions,
				infoText: "",
			});
		}
	};

	handleItemClicked = (suggestion) => {
		this.setState({
			query: "",
			suggestions: [],
			showSuggestions: false,
		});
		this.props.updateEvents(suggestion);
	};

	render() {
		return (
			<div>
				<div className='CitySearch'>
					<label
						for='citySearch'
						className='city_label header'
					>
						Pick a City:
					</label>

					<input
						name='citySearch'
						type='text'
						placeholder='Search for a city'
						className='city header'
						value={this.state.query}
						onChange={this.handleInputChanged}
						onFocus={() => {
							this.setState({ showSuggestions: true });
						}}
					/>
					<InfoAlert text={this.state.infoText} />
					<ul
						className='suggestions content'
						style={this.state.showSuggestions ? {} : { display: "none" }}
					>
						{this.state.suggestions.map((suggestion) => (
							<li
								key={suggestion}
								onClick={() => this.handleItemClicked(suggestion)}
							>
								{suggestion}
							</li>
						))}

						<li
							key='all'
							onClick={() => this.handleItemClicked("all")}
						>
							<b>See all cities</b>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default CitySearch;
