import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Aqui você carregará imagens e sons no futuro
    }

    create() {
        // Adiciona um texto simples na tela para testar
        this.add.text(400, 300, 'Atlas: Uma Jornada pela Terra', {
            fontSize: '32px',
            fill: '#46c4eb'
        }).setOrigin(0.5);
    }

    update() {
        // Lógica de loop do jogo (movimentação, colisão, etc.)
    }
}