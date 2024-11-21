'use client'

import { useState } from "react";

export default function CadastrarEventosPage() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setMensagem(null);

    try {
      const evento = {
        titulo: nome,
        data: data
      };

      const response = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(evento)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar o evento');
      }

      setMensagem("Evento cadastrado com sucesso");
      setNome("");
      setData("");
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Cadastro de eventos</h1>

      {mensagem && <div className="m-2 p-2 bg-green-700 text-white">{mensagem}</div>}
      {error && <div className="m-2 p-2 bg-red-700 text-white">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="m-2">
          <label htmlFor="titulo" className="p-2">Título</label>
          <input
            type="text"
            id="titulo"
            className="text-zinc-950 p-2"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>

        <div className="m-2">
          <label htmlFor="data" className="p-2">Data</label>
          <input
            type="date"
            id="data"
            className="text-zinc-950 p-2"
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div>

        <div className="m-2">
          <button type="submit" className="p-2 bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
