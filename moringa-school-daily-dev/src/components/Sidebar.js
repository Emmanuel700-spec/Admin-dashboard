// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

// Mock current user role (this can be fetched from the backend or context)
const userRole = 'Admin'; // Can be 'Admin', 'TechWriter', or 'User'

const Sidebar = () => {
  const renderAdminMenu = () => (
    <>
      <ListItem button>
        <ListItemText>
          <Link to="/admin/dashboard">Dashboard</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/admin/users">Manage Users</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/admin/content">Manage Content</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/admin/categories">Manage Categories</Link>
        </ListItemText>
      </ListItem>
    </>
  );

  const renderTechWriterMenu = () => (
    <>
      <ListItem button>
        <ListItemText>
          <Link to="/techwriter/profile">Create Profile</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/techwriter/categories">Manage Categories</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/techwriter/post-content">Post Content</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/techwriter/approve-content">Approve Content</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/techwriter/flagged-content">Flagged Content</Link>
        </ListItemText>
      </ListItem>
    </>
  );

  const renderUserMenu = () => (
    <>
      <ListItem button>
        <ListItemText>
          <Link to="/user/profile">Create Profile</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/user/categories">Subscribe to Categories</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/user/wishlist">Wishlist</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/user/notifications">Notifications</Link>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>
          <Link to="/user/content">View Content</Link>
        </ListItemText>
      </ListItem>
    </>
  );

  const renderMenu = () => {
    switch (userRole) {
      case 'Admin':
        return renderAdminMenu();
      case 'TechWriter':
        return renderTechWriterMenu();
      case 'User':
        return renderUserMenu();
      default:
        return null;
    }
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {renderMenu()}
      </List>
    </Drawer>
  );
};

export default Sidebar;

