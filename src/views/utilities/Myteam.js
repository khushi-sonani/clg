import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
// import { Link as RouterLink } from 'react-router-dom';
import {
  
  Link,
//   Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
//   Typography
} from '@mui/material';
// import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'Emp Id'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Phone no'
  },
 
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Email'
  }
];

const OrderTable = () => {
  const navigate = useNavigate();
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  useEffect(() => {
    axios
      .get('https://salary-box-bakend.vercel.app/employeedate')
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data)
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
        // alert('Data could not be fetched');
      });
  }, []);
  const handleEditForm = (empid) => {
    // Use navigate to redirect to the edit form page, you need to define your route for editing
    navigate(`/Empdetails/${empid}`);
  };

  return (
    <MainCard title="My Team  :)" >
    {/* // <Box> */}
      <div style={{ display:'flex', justifyContent:"end", marginBottom:"20px"}}>
      <Button  style={{backgroundColor: '#607d8b', color:"#eceff1"}}  onClick={() => navigate('/addemp')}>
        <FontAwesomeIcon icon={faPlus} style={{ paddingRight:"10px", }}/>Add Employee</Button>
      </div>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            },
            border: '1px solid #dddddd',
          }}
        >
          <TableHead sx={{ backgroundColor: '#e0e0e0', width:"100%" }} >
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ width:"50%"}}>
            {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                  
                >
                  <TableCell component="th" id={labelId} scope="row" align="left" style={{backgroubdColor:"red"}}>
                    <Link color="secondary"  onClick={() => handleEditForm(row.empid)} style={{cursor:"pointer"}}>
                      {row.empid}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.fname}</TableCell>
                  <TableCell align="right">{row.mobileNo}</TableCell>
                  <TableCell align="right">
                    {row.email} 
                  </TableCell>
                  {/* <TableCell align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    {/* // </Box> */}
    </MainCard>
  );
};

OrderTable.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};




export default OrderTable;
