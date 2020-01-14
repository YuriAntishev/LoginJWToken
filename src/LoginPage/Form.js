import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { TextField } from 'formik-material-ui';
import { blue, red } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
        verticalAlign: 'middle',
        font: "14px",
    },
    form: {
        marginTop: '10rem'
    },
    lockicon: {
        display: 'block',
        margin: "0 auto 0 auto",
    },
    links: {
        margin: "10px 0px 20px 0px",
        width: "391px"
    },
    link1: { float: "left" },
    link2: { float: "right" },
    checkbox: {
        width: "375px",
        float: "left"
    },
    button: {
        width: '391px',
        height: '40px',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#E10050'
        },
        error: red,
    },
});

export default function FormRender({ status, isSubmitting }) {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const classes = useStyles();

    return (
        <Grid
            className={classes.form}
            container
            spacing={0}
            alignItems="center"
            justify="center"
            direction="column"
        >
            <Grid item xs={9}>
                <img
                    className={classes.lockicon}
                    src="/src/images/icon.png"
                    alt="Icon"
                />
                <Typography
                    align="center"
                    variant="h6">
                    Вход в аккаунт
                </Typography>
                <Form className={classes.root}>
                    <ThemeProvider theme={theme}>
                        <Field
                            name="email"
                            type="email"
                            label="Почта*"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            fullWidth
                            component={TextField}
                            className={classes.margin} />

                        <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                        />
                        <Field
                            name="password"
                            type="password"
                            label="Пароль*"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            fullWidth
                            component={TextField}
                            className={classes.margin}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback" />

                        <FormControlLabel
                            className={classes.checkbox}
                            control={
                                <Checkbox
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            className={classes.button}>
                            Войти в аккаунт
                        </Button>
                        {isSubmitting &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}

                        {status &&
                            <div className={'alert alert-danger'}>
                                {status}
                            </div>}

                        <Typography className={classes.links}>
                            <Link href={""} className={classes.link1}>
                                Забыли пароль?
                            </Link>
                            <Link href={""} className={classes.link2}>
                                Ещё нет аккаунта? Регистрация
                            </Link>
                        </Typography>
                    </ThemeProvider>
                    <Typography
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                        align="center">
                        Copyright© Ваш сайт 2019.
                    </Typography>
                </Form>
            </Grid>
        </Grid>
    );
}