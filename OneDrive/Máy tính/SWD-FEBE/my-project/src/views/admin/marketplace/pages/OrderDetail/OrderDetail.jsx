import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'api/axios';
import TableOrder from 'components/atom/TableOrder/TableOrder';
import useAuth from 'hook/useAuth';
import BackButton from 'components/atom/BackButton/BackButton';
export default function OrderDetail({ label }) {
    const { updateId } = useParams();
    const token = useAuth();
    const headers = { Authorization: `Bearer ${token}` };
    const [info, setInfo] = useState({});

    const fetchApiId = async () => {
        const endpoint = label.toLowerCase();
        try {
            const response = await axios.get(`${endpoint}/${updateId}`, { headers });
            console.log(response.data);
        
                setInfo(response?.data?.order);
            
        } catch (error) {
            console.error(`Failed to fetch ${label} details`, error);
        }
    };

    useEffect(() => {
        if (updateId) {
            fetchApiId();
        }
    }, [updateId]);
    
    return (
        <div>
            <div className='my-5 ml-2'>
            <BackButton/>
            </div>
            <TableOrder data={info} />
        </div>
    );
}
