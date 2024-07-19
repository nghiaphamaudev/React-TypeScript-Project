import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import themeTextField from 'src/config/themeInput';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import { Products } from 'src/types/products';

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

//type khi đảy lên server
type AddProductParams = {
  _id: string | null;
  name: string;
  price: number;
  priceDiscount: number;
  version: number;
  coverImg: File | null | string;
  images: File[] | [string];
  summary: string;
  description: string;
  category: string;
};
// props
type AddProductProps = {
  initialData?: Products;
  mode: 'create' | 'update';
};

const AddProduct: React.FC<AddProductProps> = ({ initialData, mode }) => {
  //call Category
  const [categories, setCategories] = useState<Category[]>([]);
  //su dung snackbar va loading context
  const { showSnackbar } = useSnackbar();
  const { showLoading, hideLoading } = useLinearLoading();
  //dki form va default value khi update
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddProductParams>({
    defaultValues: {
      ...initialData, // Sao chép toàn bộ initialData vào defaultValues
      category: initialData?.category?._id || '', // Chỉ lấy _id của category
    },
  });
  // laay ra all category
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

  //khi submit se set cac gia tri de day len server
  const onSubmit: SubmitHandler<AddProductParams> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('priceDiscount', data.priceDiscount.toString());
    formData.append('version', data.version.toString());
    if (data.coverImg) {
      formData.append('coverImg', data.coverImg);
    } else {
      showSnackbar('error', 'You must choose a cover image before submit.');
      return;
    }
    formData.append('summary', data.summary);
    formData.append('description', data.description);
    formData.append('category', data.category);
    console.log(data.category);
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      showSnackbar('error', 'You must choose a image before submit.');
      return;
    }

    try {
      if (mode === 'create') {
        await axiosInstance.post('/laptops', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showSnackbar('success', 'Add product is successfully!');
      } else {
        await axiosInstance.patch(`/laptops/${initialData?._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showSnackbar('success', 'Update product is successfully!');
      }

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      console.log(error);
      showSnackbar('error', error.response.data.message);
    }
  };
  // khi nhan day imgae bien images se chua toan bo images object
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      if (filesArray.length === 0) {
        showSnackbar('error', 'You must choose a photo before submit!');
      } else if (filesArray.length > 2) {
        showSnackbar('error', 'You can only upload a maximum of 2 photos.');
      } else {
        setValue('images', filesArray);
      }
    } else {
      showSnackbar('error', 'You must choose a photo before submit!');
    }
  };

  // chua coverimg
  const handleCoverImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      showSnackbar('error', 'You must choose a cover image before submit.');
    } else {
      setValue('coverImg', selectedFile);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 overflow-auto h-screen w-full">
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
                      defaultValue={initialData?.category?._id || ''}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
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
                    type={'number'}
                    sx={{ border: 'none' }}
                    {...register('price', {
                      required: 'Price product is required!',
                      min: {
                        value: 0,
                        message: 'Price discount must be non-negative',
                      },
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
                    type={'number'}
                    sx={{ border: 'none' }}
                    {...register('priceDiscount', {
                      required: 'Price discount product is required!',
                      min: {
                        value: 0,
                        message: 'Price discount must be non-negative',
                      },
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
                      min: 0,
                    })}
                    error={!!errors?.version?.message}
                    helperText={errors?.version?.message}
                    placeholder="Type version product"
                    fullWidth
                  />
                </div>
                <div>
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Memory SSD
                  </Typography>
                  <TextField
                    // sx={{ border: 'none' }}
                    // {...register('memory', {
                    //   required: 'Memory product is required!',
                    //   min: 0,
                    // })}
                    // error={!!errors?.memory?.message}
                    // helperText={errors?.memory?.message}
                    placeholder="Type memory product"
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
                        component="span"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                      </Button>
                    </label>
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={handleCoverImgChange}
                    />
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
                  </Box>
                </div>

                <div className="sm:col-span-2">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Summary Product
                  </Typography>
                  <div>
                    <TextField
                      id="description"
                      label="Type summary product"
                      multiline
                      rows={5}
                      variant="outlined"
                      sx={{ border: 'none' }}
                      fullWidth
                      {...register('summary', {
                        required: 'Summary is required!',
                      })}
                      error={!!errors?.summary?.message}
                      helperText={errors?.summary?.message}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 mb-5">
                  <Typography gutterBottom sx={{ fontSize: '15px' }}>
                    Description Product
                  </Typography>
                  <TextField
                    id="description"
                    label="Type description product"
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{ border: 'none' }}
                    fullWidth
                    {...register('description', {
                      required: 'Description is required!',
                    })}
                    error={!!errors?.description?.message}
                    helperText={errors?.description?.message}
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
