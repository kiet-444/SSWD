
import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Brand from './Brand'


const ListPageBrand = () => {
    return (
        <Container fluid className='p-0'>
            <div className='d-flex'>
                <div className='h-auto' style={{ position: 'static' }}>
                    <Sidebar />
                </div>
                <div style={{ flex: '1', overflowX: 'hidden' }}>
                    <Container className='m-2'>
                        <Row >
                            <Col xs={12} sm={12} >
                                <Brand />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Container>

    )
}

export default ListPageBrand;
