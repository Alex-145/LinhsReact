function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Bienvenido</h2>
      {token ? <p>Token presente ✅</p> : <p>No autenticado ❌</p>}
    </div>
  );
}

export default Dashboard;
