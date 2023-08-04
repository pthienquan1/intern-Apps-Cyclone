import React,{useState} from "react";

interface ChangeLanguageProps {
    handleLanguageChange: (lang: string) => void; 
  }

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({
  handleLanguageChange,
}) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>("en");

    const handleButtonClick = (lang: string) => {
        handleLanguageChange(lang); 
        setCurrentLanguage(lang);
      };
  return (
    <div className="mt-6">
      <button
        className={`ml-6 ${
          currentLanguage === "en" ? "bg-blue-700 font-bold" : "bg-gray-300 opacity-90 font-bold"
        } text-white px-4 py-2 rounded`}
        onClick={() => handleButtonClick("en")}
      >
        English
      </button>
      <button
        className={`ml-6 ${
          currentLanguage === "vi" ? "bg-blue-700 font-bold" : "bg-gray-300 opacity-90 font-bold"
        } text-white px-4 py-2 rounded`}
        onClick={() => handleButtonClick("vi")}
      >
        Tiếng Việt
      </button>
    </div>
  );
};

export default ChangeLanguage;
