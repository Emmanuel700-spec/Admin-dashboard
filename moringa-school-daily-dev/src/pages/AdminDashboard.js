import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setContent, setCategories } from '../redux/adminSlice';
import { getUsers, getContent, getCategories, deactivateUser, approveContent, flagContent, createCategory } from '../services/api'; 
import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const content = useSelector((state) => state.admin.content);
  const categories = useSelector((state) => state.admin.categories);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('users');
  const [newCategory, setNewCategory] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [techWriterCount, setTechWriterCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const contentData = await getContent();
        const categoriesData = await getCategories();

        if (isMounted) {
          dispatch(setUsers(usersData?.data || []));
          dispatch(setContent(contentData?.data || []));
          dispatch(setCategories(categoriesData?.data || []));
          
          setUserCount(usersData?.data.length || 0);
          setTechWriterCount(usersData?.data.filter(user => user.role === 'Tech Writer').length || 0);
          setContentCount(contentData?.data.length || 0);
          setAdminCount(usersData?.data.filter(user => user.role === 'Admin').length || 0);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const handleDeactivateUser = async (userId) => {
    try {
      await deactivateUser(userId);
      const updatedUsers = await getUsers();
      dispatch(setUsers(updatedUsers?.data || []));
      setUserCount(updatedUsers?.data.length || 0);
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      await approveContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
      setContentCount(updatedContent?.data.length || 0);
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      await flagContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
      setContentCount(updatedContent?.data.length || 0);
    } catch (error) {
      console.error('Error flagging content:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await createCategory({ name: newCategory });
      const updatedCategories = await getCategories();
      dispatch(setCategories(updatedCategories?.data || []));
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
    navigate(`/admin/${section}`);
  };

  const handleVisitSite = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f4f6f9', height: '100vh' }}>
      <Sidebar onSelectSection={setActiveSection} />
      <div style={{ marginLeft: 240, padding: '20px', width: '100%' }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Users</Typography>
                <Typography variant="h5">{userCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Tech Writers</Typography>
                <Typography variant="h5">{techWriterCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Content</Typography>
                <Typography variant="h5">{contentCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Admins</Typography>
                <Typography variant="h5">{adminCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div style={{ marginBottom: '20px' }}>
          <Button 
            onClick={() => navigateToSection('users')} 
            variant="contained" 
            color="primary"
            style={{ marginRight: '10px', backgroundColor: '#1976d2' }}
          >
            Go to Users
          </Button>

          <Button 
            onClick={() => navigateToSection('content')} 
            variant="contained" 
            color="secondary"
            style={{ marginRight: '10px', backgroundColor: '#9c27b0' }}
          >
            Go to Content
          </Button>

          <Button 
            onClick={() => navigateToSection('categories')} 
            variant="contained" 
            color="success"
            style={{ marginRight: '10px', backgroundColor: '#4caf50' }}
          >
            Go to Categories
          </Button>

          <Button 
            onClick={() => navigateToSection('techwriters')} 
            variant="contained" 
            color="info"
            style={{ marginRight: '10px', backgroundColor: '#3f51b5' }}
          >
            Go to Tech Writers
          </Button>

          <Button 
            onClick={handleVisitSite} 
            variant="contained" 
            color="info"
            style={{ backgroundColor: '#00bcd4' }}
          >
            Visit Site
          </Button>
        </div>

        {/* Conditional rendering based on active section */}
        {activeSection === 'users' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6">Users</Typography>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} style={{ marginBottom: '10px' }}>
                        <Typography>{user.username}</Typography>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleDeactivateUser(user.id)} 
                          style={{ marginTop: '5px' }}
                        >
                          Deactivate
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Typography>No users available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}


      </div>
    </div>
  );
};

export default AdminDashboard;
