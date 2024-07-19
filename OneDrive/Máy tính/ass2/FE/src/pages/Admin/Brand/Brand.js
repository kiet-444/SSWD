
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



import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import apiEndpoints from '../../../components/ApiBook/Book';

import Row from 'react-bootstrap/Row';

const Brand = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [brands, setBrands] = useState([]);

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
                            ISBN: undefined,
                        }),
                    readOnly: true,

                },
            },
            {
                accessorKey: 'brandName',
                header: 'Tên thương hiệu',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.brandName,
                    helperText: validationErrors?.brandName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
    );

    const validateRequired = (value) => {
        return value !== undefined && value !== null && !!value.length;
    };
    const validateBrand = (brand) => {
        return {
            brandName: !validateRequired(brand.brandName) ? 'Vui lòng nhập tên thương hiệu' : '',
        };
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndpoints.getAllBrand();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleCreateUser = async ({ values, table }) => {
        const newValidationErrors = validateBrand(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        try {
            await apiEndpoints.createBrand(values);
            table.setCreatingRow(null);
            const updatedData = await apiEndpoints.getAllBrand();
            setBrands(updatedData);
            window.alert('Thêm thương hiệu thành công');
        } catch (error) {
            console.error('Error creating brand:', error);
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
            }
        }
    };

    const handleEditUser = ({ table, row }) => {
        table.setEditingRow(row);
    };
    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateBrand(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        try {
            await apiEndpoints.updateBrand(values)
            table.setCreatingRow(null);
            const updatedData = await apiEndpoints.getAllBrand();
            setBrands(updatedData);
            window.alert('Cập nhật tên thương hiệu thành công');
            table.setEditingRow(null);

        } catch (error) {
            console.error('Error creating customer:', error);
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
            }
        }
    };

    const openDeleteConfirmModal = async (row) => {
        try {
            if (window.confirm('Bạn có chắc chắn xóa thương hiệu ?')) {
                const req = await apiEndpoints.deleteBrand(row.id);
                if (req.status === 201) {
                    window.alert('Không thể xóa thương hiệu');
                } else {
                    const updatedData = await apiEndpoints.getAllBrand();
                    window.alert('Xóa thương hiệu thành công');
                    setBrands(updatedData)
                }

            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const table = useMaterialReactTable({
        onCreatingRowCancel: () => {
            setValidationErrors({});
        },
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => {
            setValidationErrors({});
        },
        onEditingRowSave: handleSaveUser,
        columns,
        data: brands,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row._id,
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
                    Thêm thương hiệu mới
                </Button>
            </Box>



        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h5" style={{ textAlign: 'center' }}>Thêm thương hiệu</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {internalEditComponents.slice(1)}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row}
                    />
                </DialogActions>
            </>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h5" style={{ textAlign: 'center' }}>Chỉnh sửa tên thương hiệu</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '1rem' }}>
                    {internalEditComponents.slice(1)}
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
                <h1 style={{ marginTop: '10px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Quản lý danh sách thương hiệu</h1>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <div style={{
                    overflowX: 'auto',
                    width: '100%',
                    padding: '16px',
                    minWidth: '320px',
                }} >
                    <MaterialReactTable style={{ minWidth: '1000px' }} table={table} />
                </div>
            </Row>


        </Container>

    );
};

export default Brand;

