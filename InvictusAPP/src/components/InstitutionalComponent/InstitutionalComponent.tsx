import "../InstitutionalComponent/InstitutionalComponents.css";
import banner from "../../Utils/imgs/bannerinstitutional.png"
import turma1 from "../../Utils/imgs/turma1.png"
import turma2 from "../../Utils/imgs/turma2.png"
import coordenadores from "../../Utils/imgs/ricardojosi.jpeg"

function InstitutionalComponent()
{
    return(
        <>
        <section className="section-institutional">
            <div className="banner-institutional">
                <img src={banner} className="d-block w-100" alt="..." />
            </div>

            <div className="div-coordenation">
                <div className="sub-div-coordenation">
                    <div className="div-img-coordenation"><img src={coordenadores} className="img-coordenation"/></div>
                    <div className="div-text-coordenation"> 
                        <h3>Coordenação Geral</h3>
                        <p className="text-coordenation">À frente da nossa instituição, temos uma coordenação comprometida com a excelência no ensino e a formação de profissionais qualificados.</p>
                        <p className="text-coordenation">Ricardo Liberato, advogado, especialista em Direito Penal e professor, atua com dedicação para fortalecer a qualidade acadêmica e garantir um ensino alinhado às demandas do mercado. Já Josi Macedo Liberato, bacharel em Direito e fundadora da Invictus, tem uma trajetória consolidada na gestão educacional, liderando a instituição com visão estratégica e compromisso com a inovação no ensino. Juntos, eles conduzem nossa instituição com dedicação, sempre em busca do melhor para nossos alunos.</p>
                    </div>
                </div>
            </div>

            <div className="div-differences">
                <h3>Porque escolher a gente?</h3>
                <p className="text-coordenation">Com uma trajetória consolidada no ensino presencial no interior da Bahia, nossa instituição se destaca pela qualidade dos cursos de especialização e pelo corpo docente formado por professores renomados, tanto do estado quanto de outras regiões do país. Nosso compromisso sempre foi proporcionar uma formação sólida, conectando teoria e prática para preparar nossos alunos para os desafios do mercado.</p>
                <p className="text-coordenation">Agora, ampliamos nossa missão para o ambiente digital, levando o mesmo padrão de excelência para todo o Brasil. Acreditamos que a tecnologia é uma ponte para o conhecimento, e com ela, queremos tornar a educação acessível, dinâmica e impactante, sem perder a essência do ensino próximo e de qualidade que sempre oferecemos.</p>
            </div>

            <div className="div-students">
                <div className="div-text-students">
                    <h3>Momentos que marcam</h3>
                    <p className="text-coordenation">Cada turma, cada aluno e cada conquista fazem parte da nossa história. Aqui, registramos os momentos especiais vividos na nossa instituição, celebrando o aprendizado, a amizade e o crescimento de todos que passam por aqui. Confira alguns desses momentos!</p>
                </div>
                <div className="div-img-students">
                    <img src={turma1} className="img-students" alt="..." />
                    <img src={turma2} className="img-students" alt="..." />
                </div>
            </div>

            <div className="div-especializacao-principal">
                <div className="div-especializacao">
                    <h3>Especialização que Transforma Carreiras</h3>
                    <p>A especialização é um diferencial indispensável para quem deseja se destacar no mercado. Na Invictus, unimos qualidade acadêmica e ensino prático para oferecer cursos que realmente fazem a diferença na trajetória profissional. Com um corpo docente experiente e uma metodologia focada na aplicação do conhecimento, preparamos nossos alunos para novos desafios e grandes oportunidades.</p>
                </div>
            </div>
        </section>
        </>
    )
}
export default InstitutionalComponent;
