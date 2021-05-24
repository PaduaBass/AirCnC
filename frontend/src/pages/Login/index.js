import React, { useState } from 'react';
import api from '../../services/api';


export default function Login({ history }) {
    const [email, setEmail] = useState('');

  async function handleSubmit(evento) {
    evento.preventDefault();
    
    const response = await api.post('/sessions', { email });
    
    const { _id } = response.data;
    
    localStorage.setItem('user', _id);
    
    history.push('/dashboard');
  }

    return (
        <>
        <p>
          Ofereça <strong>Spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
          required
          type="email" 
          id="email" 
          placeholder="Seu melhor email"
          value={email}
          onChange={evento => setEmail(evento.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    )
}