import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import { CourseService } from '../../../Services/Admin/CourseService';
import { IGetAllCoursesService } from '../../../interfaces/admin/ICourseService';
import "./courses-component.css";

export const CoursesComponent: React.FC = () => {
    const [courses, setCourses] = useState<IGetAllCoursesService[]>([]);
    const [filtro, setFiltro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const data = await CourseService.getCoursesWithDetails();
            setCourses(data);
        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const cursosFiltrados = courses.filter((course) =>
        `${course.name} ${course.type} ${course.modality}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="text-center">Carregando cursos...</div>
            </div>
        );
    }

    return (
        <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Cursos Cadastrados</h2>
            <nav className="navbar custom-navbar">
                <div className="div-form">
                    <form className="d-flex custom-form-users" role="search">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Pesquise por nome, tipo ou modalidade" 
                            aria-label="Search"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </form>
                </div>
            </nav>
            <div>
                <Link to={`/admin/curso/criar-novo`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Novo curso">Novo Curso</Link>
            </div>
            <div className="table-responsive">
                <table className="table align-middle table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Status</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Modalidade</th>
                            <th>Duração</th>
                            <th>Preço Total</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">Nenhum curso encontrado.</td>
                            </tr>
                        ) : (
                            cursosFiltrados.map((course) => (
                                <tr key={course.id}>
                                    <td>
                                        <span className={`badge ${course.status ? 'bg-success' : 'bg-danger'}`}>
                                            {course.status ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td>{course.name}</td>
                                    <td>{course.type}</td>
                                    <td>{course.modality}</td>
                                    <td>{course.duration}</td>
                                    <td>{formatPrice(course.totalPrice)}</td>
                                    <td className="text-center">
                                        <Link to={`/admin/curso/${course.id}`} className="bi bi-eye-fill mx-2 text-dark" title="Dados do curso"></Link>
                                        <Link to={`/admin/curso/${course.id}/turmas`} className=" bi-backpack2-fill text-dark" style={{ marginLeft: "8px", marginRight: "8px" }}  title="Turmas"></Link>
                                        <Link to={`/admin/curso/${course.id}/professores`} className="bi bi-person-badge-fill mx-2 text-dark" title="Professores"></Link>
                                        <Link to={`/admin/curso/${course.id}/modulos`} className="bi bi-book-fill mx-2 text-dark" title="Módulos"></Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesComponent;
