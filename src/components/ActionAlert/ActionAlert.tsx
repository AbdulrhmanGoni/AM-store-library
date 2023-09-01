import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';


interface ActionAlertPprops {
    children: JSX.Element,
    title: string,
    message: string,
    action: () => void,
    actionButtons?: { okButton?: string, cancelButton?: string }
    openingCondition?: { enable?: boolean, condition?: boolean }
}

function ActionAlert(props: ActionAlertPprops) {

    let {
        children, title, message,
        action, openingCondition = { enable: false },
        actionButtons
    } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (openingCondition.enable) {
            openingCondition.condition && setOpen(true);
        } else setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const agree = () => {
        action();
        setOpen(false);
    };

    return (
        <div>
            {React.cloneElement(children, { onClick: handleClickOpen })}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>{actionButtons?.cancelButton ?? "cancel"}</Button>
                    <Button variant='contained' onClick={agree} autoFocus>{actionButtons?.okButton ?? "ok"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActionAlert