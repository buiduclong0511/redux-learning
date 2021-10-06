import { Input } from "antd";
import styled from "styled-components";
import { SizeType } from "antd/lib/config-provider/SizeContext";

import { IHandleBlur, IHandleChange } from "src/Interface";

interface IProps {
  value: string;
  label?: string;
  size?: SizeType;
  placeholder?: string;
  id?: string;
  type?: string;
  touched?: boolean;
  error?: string;
  name?: string;
  fullWidth?: boolean;
  onChange: IHandleChange;
  onBlur?: IHandleBlur;
}

export const InputField: React.FC<IProps> = ({
  value,
  label = "",
  size = "middle",
  placeholder = "",
  id = "",
  type = "text",
  touched = false,
  error = "",
  name = "",
  fullWidth = false,
  onChange,
  onBlur = () => {},
}) => {
  const Component = type === "password" ? Input.Password : Input;

  return (
    <Container fullWidth={fullWidth}>
      {label && <label htmlFor={id}>{label}</label>}
      <Component
        id={id}
        type={type}
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      {touched && error && <p className="errorMessage">{error}</p>}
    </Container>
  );
};

const Container = styled.div<{ fullWidth: boolean }>`
  max-width: ${(p) => (p.fullWidth ? "100%" : "250px")};
  padding-top: 10px;

  label {
    display: inline-block;
    padding-bottom: 5px;
  }

  .errorMessage {
    color: #f00;
    margin: 0;
    padding: 0;
  }
`;
