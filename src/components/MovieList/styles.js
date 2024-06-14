import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({

    moivesContainer: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    }

}));