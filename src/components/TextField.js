import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomTextField = withStyles({
    root: {
        '& .MuiIconButton-root': {
            color: 'white'
        },
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
})(TextField);

export default CustomTextField;