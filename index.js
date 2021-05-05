const fs = require('fs');
const inquirer = require('inquirer');

/** Verify if the state have a epson transition */
const verifyEpsonTransition = ({ alphabet, indexState, transitions }) => {
  const epsonSymbol = '%e';
  const indexEpson = alphabet.indexOf(epsonSymbol);
  const toState = transitions[indexState][indexEpson];
  
  if (indexEpson < 0) return [];
  if (toState[0] === '*') return [];

  return toState;
};

/** make the transition to destiny state */
const makeTransition = async ({ toState, states}) => {
  await toState.map(( state ) => { 
    states.push(state)
  });
};

const manageEpsonTransition = async ({
  alphabet,
  indexState,
  indexSymbol,
  transitions
}) => {
  let toStateEpsonTransition = [];
  const toStateSymbol = transitions[indexState][indexSymbol];

  for (var indexStateSymbol = 0; indexStateSymbol < toStateSymbol.length; indexStateSymbol++) {
    const epsonTransitions = verifyEpsonTransition({ alphabet, indexState: indexStateSymbol, transitions });
    
    if (epsonTransitions.length) {
      toStateEpsonTransition.push(epsonTransitions);
  
      for (states of epsonTransitions) {
        // await makeTransition({ toState: epsonTransitions, states: newCurrentStates})
        await epsonTransitions.map(async (state) => {
          const indexStateEpsonTransition = states.indexOf(state);
          const toStateEpsonTransition = transitions[indexState][indexSymbol];
          const epsonSymbol = '%e';
          const indexEpson = alphabet.indexOf(epsonSymbol);
  
          const epsonSecondaryTransitions = await manageEpsonTransition({ alphabet, indexState: indexStateEpsonTransition, indexSymbol: indexEpson, transitions });
          if (epsonSecondaryTransitions.length) toStateEpsonTransition.push(epsonSecondaryTransitions);
        });
      }
    }
  }

  return toStateEpsonTransition.flat();
}

const walkStates = async ({
  alphabet,
  states,
  transitions,
  symbol,
  currentStates
}) => {
  const newCurrentStates = [];
  
  for (var indexCurrentState = 0; indexCurrentState < currentStates.length; indexCurrentState++) {
    const currentState = currentStates[indexCurrentState];
    const indexSymbol = alphabet.indexOf(symbol);
    const indexState = states.indexOf(currentState);
    console.log('currentStates', currentStates);
    console.log('currentState', currentState);
    console.log('indexState', indexState);
    console.log('indexSymbol', indexSymbol);
    const toState = transitions[indexState][indexSymbol];

    /** Validate if the symbol is into the alphabet and if is, ignore the symbol */
    if (indexSymbol < 0) continue;

    const toStateEpsonTransition = await manageEpsonTransition({ alphabet, indexState, indexSymbol, transitions });;
    if (toStateEpsonTransition.length) await makeTransition({ toState: toStateEpsonTransition, states: newCurrentStates});
    
    await makeTransition({ toState, states: newCurrentStates})
  }

  return newCurrentStates;
}

const run = (async () => {
  try {
    const fileText = fs.readFileSync('./entries.txt', 'utf-8');
    const stepsFile = './steps.txt';
    const resultFile = './result.txt';
    
    /** format the text in lines and separate the data in variables */
    const [states, alphabet, initialState, acceptedStates, ...transitionsUnformatted] = fileText.split('\n').map(row => {
      /** Remove the comment from line and separate the elements by space */
      return row.split(/(\s+#)/g)[0].split(/\s/g);
    });

    let count = 0, elements = [], transitions = [];

    /** Format the transitions */
    transitionsUnformatted.map(element => {
      count ++;

      if (count > alphabet.length) {
        transitions.push(elements);
        count = 0;
        elements = [];
      }
      else elements.push(element);
    });
    
    /** Request the entry to the user */
    const answer = await inquirer.prompt({
      name: 'entry',
      message: 'Insira a entrada: ',
      type: 'input',
      default: '011'  // this entry will be accepted
    });

    /** Separate the entry in elements */
    const entry = answer.entry.split('');

    /** Open, or create if not exists, the steps file */
    await fs.open(stepsFile, 'w', () => {});

    /** Write in the file */
    await fs.writeFile(stepsFile, `\nEstados: ${states}`, () => {});
    await fs.appendFileSync(stepsFile, `\nEstados de Aceitação: ${acceptedStates}`, () => {});
    await fs.appendFileSync(stepsFile, `\nAlfabeto: ${alphabet}`, () => {});
    await fs.appendFileSync(stepsFile, '\n--------------------------------------------------', () => {});
    await fs.appendFileSync(stepsFile, `\nEntrada: ${answer.entry}`, () => {});
    await fs.appendFileSync(stepsFile, '\n--------------------------------------------------', () => {});
    await fs.appendFileSync(stepsFile, `\nEstado inicial: ${initialState}`, () => {});

    let entryAceppted = false, currentStates = [ initialState[0] ], newCurrentStates = [ initialState[0] ];

    for (const symbol of entry) {
      await fs.appendFileSync(stepsFile, `\nSímbolo lido: ${symbol}`, () => {});
      
      newCurrentStates = await walkStates({
        alphabet,
        states,
        transitions,
        symbol,
        currentStates,
      })

      await fs.appendFileSync(stepsFile, `\nEstados correntes: ${newCurrentStates.join(' ')}`, () => {});
      currentStates = newCurrentStates;
    }

    /** Open, or create if not exists, the result file */
    await fs.open(resultFile, 'w', () => {});
    
    entryAceppted = currentStates.some(state => !(acceptedStates.indexOf(state) < 0));

    /** Write the result in the result file */
    if (entryAceppted) await fs.writeFile(resultFile, `Entrada ${answer.entry} ACEITA`, () => {});
    else await fs.writeFile(resultFile, `Entrada ${answer.entry} REJEITADA`, () => {});
  } catch (error) {
    console.log('Error in AFND simulator:', error);
  }
});


run();