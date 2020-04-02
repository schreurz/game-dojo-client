export class TicTacToeDto {
    board: string[][]
    winner: string
    turn: string

    constructor(board: string[][], winner: string, turn: string) {
        this.board = board
        this.winner = winner
        this.turn = turn
    }
}