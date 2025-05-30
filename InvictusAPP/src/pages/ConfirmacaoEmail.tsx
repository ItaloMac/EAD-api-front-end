// src/pages/ConfirmacaoEmail.jsx

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function ConfirmacaoEmail() {
  const [searchParams] = useSearchParams();
  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState(''); // 'sucesso' ou 'erro'

  useEffect(() => {
    const status = searchParams.get('status');
    const msg = searchParams.get('msg');

    if (status === 'sucesso') {
      setMensagem('Seu e-mail foi confirmado com sucesso! Você já pode fazer login.');
      setTipo('sucesso');
    } else {
      setMensagem(msg || 'Houve um erro ao confirmar seu e-mail.');
      setTipo('erro');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className={`max-w-md w-full p-6 rounded-lg shadow-md text-center ${tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <h1 className="text-2xl font-bold mb-4">{tipo === 'sucesso' ? 'Sucesso!' : 'Erro'}</h1>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}
