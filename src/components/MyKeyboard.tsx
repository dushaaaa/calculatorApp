import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_SIZE = SCREEN_WIDTH / 4;

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setInput(num);
      setWaitingForOperand(false);
    } else {
      setInput(input === "0" ? num : input + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setInput("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(input);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, previousValue, inputValue);
      setPreviousValue(result);
      setInput(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (op, value1, value2) => {
    switch (op) {
      case "+":
        return value1 + value2;
      case "-":
        return value1 - value2;
      case "*":
        return value1 * value2;
      case "/":
        return value1 / value2;
      default:
        return value2;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(input);
    const result = performCalculation(operator, previousValue, inputValue);
    
    setInput(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setInput("0");
    setOperator(null);
    setWaitingForOperand(false);
    setPreviousValue(null);
  };

  const handleDelete = () => {
    if (input.length === 1 || (input.length === 2 && input.startsWith("-"))) {
      setInput("0");
    } else {
      setInput(input.slice(0, -1));
    }
  };

  const getFontSize = () => {
    return input.length > 8 ? 60 : 100;
  };

  // Function to render display differently based on screenshot
  const getOperatorSymbol = (op) => {
    switch (op) {
      case "*": return "×";
      case "/": return "/";
      case "+": return "+";
      case "-": return "-";
      default: return "";
    }
  };

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={[styles.displayText, { fontSize: getFontSize() }]}>{input}</Text>
      </View>
      
      {/* Main grid with operators on right */}
      <View style={styles.buttonGrid}>
        {/* Left section with numbers and function buttons */}
        <View style={styles.leftSection}>
          {/* Row with C and DEL */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.functionButton, styles.wideButton]}
              onPress={handleClear}
            >
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.functionButton]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>DEL</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row with 7-8-9 */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("7")}
            >
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("8")}
            >
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("9")}
            >
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row with 4-5-6 */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("4")}
            >
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("5")}
            >
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("6")}
            >
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row with 1-2-3 */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("1")}
            >
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("2")}
            >
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={() => handleNumber("3")}
            >
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row with 0 and . */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton, styles.wideButton]}
              onPress={() => handleNumber("0")}
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.numberButton]}
              onPress={handleDecimal}
            >
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Right section with operators */}
        <View style={styles.operatorSection}>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operator === "/" ? styles.activeOperator : null]}
            onPress={() => handleOperator("/")}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operator === "*" ? styles.activeOperator : null]}
            onPress={() => handleOperator("*")}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operator === "-" ? styles.activeOperator : null]}
            onPress={() => handleOperator("-")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operator === "+" ? styles.activeOperator : null]}
            onPress={() => handleOperator("+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, styles.equalsButton]}
            onPress={handleEquals}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  displayContainer: {
    height: SCREEN_WIDTH * 0.6,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingBottom: 20,
  },
  displayText: {
    color: "white",
    textAlign: "right",
  },
  buttonGrid: {
    flex: 1,
    flexDirection: "row",
  },
  leftSection: {
    width: SCREEN_WIDTH * 0.75,
  },
  operatorSection: {
    width: SCREEN_WIDTH * 0.25,
  },
  row: {
    flexDirection: "row",
    height: BUTTON_SIZE,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#333",
  },
  numberButton: {
    backgroundColor: "gray",
  },
  operatorButton: {
    backgroundColor: "orange",
  },
  activeOperator: {
    backgroundColor: "#FFD700",
  },
  functionButton: {
    backgroundColor: "gray",
  },
  equalsButton: {
    backgroundColor: "orange",
  },
  wideButton: {
    width: BUTTON_SIZE * 2,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  }
});

export default Calculator;