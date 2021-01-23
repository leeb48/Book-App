import React, { useState } from "react";

export const useForm = <T,>(intialFormValues: T) => {
  const [values, setValues] = useState<T>(intialFormValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });

  return {
    values,
    onChange,
  };
};
