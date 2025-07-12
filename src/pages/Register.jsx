import { useState } from "react";
import { register } from "../api/auth";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    roles: ["ROLE_CLIENT"],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = await register(form);
      localStorage.setItem("token", token);
      alert("Registro exitoso");
      window.location.href = "/";
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input name="username" placeholder="Usuario" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
