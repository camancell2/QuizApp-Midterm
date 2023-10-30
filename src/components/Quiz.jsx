import React, { useState, useEffect } from 'react';

import { Container, Paper, Typography, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import Result from './Result';

const apiKey = '<API_KEY_HERE>';

const isDarkMode = false;

const quizStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '12px',
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: '20px'
};

const buttonStyles = {
    display: 'block',
    width: '100%',
    margin: '10px 0',
    fontSize: '1rem',
}

function Quiz() {
    const navigate = useNavigate();

    const { category, difficulty } = useParams();

    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answered, setAnswered] = useState(false);

    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`https://quizapi.io/api/v1/questions?category=${category}&difficulty=${difficulty}&apiKey=${apiKey}`)
        .then((response) => {
            setQuizData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching quiz questions:', error);
            handleSnackbarOpen('Failed to load the quiz. Please try again later!')

            setTimeout(() => {
                navigate('/');
            }, 5000);
        });
    }, [category, difficulty]);

    const handleSnackbarOpen = (message) => {
        setErrorMessage(message);
        setOpen(true);
    };

    const handleAnswerClick = (selectedAnswer) => {
        if (!answered) {
        if (quizData[currentQuestion].correct_answers[selectedAnswer + '_correct'] === 'true') {
            setScore(score + 1);
        }
        setAnswered(true);
    
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswered(false);
        } else {
            setShowResult(true);
        }
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setAnswered(false);
        setShowResult(false);
    };

    return (
        <>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert
            style={{
                position: 'fixed',
                top: '140px',
                left: '0',
                right: '0',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                zIndex: '9999'
            }}
            severity="error"
            onClose={() => setOpen(false)}
            >
                {errorMessage}
            </Alert>
        </Snackbar>

        {showResult ? (
            <Result
            score={score}
            totalQuestions={quizData.length}
            onRestartQuiz={handleRestartQuiz}
            />
        ) : (
            <Container style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={quizStyles}>
                {quizData.length > 0 && currentQuestion < quizData.length && (
                <div>
                    <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Question {currentQuestion + 1} of {quizData.length}
                    </Typography>
                    <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    {quizData[currentQuestion].question}
                    </Typography>
                    {quizData[currentQuestion].answers &&
                    Object.keys(quizData[currentQuestion].answers)
                        .filter((answerKey) => quizData[currentQuestion].answers[answerKey] !== null)
                        .map((answerKey) => (
                        <Button
                            key={answerKey}
                            variant="contained"
                            color="primary"
                            style={buttonStyles}
                            onClick={() => handleAnswerClick(answerKey)}
                        >
                            {quizData[currentQuestion].answers[answerKey]}
                        </Button>
                        ))}
                </div>
                )}
            </Paper>
            </Container>
        )}
        </>
    );
}

export default Quiz;
