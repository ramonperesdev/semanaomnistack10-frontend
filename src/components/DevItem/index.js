import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

function DevItem ({ dev, callback }) {
    const [loading, setLoading] = useState(false);

    async function handleDeleteDev(id) {

      setLoading(true);
      await api.delete(`/delete/${id}`);
      setLoading(false);
    
      callback();
     }

    return (
        <li className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
              
              <div className="group-button">
                {!loading && (
                  <button className="delete-button"
                  onClick={() => {handleDeleteDev(dev._id)}}
                  title={`Excluir o usuário ${dev.github_username}`} >
                    Excluir
                  </button>
                )}

                {loading && (
                  <button className="delete-button"
                  onClick={() => {handleDeleteDev(dev._id)}}
                  disabled>
                    Excluindo...
                  </button>
                )}

              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
          </li>
    );
}

export default DevItem;