import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import UserModal from './modals/UserModal';

const Container = styled.div`
    background-color: #1c72e7;
    height: 10vh;
    border-width: 0 0 2px 0;
    border-color: #f5f5f5;
    border-style: solid;
    display: flex;
    min-height: 80px;
    align-items: center;
`;

const PefilIcon = styled.div`
    margin-right: 5px;
    &:hover {
        cursor: pointer;
    }
`;

const Username = styled.div`
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
    margin-right: 8px;
`;

const Options = styled.div`
    margin-left: auto;
    display: flex;
`;

export default function Navbar() {
    const [username, setUsername] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        const cookie = new Cookies();
        const username = cookie.get('Username');
        setUsername(username);
    }, []);

    return (
        <Container>
            <Options>
                <Username>
                    <Typography>{username}</Typography>
                </Username>
                <PefilIcon onClick={openModal}>
                    <AccountCircle
                        sx={{
                            fontSize: '60px',
                            color: '#1c72e7',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                        }}
                    />
                </PefilIcon>
            </Options>
            <UserModal op={isOpenModal} handleClose={closeModal} />
        </Container>
    );
}
