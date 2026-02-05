import { PrimaryContainer, Spinner } from "@/components/ui"
import { ChessBoard, ChessPlayer, ChessModal } from '@/features'
import { useNavigate, useParams } from "react-router-dom";
import { useMatchmaking, useMoves, useBoard, useGameSession } from "@/features/chess-game/api";
import { useEffect, useRef } from "react";
import { TimeFormatter } from "@/app/utils";

export function GameLayout() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const { findOrCreateMatch } = useMatchmaking();
  const { board, setBoard, fetchBoard } = useBoard();

  const { connection, myColor, opponent, setOpponent } = useGameSession(gameId || null);

  const {
    fetchMoves,
    availableMoves,
    setAvailableMoves,
    makeMove,
    playerTurn,
    isCheckmate,
    whiteTime,
    blackTime,
    setWhiteTime,
    setBlackTime,
    gameOver
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
    if (!gameId || isCheckmate || !opponent) return;

    const interval = setInterval(() => {
      if (playerTurn === "White") {
        setWhiteTime((prev) => Math.max(0, prev - 100));
      } else {
        setBlackTime((prev) => Math.max(0, prev - 100));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [playerTurn, isCheckmate, gameId]);

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
    if (gameId) {
      fetchBoard(gameId);
    }
  }, [gameId, fetchBoard]);

  return (
    <div className="flex h-screen w-full p-8 gap-8 overflow-hidden items-center justify-center">
      <PrimaryContainer className="flex-col items-center justify-center">
        <div className="relative">
          <ChessPlayer playerColor={opponentColor} playerName={`${opponent?.username || "Opponent"}`} elo={opponent?.elo || null} timeRemaining={opponentTimeDisplay} />
          <ChessBoard
            board={board}
            setBoard={setBoard}
            fetchMoves={fetchMoves}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
            makeMove={makeMove}
            isFlipped={isUserBlack}
          />
          {!opponent && !gameOver && (
            <ChessModal className="flex flex-col justify-center items-center">
              <h2 className="text-2xl text-white/80 font-light uppercase tracking-[0.1em] mb-4">Please wait</h2>
              <p className="text-xl text-white/80 font-light uppercase tracking-[0.1em] mb-4 animate-pulse">Looking for opponent...</p>
              <Spinner />
            </ChessModal>
          )}

          {/* 2. Game Over Handler (Checkmate, Timeout, Abandonment, Stalemate) */}
          {gameOver && (
            <ChessModal className="flex flex-col justify-center items-center text-center">
              {gameOver.winner === "Draw" ? (
                <>
                  <h2 className="text-4xl text-white font-bold uppercase tracking-widest mb-2">Draw</h2>
                  <p className="text-xl text-white/60 font-light uppercase tracking-[0.1em]">
                    The game ended in a {gameOver.reason}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-4xl text-white font-bold uppercase tracking-widest mb-2">
                    {gameOver.winner === myColor ? "Victory" : "Defeat"}
                  </h2>
                  <div className={`h-1 w-20 mb-4 ${gameOver.winner === myColor ? 'bg-green-500' : 'bg-red-500'}`} />
                  <p className="text-xl text-white/80 font-medium uppercase tracking-[0.1em]">
                    {gameOver.winner} wins!
                  </p>
                  <p className="text-sm text-white/40 uppercase tracking-[0.2em] mt-2">
                    Reason: {gameOver.reason}
                  </p>
                </>
              )}

              <button
                onClick={() => window.location.href = '/'}
                className="mt-8 px-8 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Return to Lobby
              </button>
            </ChessModal>
          )}
          <ChessPlayer playerColor={myColor} playerName={userStats.username} elo={userStats.eloRating || null} timeRemaining={myTimeDisplay} />
        </div>
      </PrimaryContainer>

    </div>
  );
}