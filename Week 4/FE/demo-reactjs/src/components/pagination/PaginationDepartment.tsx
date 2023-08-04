import React from "react";
import { Pagination } from "@mantine/core";

interface DepartmentsState {
  content: Department[]; 
  totalPages: number;
}


interface Department {
  id: number;
  name: string;
  createDate: string;
}


interface PaginationDepartmentProps {
  departments: DepartmentsState;
  selectedPage: number;
  handlePageClick: (pageIndex: number) => void;
}
const PaginationDepartment: React.FC<PaginationDepartmentProps> = ({
  departments,
  selectedPage,
  handlePageClick,
}) => {
  return (
    <div>
      <Pagination 
      className="mt-[-30px] mb-[40px]"
        total={departments.totalPages} 
        value={selectedPage + 1} 
        onChange={(newPage) => handlePageClick(newPage - 1)} 
      />
    </div>
  );
};

export default PaginationDepartment;
