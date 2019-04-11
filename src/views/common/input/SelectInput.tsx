import React, { Component, ChangeEvent, FormEvent } from "react";
import "./SelectInput.css";

export default class SelectInput extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selectedOption: "0"
		};
	}

	handleSelectOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		this.setState({ selectedOption: event.target.value });
	};

	submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.props.onSubmit(this.state.selectedOption);
	};

	render() {
		const selectOptions = this.props.options.map(option => {
			return (
				<option value={option} key={option}>
					{option}
				</option>
			);
		});

		return (
			<div className="make-rtl mx-3 mb-3">
				<div className="row">
					<h4 className="px-3 py-2">{this.props.label}</h4>
					<form onSubmit={this.submit} className="select-input-form">
						<select onChange={this.handleSelectOptionChange} className="select-input-form-select">
							<option value="0">
								{this.props.defaultOption}
							</option>
							{selectOptions}
						</select>
						<input
							type="submit"
							className="form-input"
							value="افزودن مهارت"
						/>
					</form>
				</div>
			</div>
		);
	}
}

interface Props {
	options: string[];
	defaultOption: string;
	onSubmit(selectValue: string): void;
	label: string;
}
interface State {
	selectedOption: string;
}
