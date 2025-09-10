export async function fetchAddressByCep(cep: string) {
    // Remove caracteres que não sejam números
    const cleanCep = cep.replace(/\D/g, '');
  
    if (!/^[0-9]{8}$/.test(cleanCep)) {
      throw new Error('Invalid CEP format.');
    }
  
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
  
    if (data.erro) {
      throw new Error('CEP not found.');
    }
  
    // Retorna mapeado para inglês
    return {
      road: data.logradouro,
      number: '', // campo vazio, normalmente preenchido manualmente
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      ibge: data.ibge
    };
  }
  