'use client'
import { useEffect, useState } from 'react';

export default function EventosByIdPage({ params }) {
  const { id } = params;

  const [evento, setEvento] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await fetch(`http://localhost:3000/eventos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao listar evento');
          }
          return response.json();
        })
        .then((dados) => {
          setEvento(dados);
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }
    getData();
  }, [id]);

  return (
    <div>
      {isLoading && <div className="bg-yellow-500 text-zinc-900 p-2">Carregando...</div>}

      {error && <div className="bg-red-500 p-2">{error.toString()}</div>}

      {evento && Object.keys(evento).length === 0 && !isLoading && !error &&
        <div className='bg-blue-500 p-2'>Não existem eventos cadastrados!</div>}

      {evento && Object.keys(evento).length > 0 &&
        <div>
          <div>Id: {evento.id}</div>
          <div>Titulo: {evento.nome}</div>
          <div>Data: {evento.data}</div>
        </div>}
    </div>
  );
}
