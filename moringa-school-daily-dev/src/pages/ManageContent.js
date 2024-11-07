import React, { useState } from 'react';
import { Typography, Card, CardContent, Button, Grid, Box, Snackbar } from '@mui/material';

const ManageContent = () => {
  const [content, setContent] = useState([
    {
      id: 1,
      title: 'Example Content',
      description: 'This is a brief description of the content. It gives an overview of the content\'s purpose or key points.',
      status: 'Pending', // Status can be 'Pending', 'Approved', or 'Flagged'
      flagged: false, // Flagged content status
    },
    {
      id: 2,
      title: 'Another Content Example',
      description: 'This is a description of another piece of content, explaining its relevance and purpose.',
      status: 'Pending',
      flagged: false,
    },
  ]);
  
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Handle Approve Content
  const handleApprove = (id) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );
    setSnackbarMessage('Content Approved');
    setSnackbarOpen(true);
  };
  
  // Handle Flag Content
  const handleFlag = (id) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === id ? { ...item, flagged: true, status: 'Flagged' } : item
      )
    );
    setSnackbarMessage('Content Flagged');
    setSnackbarOpen(true);
  };
  
  // Handle Remove Flagged Content
  const handleRemove = (id) => {
    setContent(prevContent => 
      prevContent.filter(item => item.id !== id)
    );
    setSnackbarMessage('Flagged Content Removed');
    setSnackbarOpen(true);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Manage Content
      </Typography>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />

      <Grid container spacing={4} justifyContent="center">
        {content.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Content Title: {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Status: <strong>{item.status}</strong>
                </Typography>
                <Button 
                  variant="contained" 
                  color="success" 
                  sx={{ mr: 1, width: '100%' }}
                  onClick={() => handleApprove(item.id)}
                  disabled={item.status !== 'Pending' || item.flagged}
                >
                  Approve
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  sx={{ width: '100%' }}
                  onClick={() => handleFlag(item.id)}
                  disabled={item.status !== 'Pending' || item.flagged}
                >
                  Flag
                </Button>

                {item.flagged && (
                  <Button 
                    variant="contained" 
                    color="warning" 
                    sx={{ width: '100%', marginTop: '10px' }}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove Content
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageContent;
