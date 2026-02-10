import { PrimaryButton, PrimaryContainer, Spinner } from "@/components/ui"
import { ChessBoard, ChessPlayer, ChessModal, ChessPiece } from '@/features'
import { useNavigate, useParams } from "react-router-dom";
import { useMatchmaking, useMoves, useBoard, useGameSession } from "@/features/chess-game/api";
import { useEffect, useRef, useState } from "react";
import { TimeFormatter } from "@/app/utils";
import { ChessRook, ChessKnight, ChessBishop, ChessQueen } from "lucide-react";
import { PromotionPiece } from "@/types";

export function GameLayout() {
  const navigate = useNavigate();
  const [promotionMove, setPromotionMove] = useState<{ from: any; to: any } | null>(null);
  const { gameId } = useParams<{ gameId: string }>();

  const { findOrCreateMatch } = useMatchmaking();
  const { board, setBoard, fetchBoard } = useBoard();

  const { connection, myColor, opponent, setOpponent, isOpponentConnected } = useGameSession(gameId || null);

  const {
    fetchMoves,
    availableMoves,
    setAvailableMoves,
    setAllLegalMoves,
    makeMove,
    playerTurn,
    isCheckmate,
    whiteTime,
    blackTime,
    setWhiteTime,
    setBlackTime,
    gameOver,
  } = useMoves(gameId || null, connection, setBoard, setOpponent);

  const isUserBlack = myColor === "Black";
  const opponentColor = isUserBlack ? "White" : "Black";

  const formattedWhiteTime = TimeFormatter(whiteTime);
  const formattedBlackTime = TimeFormatter(blackTime);

  const myTimeDisplay = isUserBlack ? formattedBlackTime : formattedWhiteTime;
  const opponentTimeDisplay = isUserBlack ? formattedWhiteTime : formattedBlackTime;

  const userStats = {
    username: localStorage.getItem("username") || localStorage.getItem("chess_user_id"),
    eloRating: Number(localStorage.getItem("elo"))
  };

  const matchmakingStarted = useRef(false);

  useEffect(() => {
    if (!gameId || isCheckmate || !opponent || gameOver) return;

    let lastTick = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastTick;
      lastTick = now;

      if (playerTurn === "White") {
        setWhiteTime((prev) => Math.max(0, prev - deltaTime));
      } else {
        setBlackTime((prev) => Math.max(0, prev - deltaTime));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [playerTurn, isCheckmate, gameId, gameOver, opponent]);

  useEffect(() => {
    const initMatch = async () => {
      if (gameId || matchmakingStarted.current) return;
      matchmakingStarted.current = true;

      try {
        const data = await findOrCreateMatch();
        if (data?.gameId) {
          navigate(`/game/${data.gameId}`, { replace: true });
        }
      } catch (e) {
        matchmakingStarted.current = false;
        console.error("Matchmaking failed", e);
      }
    };

    initMatch();
  }, [gameId, findOrCreateMatch, navigate]);

  useEffect(() => {
    const initGame = async () => {
      if (gameId) {
        const data = await fetchBoard(gameId);

        if (data) {
          if (data.allLegalMoves) {
            setAllLegalMoves(data.allLegalMoves);
          }
          if (data.whiteTimeMs) setWhiteTime(data.whiteTimeMs);
          if (data.blackTimeMs) setBlackTime(data.blackTimeMs);
        }
      }
    };

    initGame();
  }, [gameId, fetchBoard, setAllLegalMoves, setWhiteTime, setBlackTime]);

  const handlePromotionSelect = async (piece: PromotionPiece) => {
    if (!promotionMove) return;

    const updatedBoard = await makeMove(promotionMove.from, promotionMove.to, piece);
    if (updatedBoard) setBoard(updatedBoard);

    setPromotionMove(null);
  };

  const handleMoveAttempt = async (from: any, to: any) => {
    const piece = board.find(p => p.key.row === from.row && p.key.column === from.column);
    const isPawn = piece?.type?.toLowerCase() === 'pawn';
    const isPromotionRank = to.row === 0 || to.row === 7;

    if (isPawn && isPromotionRank) {
      setPromotionMove({ from, to });
      return;
    }

    const updatedBoard = await makeMove(from, to);
    if (updatedBoard) setBoard(updatedBoard);
  };

  return (
    <div className="flex h-screen w-full p-8 gap-8 overflow-hidden items-center justify-center">
      <PrimaryContainer className="flex-col items-center justify-center">
        <div className="relative">
          <ChessPlayer playerColor={opponentColor} playerName={`${opponent?.username || "Opponent"}`} elo={opponent?.elo || null} timeRemaining={opponentTimeDisplay} reconnecting={!isOpponentConnected} />
          <ChessBoard
            board={board}
            setBoard={setBoard}
            fetchMoves={fetchMoves}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
            makeMove={handleMoveAttempt}
            isFlipped={isUserBlack}
          />
          {!opponent && !gameOver && (
            <ChessModal className="flex flex-col justify-center items-center">
              <h2 className="text-2xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">Please wait</h2>
              <p className="text-xl text-white/80 font-light uppercase tracking-[0.1em] mb-4 animate-pulse">Looking for opponent...</p>
              <Spinner />
            </ChessModal>
          )}

          {promotionMove && (
            <ChessModal className="flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">Promotion</h2>
              <div className="flex flex-row gap-3">
                <PrimaryButton onClick={() => handlePromotionSelect("Queen")}>
                  <ChessQueen />
                </PrimaryButton>
                <PrimaryButton onClick={() => handlePromotionSelect("Rook")}>
                  <ChessRook />
                </PrimaryButton>
                <PrimaryButton onClick={() => handlePromotionSelect("Bishop")}>
                  <ChessBishop />
                </PrimaryButton>
                <PrimaryButton onClick={() => handlePromotionSelect("Knight")}>
                  <ChessKnight />
                </PrimaryButton>
              </div>
            </ChessModal>
          )}

          {gameOver && (
            <ChessModal className="flex flex-col justify-center items-center text-center">
              {gameOver.winner === "Draw" ? (
                <>
                  <h2 className="text-2xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">Draw</h2>
                  <p className="text-xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">
                    The game ended in a {gameOver.reason}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">
                    {gameOver.reason}
                  </p>
                  <p className="text-sm text-white/40 uppercase tracking-[0.2em]">
                    {gameOver.winner} wins!
                  </p>
                </>
              )}
              <PrimaryButton
                onClick={() => navigate('/')}
                className="mt-8 text-sm">
                Return to Lobby
              </PrimaryButton>
            </ChessModal>
          )}
          <ChessPlayer playerColor={myColor} playerName={userStats.username} elo={userStats.eloRating || null} timeRemaining={myTimeDisplay} />
        </div>
      </PrimaryContainer >

    </div >
  );
}