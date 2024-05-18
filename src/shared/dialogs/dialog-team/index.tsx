import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as Yup from 'yup';
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {ProfileType} from "../../enums/ProfileType";
import {IUser} from "../../../model/IUser";
import useProjects from "../../../hooks/useProjects";
import useUsers from "../../../hooks/useUsers";
import {ITeam} from "../../../model/ITeam.ts";
import useTeams from "../../../hooks/useTeams";

interface DialogTeamProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (team: ITeam) => void;
  selectTeam: ITeam | null;
}

interface FormValues {
  name: string;
  id: number;
  project: number | null;
  members: number[];
}

const DialogTeam = ({open, handleClose, onSubmit, selectTeam}: DialogTeamProps) => {
  const users = useUsers();
  const filteredUsers: IUser[] = users.users.filter(user => user.profile !== ProfileType.TEACHER);
  const projects = useProjects();
  const _teams = useTeams();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    id: Yup.number().required('ID is required'),
    members: Yup.array().of(Yup.number().required()),
    project: Yup.number().nullable().required('Project is required'),
  });

  const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    setTimeout(() => {
      const team: ITeam = {
        ...values,
        members: users.users.filter(user => values.members.includes(user.id)),
        project: projects.projects.find(project => project.id === values.project) || null,
      };
      onSubmit(team);
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
      handleClose();
    }, 400);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create Team</DialogTitle>
      <Formik<FormValues>
        initialValues={{
          id: selectTeam?.id || _teams.teams[_teams.teams.length - 1]?.id + 1 || 0,
          name: selectTeam?.name || "",
          project: selectTeam?.project?.id || null,
          members: selectTeam?.members.map(m => m.id) || []
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form>
            <DialogContent>
              <FormControl fullWidth margin="normal">
                <Field
                  as={TextField}
                  label={"Name"}
                  id="name"
                  name="name"
                  error={formikProps.touched.name && Boolean(formikProps.errors.name)}
                  InputLabelProps={{shrink: true}}
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <FormHelperText error>{formikProps.errors.name}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="project-label">Project</InputLabel>
                <Field
                  as={Select}
                  labelId="project-label"
                  label={"Project"}
                  name="project"
                  error={formikProps.touched.project && Boolean(formikProps.errors.project)}
                >
                  {projects.projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Field>
                {formikProps.touched.project && formikProps.errors.project && (
                  <FormHelperText error>{formikProps.errors.project}</FormHelperText>
                )}
              </FormControl>
              <Box my={2}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="members-label">Members</InputLabel>
                  <Field
                    as={Select}
                    labelId="members-label"
                    label={"members"}
                    name="members"
                    multiple
                    error={formikProps.touched.members && Boolean(formikProps.errors.members)}
                  >
                    {filteredUsers.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                  {formikProps.touched.members && formikProps.errors.members && (
                    <FormHelperText error>{formikProps.errors.members as string}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DialogTeam;
