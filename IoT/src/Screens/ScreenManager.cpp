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

    //Load tous les challenges du firestore et les mets dans le firestoreChallenges
    firestoreManager.loadChallenges(PLAYER_ID);

    context = new Context;

    //Ramasse tout les FirestoreChallenge et les mets dans Context.allChallenges
    context->allChallenges = firestoreManager.getChallenges();
    context->nbrChallenges = firestoreManager.getChallengeCount();
    currentlyShownScreen = START_SCREEN;

    Serial.println("change screen");
    changeScreen(currentlyShownScreen);
}

// Affiche le texte sur l'écran actuel
void ScreenManager::draw() {
    dfScreen->fillScreen(COLOR_RGB565_BLUE);
    dfScreen->setTextColor(COLOR_RGB565_YELLOW);
    dfScreen->setCursor(100, 10);
    dfScreen->println("Test");

    //screen->draw();
}

// Update l'écran actuel et s'assure que le bon écran est affiché
void ScreenManager::update(Inputs& inputs) {
    Serial.println("update");
    inputs.manageInputs();
    screen->update(inputs);

    ScreenType nextScreen = screen->getCurrentScreen();

    if (nextScreen != currentlyShownScreen) {
        changeScreen(nextScreen);
        currentlyShownScreen = nextScreen;
    }

    if (currentlyShownScreen == ScreenType::END) {
        //Si le status du SelectedChallenge n'est plus pending ou n'est pas vide, ça veut dire que le challenge à été soit réussi, soit échoué. Dans tous les cas, on update les points dans le FirestoreManager
        if (context->selectedChallenge.status == "Reussi" || context->selectedChallenge.status == "Echoue") {
            firestoreManager.saveChallenge(context->selectedChallenge);
            context->selectedChallenge.status == "Enregistre";
            Serial.println("Score saved");

            firestoreManager.loadChallenges(PLAYER_ID);
            context->allChallenges = firestoreManager.getChallenges();
            context->nbrChallenges = firestoreManager.getChallengeCount();
        } else {
            Serial.println(context->selectedChallenge.status);
        }
    }
}

//Crée de nouvelle scènes dépendamment de l'argument newScreenType
void ScreenManager::changeScreen(ScreenType newScreenType) {
    Screen* newScreen;

    switch (newScreenType) {
    case ScreenType::CHALLENGE: {
        newScreen = new ChallengeScreen(ScreenType::CHALLENGE, ScreenType::DIFFICULTY, *context, dfScreen);
        
        //Prends tous les challengers et le met dans un array de texte
        String* newText = new String[context->nbrChallenges];

        for (int i = 0; i < context->nbrChallenges; i++) {
            newText[i] = context->allChallenges[i].challenger;
        }

        newScreen->setText(newText, context->nbrChallenges);
        delete[] newText;

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
        String pointsString = String(context->selectedChallenge.pointsObtained + '0');
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