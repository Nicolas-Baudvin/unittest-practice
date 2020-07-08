import React, { useState, useEffect } from "react";
import { Container, makeStyles, Typography, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import AddListInput from './AddTaskInput'
import Tasks from './Tasks';
import { useStateContext } from "../../ContextProvider";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: '300px'
    },
    title: {
        margin: '1em',
        '& > span': {
            fontWeight: 'bold',
        }
    },
    input: {
        width: '100%'
    },
    icon: {
        color: (props) => props.isFocus ? "#3f51b5" : "#aaa"
    },
    divider: {
        margin: '1em 0'
    }
}));

export default () => {
    const [isFocus, setFocus] = useState(false);
    const history = useHistory();
    const classes = useStyles({ isFocus });
    const [state] = useStateContext();

    useEffect(() => {
        if (!state.username) {
            history.push("/");
        }
    }, []);

    return (
        <Container className={classes.root}>
            <Typography className={classes.title}>Bonjour <span>{state.username}</span></Typography>
            <AddListInput classes={classes} isFocus={isFocus} setFocus={setFocus} />
            <Divider variant="middle" className={classes.divider} />
            {
                state.tasks && <Tasks tasks={state.tasks} />
            }
        </Container>
    );
};
