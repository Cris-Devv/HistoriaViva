import Phaser from 'phaser';
import { GameScene } from './scenes/gameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Gravidade padrão para o modo plataforma
            debug: false
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);