import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { 
  ArrowLeft, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle, 
  Brain,
  Timer,
  Target
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 60) / 9; // 60 = padding + margins

// Generador de puzzles Sudoku (simplificado para demo)
const generateSudoku = (difficulty = 'easy') => {
  // Sudoku base válido
  const baseSudoku = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];

  const solution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];

  return { puzzle: baseSudoku, solution };
};

export default function SudokuGame() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(3);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!isCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCompleted]);

  const initializeGame = () => {
    const { puzzle: newPuzzle, solution: newSolution } = generateSudoku(difficulty);
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setUserInput(newPuzzle.map(row => [...row]));
    setSelectedCell(null);
    setMistakes(0);
    setHints(3);
    setTimeElapsed(0);
    setIsCompleted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCellPress = (row, col) => {
    if (puzzle[row][col] === 0) { // Solo celdas editables
      setSelectedCell({ row, col });
    }
  };

  const handleNumberPress = (number) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const newInput = [...userInput];
    
    if (number === 0) {
      newInput[row][col] = 0;
    } else {
      newInput[row][col] = number;
      
      // Verificar si es correcto
      if (solution[row][col] !== number) {
        setMistakes(prev => prev + 1);
        if (mistakes >= 2) {
          // Show encouragement without alert
          console.log('Too many mistakes - showing encouragement');
        }
      }
    }
    
    setUserInput(newInput);
    checkCompletion(newInput);
  };

  const checkCompletion = (currentInput) => {
    const isComplete = currentInput.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
    
    if (isComplete) {
      setIsCompleted(true);
      // Automatically start a new game or navigate back without alert
      console.log(`Puzzle completed in ${formatTime(timeElapsed)} with ${mistakes} mistakes`);
      // Could add a celebration animation here instead
    }
  };

  const useHint = () => {
    if (hints <= 0 || !selectedCell) return;
    
    const { row, col } = selectedCell;
    if (puzzle[row][col] !== 0) return; // No dar pista en celdas fijas
    
    const newInput = [...userInput];
    newInput[row][col] = solution[row][col];
    setUserInput(newInput);
    setHints(prev => prev - 1);
    checkCompletion(newInput);
  };

  const getCellStyle = (row, col, value) => {
    const isFixed = puzzle[row][col] !== 0;
    const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;
    const isWrong = !isFixed && value !== 0 && solution[row][col] !== value;
    
    return [
      styles.cell,
      { 
        backgroundColor: isSelected ? colors.primary + '20' : 
                        isFixed ? colors.background.tertiary :
                        colors.background.card,
        borderColor: isSelected ? colors.primary : colors.text.tertiary + '30',
        borderWidth: isSelected ? 2 : 1
      },
      isWrong && { backgroundColor: colors.status.error + '20' },
      // Bordes más gruesos para separar bloques 3x3
      row % 3 === 0 && { borderTopWidth: 2, borderTopColor: colors.text.secondary },
      col % 3 === 0 && { borderLeftWidth: 2, borderLeftColor: colors.text.secondary },
      row === 8 && { borderBottomWidth: 2, borderBottomColor: colors.text.secondary },
      col === 8 && { borderRightWidth: 2, borderRightColor: colors.text.secondary }
    ];
  };

  const getTextStyle = (row, col, value) => {
    const isFixed = puzzle[row][col] !== 0;
    const isWrong = !isFixed && value !== 0 && solution[row][col] !== value;
    
    return [
      styles.cellText,
      {
        color: isFixed ? colors.text.primary :
               isWrong ? colors.status.error :
               colors.primary,
        fontWeight: isFixed ? '700' : '600'
      }
    ];
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card }]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Mind Sudoku</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Train your brain 🧠</Text>
        </View>
        
        <View style={styles.headerRight}>
          <Brain size={24} color={colors.primary} strokeWidth={2} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: colors.background.card }]}>
            <Timer size={18} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.text.primary }]}>{formatTime(timeElapsed)}</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.background.card }]}>
            <Target size={18} color={colors.status.error} />
            <Text style={[styles.statText, { color: colors.text.primary }]}>{mistakes} mistakes</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.background.card }]}>
            <Lightbulb size={18} color={colors.status.warning} />
            <Text style={[styles.statText, { color: colors.text.primary }]}>{hints} hints</Text>
          </View>
        </View>

        {/* Sudoku Grid */}
        <View style={[styles.gridContainer, { backgroundColor: colors.background.card }]}>
          {userInput.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={getCellStyle(rowIndex, colIndex, cell)}
                  onPress={() => handleCellPress(rowIndex, colIndex)}
                  activeOpacity={0.7}
                >
                  <Text style={getTextStyle(rowIndex, colIndex, cell)}>
                    {cell !== 0 ? cell : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Number Buttons */}
        <View style={styles.numbersContainer}>
          <View style={styles.numbersGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <TouchableOpacity
                key={number}
                style={[styles.numberButton, { backgroundColor: colors.background.card }]}
                onPress={() => handleNumberPress(number)}
                activeOpacity={0.7}
              >
                <Text style={[styles.numberText, { color: colors.primary }]}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background.card }]}
              onPress={() => handleNumberPress(0)}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionButtonText, { color: colors.text.secondary }]}>Clear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.actionButton, 
                { 
                  backgroundColor: hints > 0 ? colors.status.warning + '20' : colors.background.tertiary,
                  opacity: hints > 0 ? 1 : 0.5
                }
              ]}
              onPress={useHint}
              disabled={hints <= 0}
              activeOpacity={0.7}
            >
              <Lightbulb size={16} color={colors.status.warning} />
              <Text style={[styles.actionButtonText, { color: colors.status.warning, marginLeft: 4 }]}>
                Hint
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}
              onPress={initializeGame}
              activeOpacity={0.7}
            >
              <RotateCcw size={16} color={colors.primary} />
              <Text style={[styles.actionButtonText, { color: colors.primary, marginLeft: 4 }]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Message */}
        <View style={[styles.motivationCard, { backgroundColor: colors.background.card }]}>
          <CheckCircle size={20} color={colors.status.success} />
          <Text style={[styles.motivationText, { color: colors.text.secondary }]}>
            Every puzzle you solve strengthens your mind. Keep going! 💪
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  gridContainer: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
  },
  numbersContainer: {
    marginBottom: 20,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  numberButton: {
    width: (width - 80) / 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  numberText: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  motivationText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});