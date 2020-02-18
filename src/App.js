import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

//Componente: Bloco isolado de HTML, CSS E JS, o qual não interfere no restante da aplicação (FUNÇÃO QUE RETORNA ALGUM CONTEUDO HTML, JS OU CS)

//Propriedade: Informações que um componente PAI passa para o componente FILHO

//Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {

    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  async function loadDeleteDev() {
    await loadDevs();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} callback={loadDeleteDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
