// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: seagreen;
`;

const Title = styled.h1`
  margin: 0;
  color: #FFF;
  font: 700 2rem 'Open Sans', sans-serif;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

const Button = styled.button`
  width: 20%;
  height: 40px;
  border: none;

  outline: none;
  color: #FFF;
  cursor: pointer;
  font: 400 1rem 'Open Sans', sans-serif;
  background: ${props => props.disabled ? 'rgba(165, 42, 42, 0.7)' : 'brown'};
`;

const CardsContainer = styled.div`
  display: flex;
  justify-cotent: center;
  align-items: center;
  min-height: 200px;
`;

const Card = styled.div`
  position: relative;
  width: 120px;
  height: 200px;
  margin: 0 5px;
  border-radius: 8px;
  box-shadow: 2px 2px 3px rgba(0,0,0, .5);

  background: #FFF;
`;

const CardTopValue = styled.span`
  position: absolute;
  top: 1%;
  left: 2.5%;

  color: ${props => props.color};
  font: 700 3rem 'Open Sans', sans-serif; 
`;

const CardBottomValue = styled.span`
  position: absolute;
  bottom: 1%;
  right: 2.5%;

  color: ${props => props.color};
  font: 700 3rem 'Open Sans', sans-serif;
  transform: rotate(180deg);
`;

const CardSuit = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;

  color: ${props => props.color};
  font: 700 2rem 'Open Sans', sans-serif;
  transform: translate(-50%, -50%);
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.span`
  display: inline-block;
  margin: 0 6px;
  color: #FFF;
  font: 700 1.25rem 'Open Sans', sans-serif;
`;

class BlackJack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'J', 'K'],
      suits: ['clubs', 'hearts', 'spades', 'diamonds'],
      deck: [],
      userCards: [],
      points: 0,
      gameOver: false,
      stand: false,
      winner: false,
    };
  }

  componentDidMount() {
    this.makeDeck();
  }

  transformCard = (card) => {
    switch(card) {
      case 'A':
        return 1;
      case 'Q':
      case 'J':
      case 'K':
        return 10
      default:
        return Number(card);
    }
  }

  getSuitCode = (suit) => {
    switch(suit) {
      case 'clubs':
        return '♣';
      case 'hearts':
        return '♥';
      case 'spades':
        return '♠';
      case 'diamonds':
        return '♦';
      default:
        return '';
    }
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray = (array) => {
    const arr = Array.from(array);

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  makeDeck = () => {
    const { cards, suits } = this.state;

    const deck = [];

    suits.map((suit) => {
      cards.map((card) => {
        deck.push({
          label: card,
          suit,
          value: this.transformCard(card),
          name: `${card} of ${suit}`
        });
      });
    });

    const shuffledCards = this.shuffleArray(deck);

    this.setState({
      deck: shuffledCards,
    });
  }

  getCard = () => {
    const { deck } = this.state;

    // Index aleatório de 0 até o numero de cartas
    const index = Math.floor(Math.random() * deck.length);

    // Pega a carta aleatória do deck
    const card = deck[index];

    // Remove a carta selecionada do deck
    const newDeck = deck.filter(item => item.name !== card.name);

    // Todas as cartas do jogador
    const userCards = this.state.userCards.concat(card);

    const points = userCards.reduce((acumulador, card) => {
      return acumulador + card.value;
    }, 0);

    if (points > 21) {
      // encerra o game
      this.setState({
        gameOver: true,
        userCards,
      });
    } else {
      // continua o game
      this.setState({
        deck: newDeck,
        userCards,
        points,
        winner: points === 21
      });
    }
  }

  restartGame = () => {
    this.setState({
      deck: [],
      userCards: [],
      points: 0,
      gameOver: false,
      stand: false,
      winner: false,
    });

    this.makeDeck();
  }

  standGame = () => {
    this.setState({
      stand: true,
    });
  }

  renderUserCards = () => {
    const { userCards } = this.state;

    return userCards.map((card) => {

      const color = (card.suit === 'clubs') || (card.suit === 'spades') ? 'black' : 'red'; 

      return (
      <Card>
        <CardTopValue color={color}>{card.label}</CardTopValue>
        <CardSuit color={color}>
          {this.getSuitCode(card.suit)}
        </CardSuit>
        <CardBottomValue color={color}>{card.label}</CardBottomValue>
      </Card>
      );
    });
  }

  renderUserInfo = () => {
    const { points, gameOver, stand, winner } = this.state;

    if (winner) {
      return (
        <UserInfo>
          <Message>
            Congratulations!!!
          </Message>
        </UserInfo>
      )
    }

    if (stand) {
      return (
        <UserInfo>
          <Message>
            You stopped with {points} points!
          </Message>
        </UserInfo>
      )
    }

    if (gameOver) {
      return (
        <UserInfo>
          <Message>
            You lose!
          </Message>
        </UserInfo>
      )
    }

    return (
      <UserInfo>
        <Message>
          Points:
        </Message>
        <Message>
          {points}
        </Message>
      </UserInfo>
    )
  }

  render() {
    const { gameOver, stand, winner } = this.state;

    return (
      <Table>
        <Title>BlackJack!!!</Title>
        <CardsContainer>
          {this.renderUserCards()}
        </CardsContainer>
        {this.renderUserInfo()}
        <ButtonsContainer>
          <Button onClick={this.getCard} disabled={gameOver || stand || winner}>
            Get Card
          </Button>
          <Button onClick={this.standGame} disabled={gameOver || stand || winner}>
            Stand
          </Button>
          <Button onClick={this.restartGame}>
            Restart
          </Button>
        </ButtonsContainer>
      </Table>
    )
  }
}

export default BlackJack;