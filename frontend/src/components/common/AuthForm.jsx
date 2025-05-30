import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import FormInput from "./FormInput";
const AuthForm = ({ title, schema, onSubmit, fields }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography>{title}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, label, type = "text" }) => (
          <FormInput
            name={name}
            key={name}
            label={label}
            type={type}
            register={register}
            error={errors[name]}
          />
        ))}
        <CustomButton
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          {title}
        </CustomButton>
      </form>
    </Box>
  );
};

export default AuthForm;
