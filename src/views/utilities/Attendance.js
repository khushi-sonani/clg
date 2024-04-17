// material-ui
import { Card } from '@mui/material';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Form from 'react-bootstrap/Form';
import MainCard from 'ui-component/cards/MainCard';

const Attendance = () => {
  const [present, setpresent] = useState(false);
  const [absent, setabsent] = useState(false);
  const [late, setlete] = useState(false);
  const [leave, setleave] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getFormattedDate()); 

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <MainCard title="Attendance">
        <div className="mb-5">
          <Form.Group as={Col} md="2" controlId="validationCustom02">
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </Form.Group>
        </div>
        <div className="main-box" style={{ display: 'flex', gap: '5px' }}>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Col
              onClick={() => {
                setpresent(true), setabsent(false), setlete(false), setleave(false);
              }}
            >
              <Card style={{ backgroundColor: '#607d8b', padding: '30px', color: '#eceff1', cursor: 'pointer' }}>
                <div style={{ textAlign: 'center' }}>
                  <h1>0</h1>
                  <h5>Present</h5>
                </div>
              </Card>
            </Col>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Col
              onClick={() => {
                setpresent(false), setabsent(true), setlete(false), setleave(false);
              }}
            >
              <Card style={{ backgroundColor: '#607d8b', padding: '30px', color: '#eceff1', cursor: 'pointer' }}>
                <div style={{ textAlign: 'center' }}>
                  <h1>0</h1>
                  <h5>Absent</h5>
                </div>
              </Card>
            </Col>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Col
              onClick={() => {
                setpresent(false), setabsent(false), setlete(true), setleave(false);
              }}
            >
              <Card style={{ backgroundColor: '#607d8b', padding: '30px', color: '#eceff1', cursor: 'pointer' }}>
                <div style={{ textAlign: 'center' }}>
                  <h1>0</h1>
                  <h5>Late</h5>
                </div>
              </Card>
            </Col>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Col
              onClick={() => {
                setpresent(false), setabsent(false), setlete(false), setleave(true);
              }}
            >
              <Card style={{ backgroundColor: '#607d8b', padding: '30px', color: '#eceff1', cursor: 'pointer' }}>
                <div style={{ textAlign: 'center' }}>
                  <h1>0</h1>
                  <h5>Leave</h5>
                </div>
              </Card>
            </Col>
          </div>
        </div>

        <div>
          {present ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 , marginTop:"50px",  maxWidth: 800, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name </TableCell>
                      <TableCell align="right">Punch In Time</TableCell>
                      <TableCell align="right">Punch Out Time</TableCell>
                      {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" scope="row">
                      khushi
                    </TableCell>
                    <TableCell align="right">sonani</TableCell>
                    <TableCell align="right">123</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            ''
          )}
        </div>
        <div>{absent ? <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 , marginTop:"50px",  maxWidth: 800, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name </TableCell>
                      <TableCell align="right">Punch In Time</TableCell>
                      <TableCell align="right">Punch Out Time</TableCell>
                      {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" scope="row">
                      dhruvi
                    </TableCell>
                    <TableCell align="right">sonani</TableCell>
                    <TableCell align="right">11111</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </> : ''}</div>
        <div>{late ?<>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 , marginTop:"50px",  maxWidth: 800, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name </TableCell>
                      <TableCell align="right">Punch In Time</TableCell>
                      <TableCell align="right">Punch Out Time</TableCell>
                      {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" scope="row">
                      krushil
                    </TableCell>
                    <TableCell align="right">vaghani</TableCell>
                    <TableCell align="right">1122</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </> : ''}</div>
        <div>{leave ? <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 , marginTop:"50px",  maxWidth: 800, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name </TableCell>
                      <TableCell align="right">Punch In Time</TableCell>
                      <TableCell align="right">Punch Out Time</TableCell>
                      {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" scope="row">
                      janak
                    </TableCell>
                    <TableCell align="right">solank</TableCell>
                    <TableCell align="right">11333</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </> : ''}</div>
      </MainCard>
    </>
  );
};

export default Attendance;
