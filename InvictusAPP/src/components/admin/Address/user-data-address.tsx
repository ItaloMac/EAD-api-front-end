import { useEffect, useState } from "react";
import { UsersService } from '../../../Services/Admin/UsersService';
import { AddressService } from '../../../Services/Admin/AddressService';
import { fetchAddressByCep } from '../../../Utils/viacep';
import { IGetAddressByIdService, IUpdateAddressService, ICreateAddressService } from '../../../interfaces/admin/IAddressService';
import './user-data-address.css';

function UserDataAddress({ userId }: { userId: string }) {
    const [addressData, setAddressData] = useState<IGetAddressByIdService | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [searchingCep, setSearchingCep] = useState(false);

    const [formData, setFormData] = useState({
        cep: '',
        road: '',
        neighborhood: '',
        city: '',
        state: '',
        number: 0
    });

    useEffect(() => {
        async function CarregarTodosDados() {
            setLoading(true);
            
            try {
                // Buscar dados do usuário para obter addressId
                const userData = await UsersService.getUserById(userId);
                
                if (userData.addressId) {
                    // Buscar dados do endereço
                    const address = await AddressService.getAddressById(userData.addressId);
                    setAddressData(address);
                    setFormData({
                        cep: address.cep || '',
                        road: address.road || '',
                        neighborhood: address.neighborhood || '',
                        city: address.city || '',
                        state: address.state || '',
                        number: address.number || 0
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar endereço do usuário:', error);
                setMessageError('Erro ao carregar dados do endereço');
            } finally {
                setLoading(false);
            }
        }

        CarregarTodosDados();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case "inputCep":
                setFormData((prev) => ({
                    ...prev,
                    cep: value
                }));
                // Buscar endereço automaticamente quando CEP tiver 8 dígitos
                if (value.replace(/\D/g, '').length === 8) {
                    handleCepSearch(value);
                }
                break;
            case "inputRoad":
                setFormData((prev) => ({
                    ...prev,
                    road: value
                }));
                break;
            case "inputNumber":
                setFormData((prev) => ({
                    ...prev,
                    number: Number(value)
                }));
                break;
            case "inputNeighborhood":
                setFormData((prev) => ({
                    ...prev,
                    neighborhood: value
                }));
                break;
            case "inputCity":
                setFormData((prev) => ({
                    ...prev,
                    city: value
                }));
                break;
            case "inputState":
                setFormData((prev) => ({
                    ...prev,
                    state: value
                }));
                break;
            default:
                break;
        }
    };

    const handleCepSearch = async (cep: string) => {
        try {
            setSearchingCep(true);
            const addressInfo = await fetchAddressByCep(cep);
            
            setFormData(prev => ({
                ...prev,
                road: addressInfo.road,
                neighborhood: addressInfo.neighborhood,
                city: addressInfo.city,
                state: addressInfo.state
            }));
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            setMessageError('CEP não encontrado ou inválido');
            setTimeout(() => {
                setMessageError("");
            }, 3000);
        } finally {
            setSearchingCep(false);
        }
    };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        if (!addressData?.id) {
            // não tem endereço → cria um novo
            const createAddress: ICreateAddressService = {
                cep: formData.cep,
                road: formData.road,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state,
                number: formData.number
            };

            const newAddress = await AddressService.createAddress(createAddress);

            // agora atualiza o usuário vinculando o novo endereço
            await UsersService.updateUserAddress(userId, { addressId: newAddress.id });

            setMessage("Endereço criado e vinculado com sucesso!");
        } else {
            // já existe endereço → apenas atualiza
            const updateData: IUpdateAddressService = {
                id: addressData.id,
                cep: formData.cep,
                road: formData.road,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state,
                number: formData.number
            };

            await AddressService.updateAddress(updateData);

            setMessage("Endereço atualizado com sucesso!");
        }
    } catch (error) {
        console.error(error);
        setMessageError("Erro ao salvar endereço.");
    } finally {
        setTimeout(() => {
            setMessage("");
            setMessageError("");
        }, 3000);
    }
};


    if (loading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Carregando dados do endereço...</p>
            </div>
        );
    }

    return (
        <>
            <form className="row custom-form" onSubmit={handleSubmit}>
                <h2 className="mb-4">Dados de Endereço</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {messageError && <div className="alert alert-danger">{messageError}</div>}
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputCep">CEP</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCep"
                        value={formData.cep}
                        onChange={handleChange}
                        placeholder="00000-000"
                        maxLength={9}
                        required
                    />
                    {searchingCep && <small className="text-primary">Buscando...</small>}
                </div>
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputRoad">Rua</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputRoad"
                        value={formData.road}
                        onChange={handleChange}
                        placeholder="Nome da rua"
                        required
                    />
                </div>
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputNumber">Número</label>
                    <input
                        type="number"
                        className="form-control"
                        id="inputNumber"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Número da residência"
                    />
                </div>
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputNeighborhood">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputNeighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        placeholder="Nome do bairro"
                        required
                    />
                </div>
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputCity">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Nome da cidade"
                        required
                    />
                </div>
                
                <div className="col-md-6 form-group-custom">
                    <label htmlFor="inputState">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputState"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="UF"
                        maxLength={2}
                        required
                    />
                </div>
                
                <div className="col-12 text-end mt-3">
                    <button type="submit" className="btn btn-primary">Salvar alterações</button>
                </div>
            </form>
        </>
    );
}

export default UserDataAddress;
