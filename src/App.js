import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background-color: #E94975;
`;

const Title = styled.h1`
  color: #FFF;
  font: 700 3rem 'Open Sans', sans-serif;
`;

const QuizContainer = styled.div`
  position: relative;
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  border-left: 8px solid #E28CE5;

  background: #FFF;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  margin: 1rem auto 0;
`;

const QuestionLabel = styled.h2`
  color: #505050;
  font: 400 1.5rem 'Open Sans', sans-serif;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  margin: .25rem 0;
`;

const OptionText = styled.span``;

const OptionCheck = styled.div`
  width: 15px;
  height: 15px;
  margin-right: .5rem;

  cursor: pointer;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: ${props => props.selected ? 'blue' : '#FFF'}
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 20%;
  height: 40px;

  outline: none;
  border: none;
  border-radius: 4px;
  color: #FFF;
  font: 400 1rem 'Open Sans', sans-serif;
  cursor: pointer;
  transform: translateX(-50%);
  background-color: #E94975;
`;

const Error = styled.span`
  color: #E28CE5;
  font: 700 2rem 'Open Sans', sans-serif;
`;

const Score = styled.span`
  color: #505050;
  font: 700 2rem 'Open Sans', sans-serif;
`;

const Timer = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  color: red;
  font: 700 2rem 'Open Sans', sans-serif;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          question: 'Qual a capital do Brasil?',
          options: [
            {
              label: 'Brasília',
              isCorrect: true,
            },
            {
              label: 'Ceará',
              isCorrect: false,
            },
            {
              label: 'Rio Grande do Sul',
              isCorrect: false,
            }
          ]
        },
        {
          question: 'Quantas regiões existem no Brasil?',
          options: [
            {
              label: '1 região',
              isCorrect: false,
            },
            {
              label: '2 regiões',
              isCorrect: false,
            },
            {
              label: '5 regiões',
              isCorrect: true,
            }
          ]
        },
        {
          question: 'Quantos estados tem a região Sul do Brasil?',
          options: [
            {
              label: '1 estado',
              isCorrect: false,
            },
            {
              label: '2 estados',
              isCorrect: false,
            },
            {
              label: '3 estados',
              isCorrect: true,
            }
          ]
        }
      ],
      currentQuestion: 1,
      currentAnswer: {},
      error: null,
      points: 0,
      timer: 10,
    };
  }

  componentDidMount() {
    this.fireTimer();
  }

  fireTimer = () => {
    this.counter = setInterval(() => {
      if (this.state.timer === 0) {
        this.showNextQuestion();
      } else {
        this.setState({
          timer: this.state.timer - 1,
        });
      }
    }, 1000)
  }

  showNextQuestion = () => {
    const { currentAnswer, currentQuestion, points, questions } = this.state;

    clearInterval(this.counter);
    this.fireTimer();

    // Mostrar próxima pergunta e verifcar resposta
    this.setState({
      currentQuestion: currentQuestion + 1,
      points: currentAnswer && currentAnswer.isCorrect ? points + 1 : points,
      timer: 10,
    }, () => {
      // Se for a ultima questao, finaliza o quiz
      const isFinished = questions.length === currentQuestion;

      if (isFinished) {
        this.setState({
          timer: 0
        });

        clearInterval(this.counter);

        return;
      }
    });
  }

  renderOptions = (options) => {
    const { currentAnswer } = this.state;

    return options.map((option, index) => {
      return (
        <Option
          key={index}
        >
          <OptionCheck
            onClick={() => {
              this.setState({
                currentAnswer: option,
                error: null,
              })
            }}
            selected={currentAnswer.label === option.label}
          />
          <OptionText>
            {option.label}
          </OptionText>
        </Option>
      )
    })
  }

  renderQuestions = () => {
    const { questions, currentQuestion } = this.state;

    return questions.slice(currentQuestion - 1, currentQuestion).map((item, index) => {
      return (
        <QuestionContainer
          key={index}
        >
          <QuestionLabel>
            {item.question}
          </QuestionLabel>
          {this.renderOptions(item.options)}
        </QuestionContainer>
      )
    })
  }

  renderScore = () => (
    <Score>
      {this.state.points}
    </Score>
  )

  render() {
    const { error, questions, currentQuestion } = this.state;

    const isFinished = questions.length === currentQuestion - 1;

    return (
      <Container>
        <Title>
          My Quiz!!!
        </Title>
        <QuizContainer>
          {this.state.timer > 0 && (
            <Timer>
              {this.state.timer}
            </Timer>
          )}
          {!isFinished ? this.renderQuestions() : this.renderScore()}
          {!isFinished && (
            <SubmitButton
              onClick={this.showNextQuestion}
            >
              Próxima
            </SubmitButton>
          )}
        </QuizContainer>
        {error && (
          <Error>
            {error}
          </Error>
        )}
      </Container>
    );
  }
}

export default App;
