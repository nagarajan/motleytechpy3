const useState = React.useState;

const getNeighboringPositions = (gameState, pos) => {
    const neighboringPositions = [];
    const { rows, columns, squares } = gameState;
    const [p1, p2] = [Math.floor(pos / columns), pos % columns];
    if (p1 > 0) {
        if (p2 > 0) {
            neighboringPositions.push((p1 - 1) * columns + p2 - 1);
        }
        neighboringPositions.push((p1 - 1) * columns + p2);
        if (p2 < columns - 1) {
            neighboringPositions.push((p1 - 1) * columns + p2 + 1);
        }
    }
    if (p2 > 0) {
        neighboringPositions.push(p1 * columns + p2 - 1);
    }
    if (p2 < columns - 1) {
        neighboringPositions.push(p1 * columns + p2 + 1);
    }
    if (p1 < rows - 1) {
        if (p2 > 0) {
            neighboringPositions.push((p1 + 1) * columns + p2 - 1);
        }
        neighboringPositions.push((p1 + 1) * columns + p2);
        if (p2 < columns - 1) {
            neighboringPositions.push((p1 + 1) * columns + p2 + 1);
        }
    }
    return neighboringPositions;
};

const getNeighboringFlaggedCount = (gameState, pos, nPositions) => {
    let flaggedCount = 0;
    const nPos = nPositions || getNeighboringPositions(gameState, pos);
    nPos.forEach((p) => {
        if (gameState.squares[p] === 'f') {
            flaggedCount += 1;
        }
    });
    return flaggedCount;
};

const createShadowMinefield = (gameState) => {
    gameState.shadowMinefield = [
        ...Array(gameState.rows * gameState.columns).keys(),
    ].map((pos) => {
        if (gameState.minePositions[pos]) {
            return 'm';
        }
        const numMines = getNeighboringMines(gameState, pos);
        if (numMines === 0) {
            return 'e';
        }
        return numMines;
    });
};

const fillMines = (gameState, firstPos) => {
    const totalLocations = gameState.rows * gameState.columns;
    const minePositions = {};
    let mines = 0;
    while (mines < gameState.nMines) {
        const newMine = Math.floor(Math.random() * totalLocations);
        if (newMine === firstPos || minePositions[newMine]) {
            continue;
        } else {
            minePositions[newMine] = true;
            mines += 1;
        }
    }
    gameState.minePositions = minePositions;
};

const getNeighboringMines = (gameState, pos) => {
    let mineCount = 0;
    const { minePositions } = gameState;
    const nPositions = getNeighboringPositions(gameState, pos);
    nPositions.forEach((p1) => {
        if (minePositions[p1]) {
            mineCount += 1;
        }
    });
    return mineCount;
};

const getNeighborsOfEmpty = (gameState, pos) => {
    const { rows, columns, shadowMinefield } = gameState;

    const positionsToExplore = [pos];
    const alreadyExplored = {};
    const neighbors = {};

    const handlePosition = (newPosition) => {
        const count = shadowMinefield[newPosition];
        if (count === 'e' && !alreadyExplored[newPosition]) {
            positionsToExplore.push(newPosition);
        }
        neighbors[newPosition] = true;
    };

    while (positionsToExplore.length > 0) {
        const currentPosition = positionsToExplore.shift();
        alreadyExplored[currentPosition] = true;

        if (shadowMinefield[currentPosition] === 'e') {
            const nPositions = getNeighboringPositions(
                gameState,
                currentPosition
            );
            nPositions.forEach(handlePosition);
        }
    }
    delete neighbors[pos];
    return neighbors;
};

const exposeAllUnmarkedMines = (gameState) => {
    Object.keys(gameState.minePositions).forEach((pos) => {
        if (gameState.squares[pos] === 'c') {
            gameState.squares[pos] = 'm';
        }
    });
    gameState.squares.forEach((v, p) => {
        if (!gameState.minePositions[p] && v === 'f') {
            gameState.squares[p] = 'x';
        }
    });
};

