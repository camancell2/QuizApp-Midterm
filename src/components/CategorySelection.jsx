import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import TypingAnimation from './TypingAnimation';

const categories = [
                      'Linux', 'Bash', 'PHP', 
                      'Docker', 'HTML', 'MySQL',
                      'WordPress', 'Laravel', 'Kubernetes',
                      'JavaScript', 'DevOps'
                    ];

const difficulties = [ 
                        { name: 'Easy', color: 'success' }, 
                        { name: 'Medium', color: 'warning' }, 
                        { name: 'Hard', color: 'error' }
                      ];

const isDarkMode = false;

const categoryStyles = {
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

function CategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const isSelectionComplete = selectedCategory && selectedDifficulty;

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}><TypingAnimation text="Welcome! Start by selecting a category" speed={75}/></h2>

      <Container>
        <Paper elevation={3} style={categoryStyles}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid container spacing={2} justifyContent="center">
              {categories.map((category) => (
                <Grid item key={category}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={buttonStyles}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>

      {selectedCategory && (
        <>
          <h2 style={{ textAlign: 'center' }}><TypingAnimation text="Now select a difficulty" speed={75}/></h2>

          <Container>
            <Paper elevation={3} style={categoryStyles}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid container spacing={2} justifyContent="center">
                  {difficulties.map((difficulty) => (
                    <Grid item key={difficulty.name}>
                      <Button
                        variant="contained"
                        color={difficulty.color}
                        size="large"
                        style={buttonStyles}
                        onClick={() => handleDifficultySelect(difficulty)}
                      >
                        {difficulty.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Container>
        </>
      )}

      {isSelectionComplete && (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <Link to={`/quiz/${selectedCategory.toLowerCase()}/${selectedDifficulty.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={buttonStyles}
            >
              Start!
            </Button>
          </Link>
        </Container>
      )}
    </div>
  );
}

export default CategorySelection;
