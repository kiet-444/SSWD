
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



import apiEndpoints from '../../../components/ApiBook/Book';

import Row from 'react-bootstrap/Row';

const User = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [users, setUsers] = useState([]);

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
                accessorKey: 'memberName',
                header: 'Tên đăng nhập',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.memberName,
                    helperText: validationErrors?.memberName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },
            {
                accessorKey: 'password',
                header: 'Mật khẩu',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.password,
                    helperText: validationErrors?.password,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },
            {
                accessorKey: 'name',
                header: 'Tên người dùng',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
            },
            {
                accessorKey: 'yob',
                header: 'Năm sinh',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.yob,
                    helperText: validationErrors?.yob,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndpoints.getAllUser();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const table = useMaterialReactTable({
        columns,
        data: users,
        getRowId: (row) => row._id,
        muiTableContainerProps: {
            sx: {
                overflowX: 'auto',
                width: '100%',
            },
        },
        initialState: { columnVisibility: { password: false } },

    });
    return (
        <Container fluid>
            <Row>
                <h1 style={{ marginTop: '10px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Quản lý danh sách người dùng</h1>
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

export default User;

