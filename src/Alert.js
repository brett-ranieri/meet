import React, { Component } from "react";

class Alert extends Component {
	constructor(props) {
		super(props);
		this.color = null;
	}

	getStyle = () => {
		return {
			color: this.color,
		};
	};

	render() {
		return (
			<div className='Alert content'>
				<p style={this.getStyle()}>{this.props.text}</p>
			</div>
		);
	}
}

class InfoAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "white";
	}
}

class ErrorAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "yellow";
	}
}

class WarningAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "yellow";
	}
}

export { InfoAlert };
export { ErrorAlert };
export { WarningAlert };
