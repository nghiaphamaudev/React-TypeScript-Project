import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import themeTextField from 'src/config/themeInput';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MyButton from '../client/buttons/MyButton';
import { Category } from 'src/types/category';

import axiosInstance from 'src/config/axiosConfig';
import { useSnackbar } from 'src/contexts/Snackbar';
import { useLinearLoading } from 'src/contexts/Progress';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Input = styled('input')({
  display: 'none',
});
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type AddProductParams = {
  name: string;
  price: number;
  priceDiscount: number;
  version: number;
  coverImg: File;
  photo: File[];
  summary: string;
  description: string;
  category: string;
  memory: string;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const { showSnackbar } = useSnackbar();
  const { showLoading, hideLoading } = useLinearLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddProductParams>();

  const getCategory = async () => {
    showLoading();
    try {
      const { data } = await axiosInstance.get('/categories');
      setCategories(data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  const onSubmit: SubmitHandler<AddProductParams> = async (data) => {
    try {
      await axiosInstance.post('/users/signup', data);
      showSnackbar('success', 'Register is successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      console.log(error);
      showSnackbar('error', error.response.data.message);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      if (filesArray.length > 2) {
        showSnackbar('error', 'You can only upload a maximum of 2 photos.');
      } else {
        setPhotos(filesArray);
        setValue('photo', filesArray);
      }
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 overflow-auto h-screen w-">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <Typography
            variant="h5"
            fontWeight={600}
            align="center"
            mb={3}
            gutterBottom
          >
            Add new product
          </Typography>
          <ThemeProvider theme={themeTextField}>
            <CssBaseline />
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Product name
                  </Typography>
                  <TextField
                    sx={{ border: 'none' }}
                    {...register('name', {
                      required: 'Name product is required!',
                    })}
                    placeholder="Type product name"
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Category
                  </Typography>
                  <FormControl sx={{ minWidth: 300 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Select category
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      {...register('category', {
                        required: 'Category is required!',
                      })}
                      error={!!errors?.category?.message}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Price
                  </Typography>
                  <TextField
                    sx={{ border: 'none' }}
                    {...register('price', {
                      required: 'Price product is required!',
                      min: 'Price product is minium 0',
                    })}
                    error={!!errors?.price?.message}
                    helperText={errors?.price?.message}
                    placeholder="Type price product"
                    fullWidth
                  />
                </div>
                <div>
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Price Discount
                  </Typography>
                  <TextField
                    sx={{ border: 'none' }}
                    {...register('priceDiscount', {
                      required: 'Price discount product is required!',
                      min: 'Price discount product is minium 0',
                    })}
                    error={!!errors?.priceDiscount?.message}
                    helperText={errors?.priceDiscount?.message}
                    placeholder="Type price discount product"
                    fullWidth
                  />
                </div>
                <div>
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Version
                  </Typography>
                  <TextField
                    sx={{ border: 'none' }}
                    {...register('version', {
                      required: 'Version product is required!',
                      min: 'Version product is minium 0',
                    })}
                    error={!!errors?.version?.message}
                    helperText={errors?.version?.message}
                    placeholder="Type version  product"
                    fullWidth
                  />
                </div>
                <div>
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Memory SSD
                  </Typography>
                  <TextField
                    sx={{ border: 'none' }}
                    {...register('memory', {
                      required: 'Memory product is required!',
                      min: 'Memory product is minium 0',
                    })}
                    error={!!errors?.memory?.message}
                    helperText={errors?.memory?.message}
                    placeholder="Type memory  product"
                    fullWidth
                  />
                </div>

                <div className="w-full">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Cover Image
                  </Typography>
                  <Box>
                    <label htmlFor="contained-button-file">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.files && event.target.files[0]) {
                              setValue('coverImg', event.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    </label>
                  </Box>
                </div>

                <div className="w-full">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Photos Product
                  </Typography>
                  <Box>
                    <label htmlFor="contained-button-file">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                      </Button>
                    </label>
                    {photos.length > 0 && (
                      <Box mt={2}>
                        {photos.map((photo, index) => (
                          <Typography key={index} variant="body2">
                            {photo.name}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                </div>

                <div className="sm:col-span-2">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Summary Product
                  </Typography>
                  <textarea
                    id="description"
                    rows={5}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type summary product"
                    {...register('summary', {
                      required: 'Summary is required!',
                    })}
                  />
                </div>
                <div className="sm:col-span-2 mb-5">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Description Product
                  </Typography>
                  <textarea
                    id="description"
                    rows={5}
                    {...register('description', {
                      required: 'Description is required!',
                    })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type summary product"
                  />
                </div>
              </div>
              <MyButton title="Submit" symbol={undefined} />
            </form>
          </ThemeProvider>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
