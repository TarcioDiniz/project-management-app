import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import useProjects from "../../../hooks/useProjects";
import {IProject} from "../../../model/IProject.ts";
import {toast} from "react-toastify";

interface DialogProjectProps {
  project?: IProject | null
  open: boolean;
  onClose: () => void;
  setProject: (project: IProject) => void;
}

const DialogProject = ({project, open, onClose, setProject}: DialogProjectProps) => {

  const projects = useProjects();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: project?.id || projects.projects[projects.projects.length - 1]?.id + 1 || 0,
            name: project?.name || '',
            description: project?.description || '',
          }}
          onSubmit={async (values) => {
            try {
              const projectData: IProject = {
                id: values.id,
                name: values.name || '',
                description: values.description || '',
              };
              setProject(projectData);
              onClose();
            } catch (error) {
              toast.error('Error submitting form')
            }
          }}
        >
          {({errors, touched}) => (
            <Form>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                required
                error={!!errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ''}
              />
              <Field
                as={TextField}
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
              />
              <DialogActions>
                <Button variant="outlined" onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default DialogProject;
