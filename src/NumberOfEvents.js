import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
	state = {
		query: 20,
		errorText: "",
	};

	handleNumberChanged = (event) => {
		let value = event.target.value;
		if (value > 20 || value < 1) {
			this.setState({
				query: value,
				errorText: "Must pick a number between 1 and 20",
			});
		} else {
			this.setState({
				query: value,
				errorText: "",
			});
			this.props.updateEvents(null, value);
		}
	};

	render() {
		return (
			<div className='NumberOfEvents header'>
				<label
					for='eventNumber'
					className='event-label'
				>
					Pick a Number:
				</label>
				<select
					name='eventNumber'
					className='number-of-events header dropdown'
					type='number'
					value={this.state.query}
					onChange={this.handleNumberChanged}
				>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
					<option>9</option>
					<option>10</option>
					<option>11</option>
					<option>12</option>
					<option>13</option>
					<option>14</option>
					<option>15</option>
					<option>16</option>
					<option>17</option>
					<option>18</option>
					<option>19</option>
					<option>20</option>
				</select>
				<ErrorAlert text={this.state.errorText} />
			</div>
		);
	}
}

export default NumberOfEvents;
