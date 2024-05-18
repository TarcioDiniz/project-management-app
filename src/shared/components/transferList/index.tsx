import { Button, Checkbox, Grid, List, ListItem, ListItemText } from '@mui/material';
import { IUser } from '../../../model/IUser';
import { useState } from "react";

interface TransferListProps {
  left: IUser[];
  right: IUser[];
  onTransfer: (newLeft: IUser[], newRight: IUser[]) => void;
}

const TransferList = ({ left, right, onTransfer }: TransferListProps) => {
  const [checked, setChecked] = useState<IUser[]>([]);

  const handleToggle = (user: IUser) => {
    const currentIndex = checked.findIndex((checkedUser) => checkedUser.id === user.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(user);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleTransferRight = () => {
    const newRight = right.concat(checked);
    const newLeft = left.filter(user => !checked.some(checkedUser => checkedUser.id === user.id));
    setChecked([]);
    onTransfer(newLeft, newRight);
  };

  const handleTransferLeft = () => {
    const newLeft = left.concat(checked);
    const newRight = right.filter(user => !checked.some(checkedUser => checkedUser.id === user.id));
    setChecked([]);
    onTransfer(newLeft, newRight);
  };

  const customList = (items: IUser[]) => (
    <List dense component="div" role="list">
      {items.map((user) => (
        <ListItem key={user.id} role="listitem" button onClick={() => handleToggle(user)}>
          <Checkbox
            checked={checked.some(checkedUser => checkedUser.id === user.id)}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={user.name} secondary={user.profile} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleTransferRight}
            disabled={checked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleTransferLeft}
            disabled={checked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default TransferList;
