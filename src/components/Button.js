import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#7469ff",
        minWidth:"6rem",
        textTransform:"none",
        '&:hover': {
            backgroundColor: "#4c46a7",
        },
    },
}))(Button);

export default CustomButton;