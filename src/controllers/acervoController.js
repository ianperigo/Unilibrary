class AcervoController {
    constructor(Acervo) {
        this.Acervo = Acervo;
    }

    async createAcervo(req, res) {
        try {
            const acervo = await this.Acervo.create(req.body);
            res.status(201).json(acervo);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar exemplar', error });
        }
    }

    async getAcervos(req, res) {
        try {
            const acervos = await this.Acervo.findAll();
            res.status(200).json(acervos);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar exemplares', error });
        }
    }

    async updateAcervo(req, res) {
        const { id } = req.params;
        try {
            const [updated] = await this.Acervo.update(req.body, {
                where: { id: id }
            });
            if (updated) {
                const updatedAcervo = await this.Acervo.findByPk(id);
                res.status(200).json(updatedAcervo);
            } else {
                res.status(404).json({ mensagem: 'Exemplar não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao atualizar exemplar', error });
        }
    }

    async deleteAcervo(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.Acervo.destroy({
                where: { id: id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ mensagem: 'Exemplar não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar exemplar', error });
        }
    }
}

export default AcervoController;