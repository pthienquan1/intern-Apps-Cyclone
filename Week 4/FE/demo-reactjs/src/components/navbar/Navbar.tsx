import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const [activeTab, setActiveTab] = useState<"first" | "second">("first");

  const navigate = useNavigate();
  const handleNavigateManageDepartments = () => {
    navigate("/departments");
    setActiveTab('first');
  };
  const handleNavigateManageAccounts = () => {
    navigate("/accounts");
    setActiveTab('second');
  };
  const { t } = useTranslation(); 
  return (
    <div>
      <Tabs defaultValue="first">
        <Tabs.List grow position="center">
          <Tabs.Tab
            className="text-[20px] text-center" 
            value="first"
            onClick={handleNavigateManageDepartments}
            
          >
            {t("ManageDepartments")}
          </Tabs.Tab>
          <Tabs.Tab
            className="text-[20px] text-center"
            value="second"
            onClick={handleNavigateManageAccounts}
          >
           {t("ManageAccounts")}
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default Navbar;
