import React, { useEffect } from "react";
import { Container, makeStyles, Checkbox, Typography, Divider } from "@material-ui/core";
import { useStateContext } from '../../../ContextProvider';
import cx from 'classnames';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '500px',
        padding: '2em',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    task: {
        margin: '.5em 0',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '1.5em',
        backgroundColor: "rgba(0,0,0,.05)",
        borderRadius: '5px',
        transition: '.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "rgba(0,0,0,.09)"
        }
    },
    name: {

    },
    linethrough: {
        textDecoration: 'line-through',
    },
    taskchecked: {
        backgroundColor: "rgba(0,0,0,.09)"
    }
}));

export default ({ tasks }) => {
    const classes = useStyles();
    const [state, setState] = useStateContext();

    const handleClick = (taskId) => () => {
        const newTasksArray = state.tasks.map((task) => {
            if (task._id === taskId) {
                task.isChecked = !task.isChecked;
            }
            return task;
        });
        setState({ ...state, tasks: newTasksArray })
    };

    useEffect(() => {
        if (state.tasks) {
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        }
    }, [state])
    return (
        <Container className={classes.root}>
            {
                state.tasks && state.tasks.map((task) =>
                    <Container onClick={handleClick(task._id)} className={cx(classes.task, { [classes.taskchecked]: task.isChecked })} key={task._id}>
                        <Checkbox checked={task.isChecked} value={task.isChecked} />
                        <Typography className={cx(classes.name, { [classes.linethrough]: task.isChecked })}> {task.name} </Typography>
                    </Container>
                )
            }
            {
                !state.tasks && <p>Vous n'avez aucune tâche</p>
            }
        </Container>
    )
};