const MineFieldController = ({ gameState, setGameState }) => {
    const onLeftClick = (pos) => {
        if (['win', 'loss'].includes(gameState.condition)) {
            return;
        }
        if (gameState.squares[pos] === 'c') {
            if (gameState.condition === 'not started') {
                gameState.condition = 'playing';
                gameState.timeStarted = Date.now();
                fillMines(gameState, pos);
                createShadowMinefield(gameState);
                // todo : start the clock
            }
            if (gameState.shadowMinefield[pos] === 'm') {
                gameState.squares[pos] = 'm';
                gameState.firstMine = pos;
                gameState.condition = 'loss';
                gameState.timeEnded = Date.now();
                exposeAllUnmarkedMines(gameState);
                // todo : stop the clock
            } else {
                const current = gameState.shadowMinefield[pos];
                if (current === 'e') {
                    // get neighboring locations near empty positions
                    const neighborsOfEmpty = getNeighborsOfEmpty(
                        gameState,
                        pos
                    );
                    // open neighboring positions
                    Object.keys(neighborsOfEmpty).forEach((np) => {
                        if (gameState.squares[np] === 'c') {
                            gameState.remainingSquares -= 1;
                        }
                        gameState.squares[np] = gameState.shadowMinefield[np];
                    });
                }
                if (gameState.squares[pos] === 'c') {
                    gameState.remainingSquares -= 1;
                }
                gameState.squares[pos] = current;
            }
            if (gameState.remainingSquares === 0) {
                gameState.condition = 'win';
                gameState.timeEnded = Date.now();
                console.log('game won');
            }
            if (gameState.remainingSquares < 0) {
                console.log('Remaining Squares less than 0', {
                    remainingSquares,
                });
            }

            setGameState({ ...gameState });
        }
    };

    const onRightClick = (e, pos) => {
        e.preventDefault();
        if (['win', 'loss'].includes(gameState.condition)) {
            return;
        }
        if (gameState.squares[pos] === 'c') {
            gameState.squares[pos] = 'f';
            gameState.minesMarked += 1;
            setGameState({ ...gameState });
        } else if (gameState.squares[pos] === 'f') {
            gameState.squares[pos] = 'c';
            gameState.minesMarked -= 1;
            setGameState({ ...gameState });
        }
    };

    const onDoubleClick = (pos) => {
        console.log('double click on : ', pos);
        // if mines near pos == the number in pos, open all squares near pos
        const number = gameState.squares[pos];
        const nPositions = getNeighboringPositions(gameState, pos);
        const numFlagged = getNeighboringFlaggedCount(
            gameState,
            pos,
            nPositions
        );

        if (numFlagged === number) {
            // open all closed neighbors
            const { shadowMinefield, squares } = gameState;
            nPositions.forEach((p1) => {
                if (squares[p1] === 'c') {
                    gameState.remainingSquares -= 1;
                    squares[p1] = shadowMinefield[p1];
                    if (squares[p1] === 'm') {
                        if (gameState.condition !== 'loss') {
                            gameState.firstMine = pos;
                            gameState.condition = 'loss';
                            gameState.timeEnded = Date.now();
                            exposeAllUnmarkedMines(gameState);
                        }
                    } else {
                        const current = gameState.shadowMinefield[p1];
                        if (current === 'e') {
                            // get neighboring locations near empty positions
                            const neighborsOfEmpty = getNeighborsOfEmpty(
                                gameState,
                                p1
                            );
                            // open neighboring positions
                            Object.keys(neighborsOfEmpty).forEach((noe) => {
                                if (gameState.squares[noe] === 'c') {
                                    gameState.remainingSquares -= 1;
                                }
                                gameState.squares[noe] =
                                    gameState.shadowMinefield[noe];
                            });
                        }
                    }
                }
            });
            if (gameState.remainingSquares === 0) {
                gameState.condition = 'win';
                gameState.timeEnded = Date.now();
                console.log('game won');
            }
            if (gameState.remainingSquares < 0) {
                console.log('Remaining Squares less than 0', {
                    remainingSquares,
                });
            }
            setGameState({ ...gameState });
        }
    };

    return (
        <MineField
            gameState={gameState}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            onDoubleClick={onDoubleClick}
        />
    );
};

const dummyRightClick = (e) => {
    e.preventDefault();
};

