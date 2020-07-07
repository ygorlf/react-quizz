// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 25%;
  height: 35px;
  margin: 1rem;
`;

const Text = styled.text`
  color: #505050;
  font-size: 3rem;
`;

const Button = styled.button`
  display: block;
`;

const Item = styled.span`
  display: block;
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      list: [],
    };
  }

  handleChange = (ev) => {
    this.setState({
      todo: ev.target.value,
    });
  }

  handleButton = () => {
    this.setState({
      list: this.state.list.concat({
        label: this.state.todo,
        color: this.state.list.length === 1 ? '' : 'blue',
      }),
      todo: '',
    });
  }

  renderList = () => {
    return this.state.list.map((item, index) => {
      return (
        <Item key={index} style={{
          color: item.color || 'red',
        }}>
          {item.label}
        </Item>
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input value={this.state.todo} type="text" onChange={this.handleChange} />
        </form>
        <Button onClick={this.handleButton}>
          Add
        </Button>
        {this.renderList()}
      </div>
    );
  }
}

export default Form;
