import styled from 'styled-components';

export const DivDashboard = styled.div`
    background-color: rgb(255, 255, 255);
    margin-top: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(196, 194, 194);
    height: 100%;
    margin-bottom: -7px;
    display: flex;
    flex-direction: column;
`;

export const ContentCenter = styled(DivDashboard)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AddHistory = styled(ContentCenter)`
    &:hover {
        background-color: #4eea3e;
        cursor: pointer;
    }
`;
