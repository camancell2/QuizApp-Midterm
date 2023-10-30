import React from 'react';
import { Paper, Typography, Button, Box, styled } from '@mui/material';

const isDarkMode = false;

const resultStyles = {
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
function Result({ score, totalQuestions, onRestartQuiz, isDarkMode }) {
  return (
    <Paper elevation={3} style={resultStyles}>
      <Typography variant="h5">Quiz Result</Typography>
      <Typography variant="body1">
        You scored {score} out of {totalQuestions} questions.
      </Typography>
      <Button variant="contained" color="primary" onClick={onRestartQuiz} style={buttonStyles}>
        Restart Quiz
      </Button>
    </Paper>
  );
}

export default Result;
