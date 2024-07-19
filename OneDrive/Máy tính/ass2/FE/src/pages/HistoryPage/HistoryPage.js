
import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import Container from 'react-bootstrap/Container';

import axios from 'axios';
import Row from 'react-bootstrap/Row';

const HistoryPage = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [historyData, setHistoryData] = useState([]);

    const columns = useMemo(
        () => [
            // {
            //     accessorKey: 'ISBN',
            //     header: 'ISBN',
            //     muiEditTextFieldProps: {
            //         type: 'text',
            //         required: true,
            //         error: !!validationErrors?.ISBN,
            //         helperText: validationErrors?.ISBN,
            //         onFocus: () =>
            //             setValidationErrors({
            //                 ...validationErrors,
            //                 ISBN: undefined,
            //             }),
            //         // readOnly: true,

            //     },
            // },
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
                accessorKey: 'registerDate',
                header: 'Ngày đăng kí mượn',
                muiEditTextFieldProps: {
                    type: 'date',
                    required: true,
                    error: !!validationErrors?.registerDate,
                    helperText: validationErrors?.registerDate,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            registerDate: undefined,
                        }),
                },
            },
            {
                accessorKey: 'borrowDate',
                header: 'Ngày nhận sách',
                muiEditTextFieldProps: {
                    type: 'date',
                    required: true,
                    error: !!validationErrors?.borrowDate,
                    helperText: validationErrors?.borrowDate,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            borrowDate: undefined,
                        }),
                },
            },
            {
                accessorKey: 'givebackDate',
                header: 'Ngày trả sách',
                muiEditTextFieldProps: {
                    type: 'date',
                    required: true,
                    error: !!validationErrors?.givebackDate,
                    helperText: validationErrors?.givebackDate,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            givebackDate: undefined,
                        }),
                },
            },

            {
                accessorKey: 'status',
                header: 'Trạng thái',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,

                    error: !!validationErrors?.status,
                    helperText: validationErrors?.status,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            status: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("token");
                const userID = localStorage.getItem("userID");
                console.log("User ID: ", userID);
                const data = await axios.get(`http://localhost:3001/borrow/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log(data.data);
                setHistoryData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: historyData,
        getRowId: (row) => row.title,
        initialState: { columnVisibility: { publishDate: false, language: false, genres: false, coverType: false, desc: false, noPages: false } },
        muiTableContainerProps: {
            sx: {
                overflowX: 'auto',
                width: '100%',
            },
        }
    });
    return (
        <Container fluid className='p-40' >
            <Row>
                <h1 style={{ marginTop: '50px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Lịch sử mượn, trả sách</h1>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Container>
                    <div style={{
                        overflowX: 'auto',
                        width: '100%',
                        padding: '16px',
                        minWidth: '320px', // Set a minimum width if needed
                    }} >
                        <MaterialReactTable style={{ minWidth: '1000px' }} table={table} />
                    </div>
                </Container>

            </Row>


        </Container>

    );
};

export default HistoryPage;

