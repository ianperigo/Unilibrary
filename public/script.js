document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';

    // Formulários
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const addAcervoForm = document.getElementById('add-acervo-form');

    // Seção do Acervo
    const acervoSection = document.getElementById('acervo-section');
    const acervoLista = document.getElementById('acervo-lista');

    // --- FUNÇÕES AUXILIARES ---
    const getToken = () => localStorage.getItem('jwtToken');

    const fazerRequest = async (endpoint, method, body = null) => {
        const headers = { 'Content-Type': 'application/json' };
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(API_URL + endpoint, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });

            const responseText = await response.text();
            
            if (!response.ok) {
                // Tenta extrair a mensagem de erro do JSON, senão usa o texto da resposta
                let errorMessage;
                try {
                    errorMessage = JSON.parse(responseText).message;
                } catch (e) {
                    errorMessage = responseText || `Erro ${response.status}`;
                }
                throw new Error(errorMessage);
            }
            
            // Retorna JSON apenas se a resposta tiver conteúdo
            if (responseText) {
                return JSON.parse(responseText);
            }
            return {}; // Para respostas vazias como DELETE
        } catch (err) {
            alert(`Erro: ${err.message}`);
            return null;
        }
    };

    const atualizarVisualizacao = (logado) => {
        acervoSection.style.display = logado ? 'block' : 'none';
        if (logado) {
            carregarAcervo();
        }
    };

    // --- LÓGICA DO ACERVO ---

    const removerExemplar = async (id) => {
        if (!confirm(`Tem certeza que deseja remover o exemplar de ID: ${id}?`)) {
            return;
        }
        const resultado = await fazerRequest(`/acervo/${id}`, 'DELETE');
        if (resultado !== null) { // A requisição não falhou
            alert('Exemplar removido com sucesso!');
            carregarAcervo(); // Atualiza a lista
        }
    };

    const carregarAcervo = async () => {
        const livros = await fazerRequest('/acervo', 'GET');
        if (!livros) return;
        
        acervoLista.innerHTML = ''; // Limpa a lista
        livros.forEach(livro => {
            const li = document.createElement('li');
            const info = document.createElement('span');
            info.textContent = `${livro.titulo} (Autor: ${livro.autor}, ID: ${livro.id})`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remover';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => removerExemplar(livro.id);

            li.appendChild(info);
            li.appendChild(deleteBtn);
            acervoLista.appendChild(li);
        });
    };
    
    addAcervoForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        const novoLivro = {
            titulo: document.getElementById('acervo-titulo').value,
            autor: document.getElementById('acervo-autor').value,
            edicao: document.getElementById('acervo-edicao').value,
            ano_publicacao: document.getElementById('acervo-ano').value,
            genero: document.getElementById('acervo-genero').value,
            quantidade: document.getElementById('acervo-quantidade').value,
            categoria: document.getElementById('acervo-categoria').value,
            tipo: document.getElementById('acervo-tipo').value
        };

        const resultado = await fazerRequest('/acervo', 'POST', novoLivro);
        if (resultado) {
            alert('Livro adicionado com sucesso!');
            addAcervoForm.reset(); // Limpa o formulário
            carregarAcervo();
        }
    });

    // --- LÓGICA DE AUTENTICAÇÃO ---

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const novoUsuario = {
            primeiro_nome: document.getElementById('register-primeiro-nome').value,
            ultimo_nome: document.getElementById('register-ultimo-nome').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value, // O backend cuidará do hash
            numero_matricula: document.getElementById('register-matricula').value,
            instituicao: document.getElementById('register-instituicao').value,
            vinculo: document.getElementById('register-vinculo').value,
            vinculo_ativo: 1 // Define como ativo por padrão
        };

        const resultado = await fazerRequest('/register', 'POST', novoUsuario);
        if (resultado) {
            alert('Usuário registrado com sucesso! Agora faça o login.');
            registerForm.reset();
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const resultado = await fazerRequest('/login', 'POST', { email, password: password });
        if (resultado && resultado.token) {
            localStorage.setItem('jwtToken', resultado.token);
            alert('Login realizado com sucesso!');
            atualizarVisualizacao(true);
        }
    });

    // --- INICIALIZAÇÃO ---
    
    // Verifica se o usuário já está logado ao carregar a página
    if (getToken()) {
        atualizarVisualizacao(true);
    }
});