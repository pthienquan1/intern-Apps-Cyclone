import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationDepartment from "../components/pagination/PaginationDepartment";
import Search from "../components/search/Search";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group } from "@mantine/core";
import { Modal, TextInput } from "@mantine/core";
import SuccessPopup from "../components/popup-success/SuccessPopup";
import ModalCreatUpdate from "../components/modal/ModalCreatUpdate";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/language/ChangeLanguage";
import i18n from "../i18n";

// sm:640px;
// md:768px;
// lg:1024px;
// xl:1280px;
interface Department {
  id: number;
  name: string;

  createDate: string;
}

interface DepartmentsState {
  content: Department[];
  totalPages: number;
}

interface FormCreateState {
  name: string;
}

interface DepartmentFormUpdate {
  name: string;
}

const url = "http://localhost:8080/api/v1/departments";

const Department = () => {
  const [departments, setDepartments] = useState<DepartmentsState>({
    content: [],
    totalPages: 0,
  });

  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [formCreate, setFormCreate] = useState<FormCreateState>({
    name: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<{
    [id: number]: boolean;
  }>({});
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [isUpdateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
  const [showSuccessPopupUpdate, setShowSuccessPopupUpdate] =
    useState<boolean>(false);
  const [showSuccessPopUpCreate, setShowSuccessPopupCreate] =
    useState<boolean>(false);
  const [showSuccessPopUpDelete, setShowCSuccessPopupDelete] =
    useState<boolean>(false);


  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (
    pageNumber: number = 0,
    pageSize: number = 6,
    search: string = ""
  ) => {
    try {
      const encodedSearch = encodeURIComponent(search);
      const response = await axios.get(
        url +
          `?page=${pageNumber}&size=${pageSize}&search=${encodedSearch}&sort=createDate,desc`
      );
      const newData: DepartmentsState = response.data;
      setDepartments({
        content: newData.content,
        totalPages: newData.totalPages,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    fetchData(0, 6, search);
    if (search === "") {
      alert(t("AlertError"));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormCreate({ ...formCreate, [name]: value });
  };

  // const showSuccessPopup = () => {
  //   setShowSuccessPopupCreate(true);

  //   setTimeout(() => {
  //     setShowSuccessPopupCreate(false);
  //   }, 3000);
  // };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formCreate.name.trim() === "") {
      alert("Vui lòng nhập tên Department trước khi tạo!");
      return;
    }

    try {
      const response = await axios.post(url, formCreate);
      const data = response.data;

      console.log("Create department success:", data);

      setDepartments({
        ...departments,
        content: [...departments.content, data],
      });
      setFormCreate({
        name: "",
      });

      setShowSuccessPopupCreate(true);

      close();
      fetchData();
      handleSuccessAction();

      setTimeout(() => {
        setShowSuccessPopupCreate(false);
      }, 3000);
    } catch (error) {
      console.error("Create department failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        fetchData();

        setShowConfirmPopup((prevState) => ({ ...prevState, [id]: false }));

        setDepartments((prevState) => ({
          ...prevState,
          content: prevState.content.filter(
            (department) => department.id !== id
          ),
        }));
        setShowCSuccessPopupDelete(true);

        setTimeout(() => {
          setShowCSuccessPopupDelete(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  const updateDepartment = async (
    id: number,
    formUpdate: DepartmentFormUpdate
  ) => {
    try {
      await axios.put(`${url}/${id}`, formUpdate);

      setDepartments((prevState) => ({
        ...prevState,
        content: prevState.content.map((department) =>
          department.id === id ? { ...department, ...formUpdate } : department
        ),
      }));

      // Đóng form update
      setUpdateFormOpen(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const handleUpdateClick = async (department: Department) => {
    setEditingDepartment(department);
    setUpdateFormOpen(true);
    setShowSuccessPopupUpdate(false);
  };
  const handleUpdateSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!editingDepartment) return;
    const formUpdate: DepartmentFormUpdate = {
      name: editingDepartment.name,
    };
    await updateDepartment(editingDepartment.id, formUpdate);

   
    setUpdateFormOpen(false);
    setEditingDepartment(null);
    setShowSuccessPopupUpdate(true);
    setTimeout(() => {
      setShowSuccessPopupUpdate(false);
    }, 3000);
  };

  const handleSuccessAction = () => {
    setSelectedPage(0);
  };

  const handlePageClick = (pageIndex: number) => {
    fetchData(pageIndex, 6, search);
    setSelectedPage(pageIndex);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <ChangeLanguage handleLanguageChange={handleLanguageChange} />
        <Search
          search={search}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchChange={handleSearchChange}
        />

        {/* <Modal
          opened={opened}
          onClose={close}
          title="CREATE DEPARTMENT"
          size={500}
          padding={40}
          centered
        >
          <div>
            <form onSubmit={handleSubmit}>
              <TextInput
                placeholder="Department name"
                label="Department Name"
                value={formCreate.name}
                onChange={handleInputChange}
                id="name"
                name="name"
                size="md"
                withAsterisk
              />
              <button
                className="mt-3 bg-[#36c6ee] rounded-md py-[8px] px-[9px] text-[#fff] font-bold w-[100%] hover:opacity-50"
                type="submit"
              >
                Create Department
              </button>
            </form>
          </div>
        </Modal> */}

        <ModalCreatUpdate
          opened={opened}
          title={t("CreateDepartment")}
          onClose={close}
          onSubmit={handleSubmit}
          value={formCreate.name}
          onChange={handleInputChange}
          placeholder={t("DepartmentName")}
          label={t("DepartmentName")}
          id="name"
          name="name"
          typeButton={t("CreateDepartment")}
        />

        <Group position="center">
          <Button className="bg-[#36c6ee] mt-16" onClick={open}>
            {t("TextBtnCreate")}
          </Button>
        </Group>

        <div className="w-[60%]  flex justify-center gap-5 flex-wrap mt-2 mb-12 p-5  border-black rounded-[10px] ">
          {departments.content.map((department) => (
            <div
              key={department.id}
              className="border-[#f7c29e] border-[3px] bg-[#fdf2d0] rounded-[10px] p-5 w-full  md:w-[45%] lg:w-[31%] "
            >
              <h2 className="font-bold text-[#4face5] text-[23px]">
                {department.name}
              </h2>

              <p className="text-[17px]">
                {t("CreatedDate")} {department.createDate}
              </p>
              <button
                className="bg-[#ff494c] rounded-md py-[8px] px-[9px] mt-[10px] text-[#fff] font-bold w-[100%] hover:opacity-50
                
                sm:w-[45%] lg:w-[45%] "
                onClick={() =>
                  setShowConfirmPopup((prevState) => ({
                    ...prevState,
                    [department.id]: true,
                  }))
                }
              >
                {t("Delete")}
              </button>
              <button
                className="bg-[#8ce031] rounded-md py-[8px] px-[9px] mt-[10px] text-[#fff] font-bold w-[100%] hover:opacity-50
                sm:w-[45%] sm:ml-[10px] lg:w-[45%] lg:ml-[20px]"
                onClick={() => handleUpdateClick(department)}
              >
                {t("Update")}
              </button>

              {editingDepartment && (
                // <ModalCreatUpdate

                //   opened={isUpdateFormOpen}
                //   onClose={() => setUpdateFormOpen(false)}
                //   title="UPDATE DEPARTMENT"
                //   onSubmit={handleUpdateSubmit}
                //   placeholder="Department name"
                //   label="Department Name"
                //   value={editingDepartment.name}
                //   onChange={(e) =>
                //     setEditingDepartment({
                //       ...editingDepartment,
                //       name: e.currentTarget.value,
                //     })
                //   }
                //   id="name"
                //   name="name"
                //   typeButton="Update Department"

                // />

                <Modal
                  styles={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.05)", 
                      backdropFilter: "blur(0.05px)",
                    },
                  }}
                  opened={isUpdateFormOpen}
                  onClose={() => setUpdateFormOpen(false)}
                  title="UPDATE DEPARTMENT"
                  size={500}
                  padding={40}
                  centered
                >
                  <div>
                    <form onSubmit={handleUpdateSubmit}>
                      <TextInput
                        placeholder="Department name"
                        label="Department Name"
                        value={editingDepartment.name}
                        onChange={(e) =>
                          setEditingDepartment({
                            ...editingDepartment,
                            name: e.currentTarget.value,
                          })
                        }
                        id="name"
                        name="name"
                        size="md"
                        withAsterisk
                      />
                      <button
                        className="mt-3 bg-[#36c6ee] rounded-md py-[8px] px-[9px] text-[#fff] font-bold w-[100%] hover:opacity-50"
                        type="submit"
                      >
                        Update Department
                      </button>
                    </form>
                  </div>
                </Modal>
              )}

              {showConfirmPopup[department.id] && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-white rounded-md p-6 border-2 border-red-500">
                    <p>{t("ConfirmDelete")}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                        onClick={() =>
                          setShowConfirmPopup((prevState) => ({
                            ...prevState,
                            [department.id]: false,
                          }))
                        }
                      >
                        Hủy
                      </button>
                      <button
                        className="px-4 py-2 bg-[#ff494c] text-white rounded-md"
                        onClick={() => handleDelete(department.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {showSuccessPopupUpdate && (
          <SuccessPopup message={t("UpdateSuccess")} />
        )}
        {showSuccessPopUpCreate && (
          <SuccessPopup message={t("CreateSuccess")} />
        )}
        {showSuccessPopUpDelete && (
          <SuccessPopup message={t("DeleteSuccess")} />
        )}
        <PaginationDepartment
          departments={departments}
          selectedPage={selectedPage}
          handlePageClick={handlePageClick}
        />
      </div>
    </>
  );
};

export default Department;
