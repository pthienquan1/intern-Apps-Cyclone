import React from 'react';

import { useTranslation } from "react-i18next";
interface SearchProps {
    search: string;
    handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  const Search: React.FC<SearchProps> = (props) => {
    const { t } = useTranslation(); 
    return (
      <div className='mt-[20px] mb-[-40px] w-[88%] sm:w-[45%] md:w-[55%]'>
        <form onSubmit={props.handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
          <label className="font-bold text-[17px]" htmlFor="search">Search:</label>
          <input className='w-[100%] h-12 text-[19px] p-2 border border-black rounded-md'
            type="text"
            id="search"
            value={props.search}
            onChange={props.handleSearchChange}
            placeholder={t("SearchPlaceholder")}
          />
          <button className='px-5 py-1 text-[#fff] hover:bg-red-500 bg-[#549ad8] rounded-[5px]' type="submit">{t("Search")}</button>
        </form>
      </div>
    );
  };

export default Search;