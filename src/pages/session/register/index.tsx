import {Form, Formik} from "formik";
import {
    Avatar,
    Badge,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StringAvatar from "../../../shared/helpers/StringAvatar.ts";
import {ProfileType} from "../../../shared/enums/ProfileType.ts";
import * as Yup from "yup";
import React, {useCallback, useRef, useState} from "react";
import styles from "../login/login.module.scss";
import useUsers from "../../../hooks/useUsers";
import {toast} from "react-toastify";

const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    profile: Yup.mixed().oneOf(Object.values(ProfileType)).required('Perfil é obrigatório'),
});

interface FormValues {
    id: number;
    name: string;
    email: string;
    password: string;
    profile: ProfileType;
    photo: string;
}
const Register = () => {

    const _user = useUsers();
    const isEditing= true;
    const [avatar, setAvatar] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const initialValue = {
        id: -1,
        name: "",
        email: "",
        password: "",
        profile: ProfileType.TEACHER,
        photo: ""
    };

    const onSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            _user.addUser(values);
            toast.success("Registered Successfully");
            setSubmitting(false);
        }, 400);
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = useCallback((
        event: React.DragEvent<HTMLDivElement>,
        setFieldValue: (
            field: string,
            value: string,
            shouldValidate?: boolean) => void
    ) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setFieldValue("photo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleDeleteAvatar = (setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean) => void) => {
        setAvatar("");
        setFieldValue("photo", "");
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = useCallback((
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (
            field: string,
            value: string,
            shouldValidate?: boolean
        ) => void) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setFieldValue("photo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);


    return (
        <>
            <div className={styles.context}>
                <div className={styles.paper}>
                    <Formik

                        initialValues={{...initialValue, photo: avatar}}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({errors, touched, handleChange, values, setFieldValue}) => (
                            <Form>
                                <Box display="flex" flexDirection="column" alignItems="center"
                                     onDrop={(event) => handleDrop(event, setFieldValue)}
                                     onDragOver={handleDragOver}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                        badgeContent={
                                            isEditing && avatar && (
                                                <IconButton
                                                    size="small"
                                                    style={{background: "black", color: "white"}}
                                                    onClick={() => handleDeleteAvatar(setFieldValue)}
                                                >
                                                    <DeleteIcon fontSize="small"/>
                                                </IconButton>
                                            )
                                        }
                                    >
                                        <Avatar
                                            src={avatar}
                                            alt="User Avatar"
                                            sx={{width: 100, height: 100, cursor: isEditing ? 'pointer' : 'default'}}
                                            onClick={isEditing ? handleAvatarClick : undefined}
                                            {...StringAvatar(values.name)}
                                        />
                                    </Badge>
                                    {isEditing && (
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{display: 'none'}}
                                            accept="image/*"
                                            onChange={(event) => handleFileChange(event, setFieldValue)}
                                        />
                                    )}
                                </Box>
                                <div>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        margin="normal"
                                        disabled={!isEditing}
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        margin="normal"
                                        disabled={!isEditing}
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Senha"
                                        type={"password"}
                                        value={values.password}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        margin="normal"
                                        disabled={!isEditing}
                                    />
                                    <FormControl fullWidth margin="normal" disabled={!isEditing}>
                                        <InputLabel id="profile-label">Perfil</InputLabel>
                                        <Select
                                            labelId="profile-label"
                                            id="profile"
                                            name="profile"
                                            value={values.profile}
                                            onChange={handleChange}
                                            error={touched.profile && Boolean(errors.profile)}
                                        >
                                            {Object.values(ProfileType).map((profile) => (
                                                <MenuItem key={profile} value={profile}>
                                                    {profile}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                {isEditing && (
                                    <Button color="primary" variant="contained" fullWidth type="submit">
                                        Enviar
                                    </Button>
                                )}
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
}

export default Register;