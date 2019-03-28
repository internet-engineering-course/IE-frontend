import React, { Component } from 'react';
import './user.scss';

export default class User extends Component<Props, State> {
  render() {
    return (
      <div>
        {this.props.children}

        <form onSubmit={e => this.submitForm(e)}>
          <input type="text" onChange={e => this.handleInputChange(e)} placeholder="input" />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
  submitForm(e: React.FormEvent<HTMLFormElement>): void {
    const { inputValue } = this.state;

    e.preventDefault();
  }
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: e.target.value });
  }
}

interface Props {
  pnClick(inputValue: string): void;
}
interface State {
  inputValue: string;
}