const MineField = ({ gameState, onLeftClick, onRightClick, onDoubleClick }) => {
    return (
        <div
            className="minefield"
            style={{
                width: gameState.columns * 20,
            }}
        >
            {gameState.squares.map((sq, i) => {
                return (
                    <>
                        {sq === 'c' && (
                            <button
                                onClick={(event) => {
                                    if (event.detail === 1) {
                                        onLeftClick(i);
                                    }
                                    if (event.detail === 2) {
                                        onDoubleClick(i);
                                    }
                                }}
                                onContextMenu={(e) => onRightClick(e, i)}
                            >
                                c
                            </button>
                        )}
                        {sq === 'f' && (
                            <button onContextMenu={(e) => onRightClick(e, i)}>
                                ⛳️
                            </button>
                        )}
                        {sq === 'e' && (
                            <div onContextMenu={dummyRightClick}></div>
                        )}
                        {sq === 'x' && (
                            <div
                                onContextMenu={dummyRightClick}
                                style={{ backgroundColor: 'red' }}
                            >
                                x
                            </div>
                        )}
                        {sq === 'm' && (
                            <div
                                className={
                                    i === gameState.firstMine
                                        ? 'redMine'
                                        : 'normalMine'
                                }
                                onContextMenu={dummyRightClick}
                            >
                                💥
                            </div>
                        )}
                        {sq >= 1 && sq < 9 && (
                            <div
                                onContextMenu={dummyRightClick}
                                onClick={(event) => {
                                    if (event.detail === 2) {
                                        onDoubleClick(i);
                                    }
                                }}
                            >
                                {sq}
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
};

const ButtonsContainer = ({ resetGameToSize }) => {
    // 8x8 with 10 mines), Intermediate (16x16 with 40 mines), and Expert (16x30 with 99 mines).
    return (
        <div className="buttonsContainer">
            <button onClick={() => resetGameToSize([8, 8, 10])}>
                Beginner (8x8 with 10 mines)
            </button>
            <button onClick={() => resetGameToSize([16, 16, 40])}>
                Intermediate (16x16 with 40 mines)
            </button>
            <button onClick={() => resetGameToSize([16, 30, 99])}>
                Expert (16x30 with 99 mines)
            </button>
        </div>
    );
};

const Timer = ({ timeStarted, timeEnded }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [inTimer, setInTimer] = useState(undefined);
    React.useEffect(() => {
        if (!timeStarted && !timeEnded) {
            inTimer && window.clearInterval(inTimer);
            setInTimer(undefined);
        }
        if (timeStarted && !timeEnded && !inTimer) {
            const intervalTimer = window.setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 123);
            }, 123);
            setInTimer(intervalTimer);
            return () => window.clearInterval(intervalTimer);
        }
        if (timeStarted && timeEnded && inTimer) {
            window.clearInterval(inTimer);
            setInTimer(undefined);
        }
    }, [timeStarted, timeEnded]);

    let displayTime;
    if (timeEnded) {
        displayTime = ((timeEnded - timeStarted) / 1000).toFixed(2);
        if (inTimer) {
            window.clearInterval(inTimer);
            setInTimer(undefined);
        }
    } else {
        if (!timeStarted || !elapsedTime) {
            displayTime = '-.--';
        } else {
            displayTime = ((Date.now() - timeStarted) / 1000).toFixed(2);
        }
    }
    return <div>{displayTime}</div>;
};

const getNewGameState = (gameSize) => {
    const [rows, columns, nMines] = gameSize;
    return {
        rows,
        columns,
        nMines,
        condition: 'not started',
        minePositions: {},
        timeStarted: undefined,
        timeEnded: undefined,
        minesMarked: 0,
        firstMine: undefined,
        remainingSquares: rows * columns - nMines,
        squares: [...Array(rows * columns).keys()].map((x) => 'c'),
    };
};

const App = () => {
    const [gameSize, setGameSize] = useState([8, 8, 10]);
    const [gameState, setGameState] = useState(getNewGameState(gameSize));

    const resetGameToSize = (size) => {
        setGameSize(size);
        setGameState(getNewGameState(size));
    };

    return (
        <>
            <ButtonsContainer resetGameToSize={resetGameToSize} />
            <div style={{ display: 'flex', gap: '20px' }}>
                <div>Rem : {gameState.nMines - gameState.minesMarked}</div>
                <div>
                    <button onClick={() => resetGameToSize([...gameSize])}>
                        {gameState.condition === 'win'
                            ? '😎'
                            : gameState.condition === 'loss'
                            ? '🙁'
                            : '😐'}
                    </button>
                </div>
                <Timer
                    timeStarted={gameState.timeStarted}
                    timeEnded={gameState.timeEnded}
                />
            </div>
            <MineFieldController
                gameState={gameState}
                setGameState={setGameState}
            />
        </>
    );
};

const container = document.getElementById('minesweeper');
const root = ReactDOM.render(<App />, container);

console.log('end');
