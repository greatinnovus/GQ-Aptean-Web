import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '3px',

        "& .MuiCheckbox-root": {
            fontStyle: 'italic',
            color: '#008EC5',
        },
        "& .PrivateSwitchBase-input-87": {
            color: '#008EC5',
        }
    }

}));
export default function Checkboxes(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    //   const handleChange = (event) => {
    //     setChecked(event.target.checked);
    //   };

    return (
        <Checkbox
            defaultChecked={props.defaultChecked}
            color={props.color}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            className={classes.root + ' ' + props.className}
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            disabled={props.disabled}
            checked={props.checked}
        />
    );
}
