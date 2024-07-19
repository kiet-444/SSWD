
import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import './Book.css';
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
import { bookCoverType, bookLanguage, bookGenres } from './MakeData';
import Row from 'react-bootstrap/Row';

const Book = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [books, setBooks] = useState([]);


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
                accessorKey: 'ISBN',
                header: 'ISBN',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.ISBN,
                    helperText: validationErrors?.ISBN,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            ISBN: undefined,
                        }),
                    // readOnly: true,

                },
            },
            {
                accessorKey: 'title',
                header: 'Tiêu đề',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.title,
                    helperText: validationErrors?.title,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },

            {
                accessorKey: 'coverLink',
                header: 'Bìa sách',
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
                            src={row.original.coverLink}
                            loading="lazy"
                            style={{ borderRadius: '5px' }}
                        />

                    </Box>
                ),
            },
            {
                accessorKey: 'authorName',
                header: 'Tên tác giả',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.authorName,
                    helperText: validationErrors?.authorName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            authorName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'publisher',
                header: 'Nhà xuất bản',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.publisher,
                    helperText: validationErrors?.publisher,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            publisher: undefined,
                        }),
                },
            },
            {
                accessorKey: 'publishDate',
                header: 'Năm xuất bản',
                muiEditTextFieldProps: {
                    type: 'number',
                    required: true,
                    error: !!validationErrors?.publishDate,
                    helperText: validationErrors?.publishDate,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            publishDate: undefined,
                        }),
                },
            },
            {
                accessorKey: 'coverType',
                header: 'Loại bìa',
                editVariant: 'select',
                editSelectOptions: bookCoverType,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.coverType,
                    helperText: validationErrors?.coverType,
                },
            },
            {
                accessorKey: 'language',
                header: 'Ngôn ngữ',
                editVariant: 'select',
                editSelectOptions: bookLanguage,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.language,
                    helperText: validationErrors?.language,
                },
            },
            {
                accessorKey: 'noPages',
                header: 'Số trang',
                muiEditTextFieldProps: {
                    type: 'number',
                    required: true,
                    error: !!validationErrors?.noPages,
                    helperText: validationErrors?.noPages,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            noPages: undefined,
                        }),
                },
            },
            {
                accessorKey: 'genres',
                header: 'Thể loại sách',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.genres,
                    helperText: validationErrors?.genres,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            genres: undefined,
                        }),
                },
            },
            {
                accessorKey: 'copyNumber',
                header: 'Số bản sao',
                muiEditTextFieldProps: {
                    type: 'number',
                    required: true,
                    error: !!validationErrors?.copyNumber,
                    helperText: validationErrors?.copyNumber,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            copyNumber: undefined,
                        }),
                },
            },
            {
                accessorKey: 'desc',
                header: 'Mô tả',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,

                    error: !!validationErrors?.desc,
                    helperText: validationErrors?.desc,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            desc: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
    );

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const validateRequired = (value) => {
        return value !== undefined && value !== null && !!value.length;
    };
    const validateBook = (book) => {
        return {
            ISBN: !validateRequired(book.ISBN)
                ? 'Vui lòng nhập ISBN'
                : '',
            title: !validateRequired(book.title) ? 'Vui lòng nhập tiêu đề' : '',
            desc: !validateRequired(book.desc) ? 'Vui lòng nhập mô tả' : '',
            authorName: !validateRequired(book.authorName) ? 'Vui lòng nhập tên tác giả' : '',
            publishDate: !validateRequired(book.publishDate) ? 'Vui lòng nhập năm xuất bản' : '',
            publisher: !validateRequired(book.publisher) ? 'Vui lòng nhập nhà xuất bản' : '',
            coverType: !validateRequired(book.coverType) ? 'Vui lòng chọn loại bìa' : '',
            language: !validateRequired(book.language) ? 'Vui lòng chọn loại ngôn ngữ' : '',
            noPages: !validateRequired(book.noPages) ? 'Vui lòng nhập số trang' : '',
            // genres: !validateRequired(book.genres) ? 'Vui lòng nhập thể loại sách' : '',
            copyNumber: !validateRequired(book.copyNumber) ? 'Vui lòng nhập số lượng bản sao' : '',

        };
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndpoints.getAllBook();
                const sortedBooks = data.sort((a, b) => {
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                });
                setBooks(sortedBooks);
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
            setBooks(updatedData);
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
            setBooks(updatedData);
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
                setBooks(updatedData);
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

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(books);
        download(csvConfig)(csv);
    };

    const table = useMaterialReactTable({
        onCreatingRowCancel: () => {
            setValidationErrors({});
            setChooseImage(false);
            setSelectedGenres([]);
            setShowRequiredImage(false);
            setShowRequiredGenres(false);
        },
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => {
            setValidationErrors({});
            setChooseImage(false);
            setSelectedGenres([]);
            setShowRequiredImage(false);
            setShowRequiredGenres(false);
        },
        onEditingRowSave: handleSaveUser,
        columns,
        data: books,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row.ISBN,
        initialState: { columnVisibility: { publishDate: false, language: false, genres: false, coverType: false, desc: false, noPages: false } },
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

                <Button
                    variant="contained"
                    sx={{ marginBottom: '16px' }}
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Data
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
                    <Grid container>
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
                    </Grid>
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
                    <Grid container>
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
                    </Grid>
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

export default Book;

