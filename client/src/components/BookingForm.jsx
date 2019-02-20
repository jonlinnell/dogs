import React, { Component } from 'react';
import styled from 'styled-components';

import Input from './Input';
import InputLabel from './InputLabel';

const Form = styled.form`
  width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default class BookingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { slot } = this.props;

    console.log(
      JSON.stringify(Object.assign({}, this.state, { slot }), null, 2)
    );
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, email } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <InputLabel htmlFor="name">
          Name
          <Input name="name" value={name} onChange={this.handleChange} />
        </InputLabel>

        <InputLabel htmlFor="email">
          University Email
          <Input
            width="wide"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </InputLabel>
        <Input type="submit" value="Confirm booking" />
      </Form>
    );
  }
}
