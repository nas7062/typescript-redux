
import React from "react";
import styled from "styled-components";
import { NotiProps } from "../pages/Notice";

const Table = styled.table`
  width: 1000px;
  margin: 10px auto;
  border-collapse: collapse;
  text-align: center;

  
`;

const Thead = styled.thead`
  background-color: #f5f5f5;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const Th = styled.th`
  padding: 5px;
`;

const Td = styled.td`
  padding: 10px;
  width:100px;
`;

const Noti:React.FC<NotiProps> = ({id,img,title,name,descript}) =>{

    return(
        <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <tbody>
          <Tr>
            <Td>{id}</Td>
            <Td>{title}</Td>
            <Td>{name}</Td>
          </Tr>
        </tbody>
      </Table>
        );
}

export default Noti;