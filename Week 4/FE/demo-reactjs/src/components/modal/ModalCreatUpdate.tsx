import React from 'react';
import { Modal, TextInput } from "@mantine/core";



interface ModalCreateUpdateProps {
  opened: boolean;
  onClose: () => void;
  title:string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder:string;
  label:string;
  id:string;
  name:string;
  typeButton:string;

}

const ModalCreateUpdate: React.FC<ModalCreateUpdateProps> = ({
    opened,
    onClose,
    title,
    onSubmit,
    value,
    onChange,
    placeholder,
    label,
    id,
    name,
    typeButton

  }) => {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        size={500}
        padding={40}
        centered

      >
        <div>
          <form onSubmit={onSubmit}>
            <TextInput
              placeholder={placeholder}
              label={label}
              value={value}
              onChange={onChange}
              id={id}
              name={name}
              size="md"
              withAsterisk
            />
            <button
              className="mt-3 bg-[#36c6ee] rounded-md py-[8px] px-[9px] text-[#fff] font-bold w-[100%] hover:opacity-50"
              type="submit"
            >
              {typeButton}
            </button>
          </form>
        </div>
      </Modal>
    );
  };
  
  export default ModalCreateUpdate;