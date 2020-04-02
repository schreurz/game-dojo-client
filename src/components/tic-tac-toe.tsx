import React, { useRef, useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import { TicTacToeDto } from '../dto/tic-tac-toe.dto';

const END_POINT_URL = 'http://localhost:4002'

const TicTacToe = () => {
  const [board, setBoard]: [string[][], any] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [turn, setTurn]: [string | null, any] = useState(null)
  const [winner, setWinner]: [string | null, any] = useState(null)

  const updateGameState = useCallback((ticTacToeDto: TicTacToeDto) => {
    console.log('updating game state')
    setBoard(ticTacToeDto.board)
    setTurn(ticTacToeDto.turn)
    setWinner(ticTacToeDto.winner)
  }, [])

  const socket: React.MutableRefObject<SocketIOClient.Socket | null> = useRef(null)
  useEffect(() => {
    socket.current = io(END_POINT_URL)
    socket.current.on('game-update', (ticTacToeDto: TicTacToeDto) => updateGameState(ticTacToeDto))
  }, [updateGameState])

  const handleCellClick = (row: number, column: number) => {
    if (socket.current) {
      const moveDto = {
        row: row,
        column: column,
        player: turn
      }
      socket.current.emit('move', moveDto)
    }
  }

  const handleResetGame = () => {
    if (socket.current) {
      socket.current.emit('reset-game')
    }
  }

  return (
      <div>
        <div className="tic-tac-toe-board">
          {board.map((row: string[], rowKey: number) => (
            row.map((cell: string, columnKey: number) => (
              <div className="cell" key={`${rowKey}-${columnKey}`}
                onClick={() => handleCellClick(rowKey, columnKey)}
              >
                {cell}
              </div>
            ))
          ))}
        </div>
        <div>{turn}</div>
        <div>{winner}</div>
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
  )
}

export default TicTacToe