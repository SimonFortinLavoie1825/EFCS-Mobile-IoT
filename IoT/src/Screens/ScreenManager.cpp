#include "Screens/ScreenManager.h"

const ScreenType ScreenManager::START_SCREEN = ScreenType::CHALLENGE;
const String ScreenManager::DIFFICULTIES[NBR_DIFFICULTIES] = {"Normal", "Expert"};

ScreenManager::ScreenManager()
{
    dfScreen = new DFRobot_ST7789_240x320_HW_SPI(TFT_DC, TFT_CS, TFT_RST);
    dfScreen->begin();
    dfScreen->setTextSize(2);
    dfScreen->setTextColor(COLOR_RGB565_WHITE);

    screen = nullptr;
}

ScreenManager::~ScreenManager() {
    delete screen;
    delete dfScreen;
}

// Enregistre le contexte et affiche l'écran de départ
void ScreenManager::init() {
    //Start Mr. Firestore
    firestoreManager.startUp();

    context = new Context;
    
    currentlyShownScreen = START_SCREEN;

    Serial.println("change screen");
    changeScreen(currentlyShownScreen);
}

// Affiche le texte sur l'écran actuel
void ScreenManager::draw() {
    screen->draw();
}

// Update l'écran actuel et s'assure que le bon écran est affiché
void ScreenManager::update(Inputs& inputs) {
    screen->update(inputs);

    ScreenType nextScreen = screen->getCurrentScreen();

    if (nextScreen != currentlyShownScreen) {
        changeScreen(nextScreen);
        currentlyShownScreen = nextScreen;
    }

    if (currentlyShownScreen == ScreenType::END) {
        //Si le status du SelectedChallenge n'est plus pending ou n'est pas vide, ça veut dire que le challenge à été soit réussi, soit échoué. Dans tous les cas, on update les points dans le FirestoreManager
        if (context->selectedChallenge.status == "Reussi" || context->selectedChallenge.status == "Echoue") {
            int foundIndex = context->nbrChallenges+1;
            
            for (int i = 0; i < context->nbrChallenges; i++) {
                if (context->allChallenges[i].index == context->selectedChallenge.index) {
                    foundIndex = i;
                    break;
                }
            }

            if (firestoreManager.saveChallenge(context->selectedChallenge.pointsObtained, foundIndex)) {
                context->selectedChallenge.status = "Enregistre";

                loadScores();
            } else {
                Serial.println("Failure in code saving");
            }
        }
    }
}

//Crée de nouvelle scènes dépendamment de l'argument newScreenType
void ScreenManager::changeScreen(ScreenType newScreenType) {
    Screen* newScreen;

    if (newScreenType == ScreenType::CHALLENGE) {
        loadScores();

        if (context->nbrChallenges == 0) {
            newScreenType = ScreenType::NO_CHALLENGE;
        }
    }

    switch (newScreenType) {
    case ScreenType::CHALLENGE: {
        newScreen = new ChallengeScreen(ScreenType::CHALLENGE, ScreenType::DIFFICULTY, *context, dfScreen);
        
        //Prends tous les challengers et le met dans un array de texte
        String* newText = nullptr;

        if (context->nbrChallenges != 0) {
            newText = new String[context->nbrChallenges];

            for (int i = 0; i < context->nbrChallenges; i++) {
                newText[i] = context->allChallenges[i].challenger;
            }
        }

        newScreen->setText(newText, context->nbrChallenges);
        delete[] newText;

        break;
    }
    case ScreenType::NO_CHALLENGE: {
        newScreen = new EndScreen(ScreenType::NO_CHALLENGE, ScreenType::CHALLENGE, *context, dfScreen);

        //Fallback dans le cas où quelque chose arrive (Je sais pas comment mais ça fait pas mal de le mettre)
        String newText[] = {"Aucun challenenge trouve", "Relancer la recherche"};
        
        newScreen->setText(newText, 2);
        
        break;
    }
    case ScreenType::CHALLENGE_IN_PROGESS: {
        newScreen = new GameScreen(ScreenType::CHALLENGE_IN_PROGESS, ScreenType::END, *context, dfScreen);

        //Mets un texte fixe, un array est nécessaire vu que le setText s'attends à un pointeur ou un array
        String newText[] = {"Defi en cours"};

        newScreen->setText(newText, 1);
        
        break;
    }
    case ScreenType::DIFFICULTY: {
        newScreen = new DifficultyScreen(ScreenType::DIFFICULTY, ScreenType::CHALLENGE_IN_PROGESS, *context, dfScreen);
        
        //Array de string de la grosseur du nombre de difficuité (Établi dans le Configuration.h)
        String newText[NBR_DIFFICULTIES];
        
        for (int i = 0; i < NBR_DIFFICULTIES; i++) {
            newText[i] = DIFFICULTIES[i];
        }

        newScreen->setText(newText, NBR_DIFFICULTIES);

        break;
    }
    case ScreenType::END: {
        newScreen = new EndScreen(ScreenType::END, ScreenType::CHALLENGE, *context, dfScreen);

        //Convertis le nombre de points en string
        String pointsString = String(context->selectedChallenge.pointsObtained);
        //Fait un array de String avec tous les textes et valeurs à écrire
        String newText[] = {"Partie finie, resultat de la partie: ", context->selectedChallenge.status, "Nombre points: ", pointsString, "Retour a la page principale?"};
        
        newScreen->setText(newText, 5);
        
        break;
    }
    default:
        newScreen = new EndScreen(ScreenType::END, ScreenType::CHALLENGE, *context, dfScreen);

        //Fallback dans le cas où quelque chose arrive (Je sais pas comment mais ça fait pas mal de le mettre)
        String newText[] = {"Un probleme est arrive", "Retour a la page principale"};
        
        newScreen->setText(newText, 2);
        
        break;
    }

    if (screen != nullptr) {
        delete screen;
    }

    screen = newScreen;
    delay(SWITCH_SCREEN_DELAY);
}

void ScreenManager::loadScores() {
    firestoreManager.loadChallenges(PLAYER_ID);

    context->allChallenges = firestoreManager.getChallenges();
    context->nbrChallenges = firestoreManager.getChallengeCount();
}