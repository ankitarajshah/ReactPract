// fields/authFields.js
export const loginFields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];
  
  export const signupFields = [
    { name: "name", label: "Name", type: "text" },
    ...loginFields,
  ];