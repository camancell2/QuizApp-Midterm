import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';

const difficulties = ['easy', 'medium', 'hard'];
const topics = ['Linux', 'Bash', 'PHP', 'Docker', 'HTML', 'MySQL', 'WordPress', 'Laravel', 'Kubernetes', 'JavaScript', 'DevOps'];

function selectRandomQuiz() {
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    return { difficulty: randomDifficulty.toLocaleLowerCase(), topic: randomTopic.toLocaleLowerCase() };
}

const NavbarContainer = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#333',
  }));
  
const NavbarButton = styled(Button)(({ theme }) => ({
    color: 'white',
    textDecoration: 'none', // Remove text decoration
    '&:hover': {
    textDecoration: 'none', // Remove text decoration on hover
    },
}));

function Navbar() {
    const navigate = useNavigate();

    function handleRandomQuizClick() {
        const { difficulty, topic } = selectRandomQuiz();
        navigate(`/quiz/${topic}/${difficulty}`);
    }
    
    return (
        <NavbarContainer position='static'>
        <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                Quiz App
                </Typography>
            <Link to='/' style={{textDecoration: 'none'}}>
                <NavbarButton>Home</NavbarButton>
            </Link>
            <div onClick={handleRandomQuizClick}>
                <Link style={{textDecoration: 'none'}}>
                    <NavbarButton>Random Quiz</NavbarButton>
                </Link>
            </div>
        </Toolbar>
        </NavbarContainer>
    );
}

export default Navbar;