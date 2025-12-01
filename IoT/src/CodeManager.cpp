#include "CodeManager.h"
#include "Configuration.h"
#include "LEDManager.h"

CodeManager::CodeManager() 
    : gameRunning(false)
    , currentCodeIndex(0)
    , codeEnded(false)
    , highScore(0)
{}

CodeManager::~CodeManager() 
{
    delete[] code;
}

void CodeManager::startCode(FirestoreChallenge challenge) {
    Serial.println("Starting game");

    //Enregistrement de la longueur code et du code sous forme de tableau de int
    currentCodeLength = currentCodeLength;

    int* newCode = new int[currentCodeLength];
    for (int i = 0; i < currentCodeLength; i++) {
        char sequenceIndex = currentChallenge.sequence.charAt(i);

        //Soustraire par '0' pour avoir la valeur numérique du caractère
        int numberSequenceIndex = sequenceIndex - '0';
        newCode[i] = numberSequenceIndex;
    }

    //S'assurer d'effacer le code dans le cas où il a une valeur (ain't doing no memory leaks over here)
    delete[] code;
    code = newCode;

    //Reset les variables
    codeEnded = false;
    currentCodeIndex = 0;

    //Fait allumer les leds
    flashAllLeds(3);
    Serial.println("Game started");

    //Débute le jeu
    gameRunning = true;
}

void CodeManager::showCodeLight(int delayTime) {
    //Loop pour chaque caractères de la s équence et allume la lumière
    for (int i = 0; i < currentCodeLength; i++) {
        flashSingleLed(code[i], delayTime);
    }
}

void CodeManager::endGame() {
    
}

void CodeManager::resetSequence() {
    //Réinitialise les variables
    codeEnded = false;
    currentCodeIndex = 0;
}

void CodeManager::verifyInput(int input) {
    //Vérifie si l'input est égal à la couleur actuelle du code
    if (code[currentCodeIndex] == input) {
        //Si c'est la bonne couleur, passe à la prochaine couleur et affiche la LED pressée
        currentCodeIndex++;
        flashSingleLed(input, LED_DELAY_TIME/2);
    } else {
        //Sinon finit le jeu
        endGame();
    }

    //Si l'index de la couleur dépasse la longueur du code, ça veut dire que le code est finit et on peut regénérer le code
    if (currentCodeIndex >= currentCodeLength) {
        Serial.println("Code completed");
        codeEnded = true;
        flashAllLeds(1, WAVE_DELAY_TIME);
    }
}

bool CodeManager::isGameRunning() {
    return gameRunning;
}

int CodeManager::getCurrentCodeLength() {
    return currentCodeLength;
}

bool CodeManager::isCodeEnded() {
    return codeEnded;
}