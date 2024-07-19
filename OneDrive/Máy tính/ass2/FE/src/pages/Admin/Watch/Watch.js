
import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import Container from 'react-bootstrap/Container';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Grid

} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import apiEndpoints from './../../../components/ApiBook/Book'; // Assuming you store your hooks in an 'api.js' file
import { automaticData } from './MakeData';
import Row from 'react-bootstrap/Row';

const Watch = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [watches, setWatches] = useState([]);
    const [brand, setBrand] = useState([]);


    const [newCoverLink, setNewCoverLink] = useState('');
    const [chooseImage, setChooseImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showRequiredImage, setShowRequiredImage] = useState(false);
    const [showRequiredGenres, setShowRequiredGenres] = useState(false);


    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreChange = (selectedGenre) => {
        setShowRequiredGenres(false);
        setSelectedGenres((prevGenres) => {
            const genreName = selectedGenre.name;

            if (prevGenres.includes(genreName)) {
                return prevGenres.filter((name) => name !== genreName);
            } else {
                return [...prevGenres, genreName];
            }
        });
    };

    const fileInputRef = useRef(null);

    const columns = useMemo(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?._id,
                    helperText: validationErrors?._id,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            _id: undefined,
                        }),
                    readOnly: true,

                },
            },
            {
                accessorKey: 'watchName',
                header: 'Tên đồng hồ',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.watchName,
                    helperText: validationErrors?.watchName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },

            {
                accessorKey: 'image',
                header: 'Hình ảnh',
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="coverLink"
                            height={200}
                            width={125}
                            src={row.original.image}
                            loading="lazy"
                            style={{ borderRadius: '5px' }}
                        />

                    </Box>
                ),
            },
            {
                accessorKey: 'price',
                header: 'Giá',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.price,
                    helperText: validationErrors?.price,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            authorName: undefined,
                        }),
                },
            },

            {
                accessorKey: 'automatic',
                header: 'Loại',
                editVariant: 'select',
                editSelectOptions: automaticData,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.automaticData,
                    helperText: validationErrors?.automaticData,
                },
            },
            {
                accessorKey: 'watchDescription',
                header: 'Mô tả',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.watchDescription,
                    helperText: validationErrors?.watchDescription,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            watchDescription: undefined,
                        }),
                },
            },

            {
                accessorKey: 'brand',
                header: 'Tên cửa hàng',
                editVariant: 'select',
                editSelectOptions: brand,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.brand,
                    helperText: validationErrors?.brand,
                },
            }
        ],
        [validationErrors]
    );

    const validateRequired = (value) => {
        return value !== undefined && value !== null && !!value.length;
    };
    const validateBook = (watch) => {
        return {
            watchName: !validateRequired(watch.watchName) ? 'Vui lòng nhập tên đồng hồ' : '',
            watchDescription: !validateRequired(watch.watchDescription) ? 'Vui lòng nhập mô tả' : '',
            price: !validateRequired(watch.price) ? 'Vui lòng nhập giá' : '',
            image: !validateRequired(watch.image) ? 'Vui lòng chọn ảnh' : '',
            automatic: !validateRequired(watch.automatic) ? 'Vui lòng chọn loại máy' : '',
        };
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndpoints.getAllWatch();
                setWatches(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleCreateUser = async ({ values, table }) => {
        const newValidationErrors = validateBook(values);
        if (!selectedImage) {
            setShowRequiredImage(true);
        }
        if (!selectedGenres || selectedGenres.length === 0) {
            setShowRequiredGenres(true);
        } else {
            setShowRequiredGenres(false);
        }
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }

        setValidationErrors({});
        try {
            console.log('values:', values);
            console.log("Genres:", selectedGenres);
            await apiEndpoints.insertBook(values, selectedImage, selectedGenres);

            table.setCreatingRow(null);
            setChooseImage(false);
            setSelectedImage(null);
            setSelectedGenres([]);
            const updatedData = await apiEndpoints.getAllBook();
            // setBooks(updatedData);
            window.alert('Đăng kí sách mới thành công');
        } catch (error) {
            console.error('Error creating customer:', error);
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
            }
        }
    };

    const handleEditUser = ({ table, row }) => {
        // Split the genres string into an array
        const existingGenres = row.original.genres ? row.original.genres.split(',') : [];
        const genresWithoutSpaces = existingGenres.map(genre => genre.trim());
        // console.log("Existing Genres:", genresWithoutSpaces);
        // Set the initial state of selectedGenres
        setSelectedGenres(genresWithoutSpaces);

        // Open the edit dialog

        table.setEditingRow(row);
    };
    const handleSaveUser = async ({ values, table }) => {

        setValidationErrors({});
        try {


            console.log('values:', values);
            console.log("Genres:", selectedGenres);

            await apiEndpoints.updateBook(values, selectedImage, selectedGenres);
            table.setCreatingRow(null);
            setSelectedImage(null);
            setChooseImage(false);
            setSelectedGenres([]);
            const updatedData = await apiEndpoints.getAllBook();
            // setBooks(updatedData);
            window.alert('Cập nhật thông tin sách thành công');
            table.setEditingRow(null);
            setSelectedImage(null);
            setChooseImage(false);
        } catch (error) {
            console.error('Error creating customer:', error);
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
            }
        }
    };

    const openDeleteConfirmModal = async (row) => {
        try {
            if (window.confirm('Bạn có chắc chắn xóa sách này ?')) {
                await apiEndpoints.deleteBook(row.id);
                const updatedData = await apiEndpoints.getAllBook();
                // setBooks(updatedData);
                window.alert('Xóa sách thành công');
            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected Image:', file);

        if (file instanceof File) {
            setSelectedImage(file);
            setChooseImage(true);
            setShowRequiredImage(false);
            setNewCoverLink(URL.createObjectURL(file));
        } else {
            console.error('Invalid file format or no file selected.');
        }
    };


    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
    };

    const table = useMaterialReactTable({
        onCreatingRowCancel: () => {
            // setValidationErrors({});
            // setChooseImage(false);
            // setSelectedGenres([]);
            // setShowRequiredImage(false);
            // setShowRequiredGenres(false);
        },
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => {
            // setValidationErrors({});
            // setChooseImage(false);
            // setSelectedGenres([]);
            // setShowRequiredImage(false);
            // setShowRequiredGenres(false);
        },
        onEditingRowSave: handleSaveUser,
        columns,
        data: watches,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row._id,
        initialState: { columnVisibility: { _id: false } },
        muiTableContainerProps: {
            sx: {
                overflowX: 'auto',
                width: '100%',
            },
        },

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditUser({ row, table })}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">

                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => {
                        table.setCreatingRow(true);
                    }}
                    sx={{ marginBottom: '16px' }}
                >
                    Thêm sách mới vào thư viện
                </Button>

            </Box>



        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h5" style={{ textAlign: 'center' }}>Thêm sách vào thư viện</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {internalEditComponents.slice(0, 2)}
                    <div className={`coverlink ${showRequiredImage ? 'required' : ''}`} >Bìa sách</div>

                    <div
                        style={{
                            width: '150px',
                            height: '200px',
                            border: '1px solid #ccc',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onClick={handleChooseFileClick}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}

                        />
                        {chooseImage ? (
                            <img
                                src={newCoverLink}
                                alt="coverLink"
                                style={{ width: '100%', height: '100%' }}
                            // thumbnail
                            />
                        ) : (
                            <Button variant="outlined" size="small" style={{ margin: '80px 18px' }}>
                                Choose File
                            </Button>
                        )}

                    </div>

                    {showRequiredImage && <div style={{ color: '#d32f2f' }}> Vui lòng chọn bìa sách </div>}
                    {internalEditComponents.slice(3, 9)}
                    <div className={`coverlink ${showRequiredGenres ? 'required' : ''}`} >Thể loại sách</div>
                    {/* <Grid container>
                        {bookGenres.map((genre, index) => (
                            <Grid item xs={4} key={genre.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGenres.includes(genre.name)}
                                            onChange={() => handleGenreChange(genre)}
                                        />
                                    }
                                    label={genre.name}
                                />
                            </Grid>
                        ))}
                    </Grid> */}
                    {showRequiredGenres && <div style={{ color: '#d32f2f' }}> Vui lòng thể loại sách </div>}
                    {internalEditComponents.slice(10)}

                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row}
                    />
                </DialogActions>
            </>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h5" style={{ textAlign: 'center' }}>Chỉnh sửa thông tin sách</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '1rem' }}>
                    {internalEditComponents.slice(1, 2)}
                    <div className='coverlink'>Bìa sách</div>
                    <div
                        style={{
                            width: '150px',
                            height: '200px',
                            border: '1px solid #ccc',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}
                        />

                        {chooseImage ? (
                            <img
                                src={newCoverLink}
                                alt="coverLink"
                                style={{ width: '100%', height: '100%' }}

                            />
                        ) : (
                            <img
                                src={row.original.coverLink}
                                alt="coverLink"
                                style={{ width: '100%', height: '100%' }}
                            // thumbnail
                            />
                        )}

                    </div>

                    {internalEditComponents.slice(3, 9)}
                    <div className={`coverlink ${showRequiredGenres ? 'required' : ''}`} >Thể loại sách</div>
                    {/* <Grid container>
                        {bookGenres.map((genre, index) => (
                            <Grid item xs={4} key={genre.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGenres.includes(genre.name)}
                                            onChange={() => handleGenreChange(genre)}
                                        />
                                    }
                                    label={genre.name}
                                />
                            </Grid>
                        ))}
                    </Grid> */}
                    {showRequiredGenres && <div style={{ color: '#d32f2f' }}> Vui lòng thể loại sách </div>}
                    {internalEditComponents.slice(10)}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),

    });
    return (
        <Container fluid>
            <Row>
                <h1 style={{ marginTop: '10px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Quản lý sách của thư viện</h1>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <div style={{
                    overflowX: 'auto',
                    width: '100%',
                    padding: '16px',
                    minWidth: '320px', // Set a minimum width if needed
                }} >
                    <MaterialReactTable style={{ minWidth: '1000px' }} table={table} />
                </div>
            </Row>


        </Container>

    );
};

export default Watch;

