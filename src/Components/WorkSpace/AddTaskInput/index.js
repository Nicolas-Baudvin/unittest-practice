import React, { useState, useEffect } from "react";
import { Paper, TextField, InputAdornment } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useStateContext } from '../../../ContextProvider';

export default ({ classes, setFocus }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [state, setState] = useStateContext();


    const handleChange = (e) => setValue(e.target.value);

    const onFocus = () => setFocus(true);

    const onBlur = () => setFocus(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value && value.length <= 30) {
            setError('');
            setState({
                ...state, tasks: state.tasks ?
                    [...state.tasks, { name: value, isChecked: false, _id: state.tasks.length }] :
                    [{ name: value, isChecked: false, _id: 0 }]
            });
            setValue('');
        }
        else {
            setError("Le nom doit faire entre 1 et 30 caractères inclus");
        }
    };

    useEffect(() => {
        if (state.tasks) {
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        }
    }, [state])
    return (
        <Paper component="form" onSubmit={handleSubmit} className={classes.paper}>
            <TextField
                variant="outlined"
                label="Votre tâche"
                value={value}
                onChange={handleChange}
                className={classes.input}
                onFocus={onFocus}
                onBlur={onBlur}
                error={Boolean(error)}
                helperText={error}
                InputProps={{
                    endAdornment: (<InputAdornment> <AddIcon className={classes.icon} /> </InputAdornment>)
                }}
            />
        </Paper>
    );
};
