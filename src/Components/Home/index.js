import React, { useState, useEffect } from "react";
import { Container, TextField, makeStyles, InputAdornment, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../../ContextProvider";


import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '3em 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {

    },
    icon: {
        color: (props) => props.isFocus ? "#3f51b5" : "rgba(0,0,0,.50)"
    },
    submit: {
        margin: theme.spacing(4),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export default () => {
    const [value, setValue] = useState('');
    const [isFocus, setFocus] = useState(false);
    const [error, setError] = useState('');
    const classes = useStyles({ isFocus });
    const history = useHistory();
    const handleChange = (e) => setValue(e.target.value);
    const [state, setState] = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value && value.length <= 30) {
            setError('');
            localStorage.setItem('udta', value);
            setState({ ...state, username: value });
            history.push("/liste");
        }
        else {
            setError('Le pseudo doit faire entre 1 et 30 caractères');
        }
    }

    useEffect(() => {
        if (state.username) {
            history.push("/liste")
        }
    }, [])

    return (
        <Container className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.input}
                    onChange={handleChange}
                    value={value}
                    label="Votre pseudo"
                    variant="outlined"
                    onFocus={(e) => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    error={Boolean(error)}
                    helperText={error}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <PersonIcon className={classes.icon} />
                            </InputAdornment>
                        )
                    }}
                />
                <Button color="primary" className={classes.submit} type="submit" variant="contained">
                    Continuer
                </Button>
            </form>
        </Container>
    );
};
