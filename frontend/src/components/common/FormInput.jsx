import React from "react";
import { TextField } from "@mui/material";

const FormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  ...rest
}) => {
  return (
    <TextField
      label={label}
      margin="normal"
      type={type}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default FormInput;
