import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Styled component for responsive table
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
        margin: theme.spacing(2),
    },
}));

const ControlledAccordions = ({ punchData }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className=''> 
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{
                    mt: { xs: 2, sm: 3, md: 4, lg: 5 }, // Responsive margin-top
                    mx: { xs: 1, sm: 2 }, // Responsive margin-left/right
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ textAlign: 'center', width: '100%' }}>
                        Show Today's Punches
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StyledTableContainer component={Paper}>
                        <Table aria-label="punches table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {punchData.length > 0 ? (
                                    punchData.map((punch, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{punch.dateOfPunch}</TableCell>
                                            <TableCell>{punch.timeOfPunch}</TableCell>
                                            <TableCell>{punch.status}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            No punches for today.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ControlledAccordions;
