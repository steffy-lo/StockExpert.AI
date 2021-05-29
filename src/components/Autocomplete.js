import { withStyles, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const customAutoCompleteStyle = makeStyles({
    listbox: {
        color: "white",
        backgroundColor: "#4c46a7",
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

const CustomAutocomplete = withStyles({
    root: {
        color: '#7469ff',
        '& .MuiInputBase-input': {
            color: 'white'
        },
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: '#7469ff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#7469ff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7469ff',
            },
        },
    },
})(Autocomplete);

export default CustomAutocomplete;