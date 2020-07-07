import React from "react";
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '3em 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: '3em',
        color: '#3f51b5'
    }
}));

export default () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography className={classes.title} component="h1">
                Liste de course
            </Typography>
        </Container>
    );
};
