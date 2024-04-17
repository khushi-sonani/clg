import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Modal, Form } from 'react-bootstrap';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const ShadowBox = ({ shadow }) => (
  <Card sx={{ mb: 3, boxShadow: shadow }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4.5,
        bgcolor: 'primary.light',
        color: 'grey.800'
      }}
    >
      <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
    </Box>
  </Card>
);

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired
};

function UtilitiesShadow() {
  const [show, setShow] = useState(false);
  const [holidaytype, setholidaytype] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidays, setHolidays] = useState([]);
 

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (holidayDate) {
        const adjustedDate = new Date(holidayDate);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const formattedDate = adjustedDate.toISOString().split('T')[0];
        
        await axios.post('https://salary-box-bakend.vercel.app/holiday/holidays', {
          holidaytype: holidaytype, 
          date: formattedDate
        });

        setholidaytype('');
        setHolidayDate('');
        setShow(false);
        fetchHolidays(); // Refresh holidays after adding a new one
      } else {
        alert('Please select a date');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding holiday');
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await fetch('https://salary-box-bakend.vercel.app/holiday/holidays');
      if (response.ok) {
        const data = await response.json();
        setHolidays(data.holidays);
        console.log(data.holidays)
        setLoading(false);
      } else {
        console.error('Error fetching holidays:', response.statusText);
        setError('Failed to fetch holiday records');
        setLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
    
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <MainCard title="Holiday">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div className='text-end'>
            <Button onClick={() => setShow(true)} style={{ backgroundColor: '#607d8b', color: "#eceff1", width: "20%" }}>Add Holiday</Button>
          </div>
          <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Holiday</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Holiday Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Holiday Name"
                    autoFocus
                    value={holidaytype}
                    onChange={(e) => setholidaytype(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Holiday Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    autoFocus
                    value={holidayDate}
                    onChange={(e) => setHolidayDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className='dash-btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#607d8b', color: "#eceff1", width: "30%" }}>
                Add Holiday
              </Button>
            </Modal.Footer>
          </Modal>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, marginTop: "50px", maxWidth: 800 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Holiday Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holidays.map((holiday) => (
                  <TableRow key={holiday._id}>
                    <TableCell component="th" scope="row">
                      {holiday.holidaytype}
                    </TableCell>
                    <TableCell align="right">{holiday.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default UtilitiesShadow;
