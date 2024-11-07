// src/pages/ManageCategories.js
import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, Grid, TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../redux/adminSlice'; // Redux action to manage categories
import { getCategories, removeCategory, createCategory } from '../services/api'; // API functions

const ManageCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.admin.categories); // Fetch categories from Redux store
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        dispatch(setCategories(categoriesData)); // Sync with Redux store
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory) {
      try {
        const newCategoryObj = {
          name: newCategory
        };
        const createdCategory = await createCategory(newCategoryObj); // Call API to create category
        dispatch(setCategories([...categories, createdCategory])); // Update categories in Redux store
        setNewCategory(''); // Clear input field
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  // Handle removing a category
  const handleRemoveCategory = async (categoryId) => {
    try {
      await removeCategory(categoryId); // Call API to remove category
      dispatch(setCategories(categories.filter((category) => category.id !== categoryId))); // Update Redux store
    } catch (error) {
      console.error('Error removing category:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Categories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Add Category Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Add New Category</Typography>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                sx={{ marginBottom: '15px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                fullWidth
              >
                Add Category
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Existing Categories List */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Existing Categories
              </Typography>
              <List>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <ListItem key={category.id}>
                      <ListItemText primary={category.name} />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveCategory(category.id)}
                      >
                        Remove
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <Typography>No categories available</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageCategories;
