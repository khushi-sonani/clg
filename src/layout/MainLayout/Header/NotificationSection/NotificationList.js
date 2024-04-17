// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { Chip, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const NotificationList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const chipSX = {
  //   height: 24,
  //   padding: '0 6px'
  // };

  const [leaveRequests, setLeaveRequests] = useState([]);
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://salary-box-bakend.vercel.app/leave/getleave');
        const data = await response.json();
  
        if (response.ok) {
          const filteredLeaveRequests = data.leaveRequests.filter(request => {
            const applyDate = new Date(request.applydate);
            const now = new Date();
  
            const timeDifferenceInHours = (now - applyDate) / (1000 * 60 * 60);
  
            return timeDifferenceInHours >= 0 && timeDifferenceInHours < 48;
          });
  
          setLeaveRequests(filteredLeaveRequests);
          console.log(filteredLeaveRequests, "filtered data is ");
        } else {
          setError(data.message || 'Failed to fetch leave requests');
        }
      } catch (error) {
        // setError('Internal server error oucress');
        console.error('Error fetching leave requests:', error);
      } finally {
        // setLoading(false);
      }
    };

    
  
    fetchLeaveRequests();
  }, []);
  
  
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://salary-box-bakend.vercel.app/chats/adminchat');
        console.log(response.data.chatMessages);
        setChat(response.data.chatMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const getStatusColor = (status, theme) => {
    switch (status) {
      case 'pending':
        return theme.palette.warning.dark;
      case 'approved':
        return theme.palette.success.dark;
      case 'rejected':
        return theme.palette.error.dark;
      default:
        return theme.palette.text.primary;
    }
  };

  const getStatusBackgroundColor = (status, theme) => {
    switch (status) {
      case 'pending':
        return theme.palette.warning.light;
      case 'approved':
        return theme.palette.success.light;
      case 'rejected':
        return theme.palette.error.light;
      default:
        return theme.palette.background.paper;
    }
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {leaveRequests.map((request, index) => {
        const chipStatusSX = {
          height: 24,
          padding: '0 6px',
          color: getStatusColor(request.status, theme),
          backgroundColor: getStatusBackgroundColor(request.status, theme),
          marginRight: '5px'
        };

        return (
          <React.Fragment key={request.id}>
            <ListItemWrapper onClick={() => navigate('/leaverequest')}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <FontAwesomeIcon icon={faCalendarAlt} size="lg" color={theme.palette.text.primary} />
                </ListItemAvatar>

                <ListItemText primary={request.empid} />
                <ListItemSecondaryAction>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block" gutterBottom>
                        2 min ago
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">{request.leavetype}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item>
                      <Chip label={request.status} sx={chipStatusSX} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItemWrapper>
            {index < leaveRequests.length - 1 && <Divider />} 
          </React.Fragment>
          
        );
      })}
      {chat.map((request, index) => {
        const chipStatusSX = {
          height: 24,
          padding: '0 6px',
          color: getStatusColor("approved", theme),
          backgroundColor: getStatusBackgroundColor("approved", theme),
          marginRight: '5px'
        };

        return (
          <React.Fragment key={request._id}>
            <ListItemWrapper onClick={() => navigate('/leaverequest')}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <FontAwesomeIcon icon={faCalendarAlt} size="lg" color={theme.palette.text.primary} />
                </ListItemAvatar>

                <ListItemText primary={request.empid} />
                <ListItemSecondaryAction>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block" gutterBottom>
                        2 min ago
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">{request.addchat}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item>
                      <Chip label="view" sx={chipStatusSX} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItemWrapper>
            {index < leaveRequests.length - 1 && <Divider />} 
          </React.Fragment>
          
        );
      })}
    </List>
  );
};

export default NotificationList;
