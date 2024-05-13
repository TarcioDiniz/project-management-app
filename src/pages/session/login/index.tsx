import {Button, ButtonProps, IconButton, InputAdornment, styled, TextField, Typography} from "@mui/material";
import {Field, Form, Formik, FormikHelpers} from "formik";
import styles from "./login.module.scss";
import * as Yup from 'yup';
import React, {useContext, useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthContext from "../../../shared/context/Auth";


interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup
    .string()
    .required("Required"),
});

const sxInput = {
  "& input": {
    color: "#30ff41", // Cor do texto
  },
  "& label": {
    color: "#30ff41", // Cor do texto do rótulo
  },
  "& fieldset": {
    borderColor: "#30ff41", // Cor da borda
  },
  "&:hover fieldset": {
    borderColor: "#38a441 !important", // Cor da borda quando o mouse está em cima
  },
}

const ColorButton = styled(Button)<ButtonProps>(() => ({

  borderColor: "#30ff41",
  backgroundColor: "#30ff41",
  color: "#0c4211",
  '&:hover': {
    color: "#30ff41",
    backgroundColor: "#0c4211",
  },
}));

const Login = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext not provided correctly");
  }

  const { handleLogin } = authContext;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    handleLogin(values)
    actions.setSubmitting(false);
  };

  return (
    <>
      <div className={styles.context}>
        <div className={styles.paper}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({errors, touched}) => (
              <Form className={styles.form}>
                <Typography variant="h6" gutterBottom style={{textTransform: "uppercase"}}>
                  Login
                </Typography>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  color="success"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ''}
                  sx={sxInput}
                />
                <Field
                  color="success"
                  name="password"
                  as={TextField}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ?
                            <VisibilityOff className={styles.iconPassword}/> :
                            <Visibility className={styles.iconPassword}/>
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={sxInput}
                />
                <ColorButton fullWidth type="submit" variant="outlined">
                  Login
                </ColorButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Login;
