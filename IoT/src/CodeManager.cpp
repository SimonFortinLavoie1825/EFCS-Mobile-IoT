#include "CodeManager.h"
#include "Configuration.h"
#include "LEDManager.h"

CodeManager::CodeManager(const FirestoreChallenge challenge) 
    : codeIndex(0)
    , codeEnded(false)
    , currentChallenge(challenge)
{}

CodeManager::~CodeManager() 
{
    delete[] code;
}


// Démarre la partie et enregistre le code qui a été donné à la création du CodeManager
void CodeManager::startCode() {
    Serial.println("Starting game");

    //Enregistrement de la longueur code et du code sous forme de tableau de int
    codeLength = codeLength;

    for (int i = 0; i < codeLength; i++) {
        char sequenceIndex = currentChallenge.sequence.charAt(i);

        //Soustraire par '0' pour avoir la valeur numérique du caractère
        int numberSequenceIndex = sequenceIndex - '0';
        code[i] = numberSequenceIndex;
    }

    //Fait allumer les leds
    flashAllLeds(3);
    Serial.println("Game started");
}

// Affiche les lumières du code avec un délai déterminé par l'argument "delayTime"
void CodeManager::showCodeLight(int delayTime) {
    //Loop pour chaque caractères de la s équence et allume la lumière
    for (int i = 0; i < codeLength; i++) {
        flashSingleLed(code[i], delayTime);
    }
}

// Changer l'index du code pour passer à la prochaine couleur
void CodeManager::switchCodeIndex() {
    codeIndex++;

    //Si l'index de la couleur dépasse la longueur du code, ça veut dire que le code est finit
    if (codeIndex >= codeLength) {
        Serial.println("Code completed");
        codeEnded = true;
    }
}

// Vérifie si l'input est égal à la couleur situé à l'index actuel du code, retourne True si la réponse est correcte, False si ce ne l'est pas
bool CodeManager::verifyInput(int input) {
    if (code[codeIndex] == input) {
        flashSingleLed(input, BASE_LED_DELAY_TIME/2);
        return true;
    } else {
        return false;
    }
}

bool CodeManager::hasCodeEnded() {
    return codeEnded;
}

int CodeManager::getCodeLength() {
    return codeLength;
}