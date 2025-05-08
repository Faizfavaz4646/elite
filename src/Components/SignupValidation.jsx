import * as Yup from "yup";


export const SignupValidation=Yup.object({
    name:Yup.string().min(3).required("Please enter your name"),
    email:Yup.string().email("Please enter a valid email").required("Please enter your email"),
    password:Yup.string().min(5).required("Please enter your password"),
    confirmpassword:Yup.string().oneOf([Yup.ref("password")], "password not matched").required("Please confirm your password"),

})