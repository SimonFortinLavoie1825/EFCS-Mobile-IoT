#include "Screens/ScreenManager.h"

const ScreenType ScreenManager::START_SCREEN = ScreenType::CHALLENGE;
const String ScreenManager::DIFFICULTIES[NBR_DIFFICULTIES] = {"Normal", "Expert"};

ScreenManager::ScreenManager()
{
}

ScreenManager::~ScreenManager() {
    delete screen;
}

// Enregistre le contexte et affiche l'écran de départ
void ScreenManager::init(Context& newContext) {
    context = newContext;
    currentlyShownScreen = START_SCREEN;

    changeScreen(currentlyShownScreen);
}

// Affiche le texte sur l'écran actuel
void ScreenManager::draw() {
    screen->draw();
}

// Update l'écran actuel et s'assure que le bon écran est affiché
void ScreenManager::update(Inputs& inputs) {
    inputs.manageInputs();

    ScreenType nextScreen = screen->getCurrentScreen();

    if (nextScreen != currentlyShownScreen) {
        changeScreen(nextScreen);
    }
}

//Crée de nouvelle scènes dépendamment de l'argument newScreen
void ScreenManager::changeScreen(ScreenType newScreen) {
    switch (newScreen) {
    case ScreenType::CHALLENGE: {
        Screen* newScreen = new ChallengeScreen(ScreenType::CHALLENGE, ScreenType::DIFFICULTY, context);
        
        //Prends tous les challengers et le met dans un array de texte
        String newText[context.nbrChallenges];
        
        for (int i = 0; i < context.nbrChallenges; i++) {
            newText[i] = context.allChallenges[i].challenger;
        }

        newScreen->setText(newText, context.nbrChallenges);

        //J'aime pas les memory leaks
        delete screen;
        screen = newScreen;
        break;
    }
    case ScreenType::CHALLENGE_IN_PROGESS: {
        Screen* newScreen = new GameScreen(ScreenType::CHALLENGE_IN_PROGESS, ScreenType::END, context);

        //Mets un texte fixe, un array est nécessaire vu que le setText s'attends à un pointeur ou un array
        String newText[] = {"Défi en cours"};

        newScreen->setText(newText, 1);
        
        delete screen;
        screen = newScreen;
        break;
    }
    case ScreenType::DIFFICULTY: {
        Screen* newScreen = new DifficultyScreen(ScreenType::DIFFICULTY, ScreenType::CHALLENGE_IN_PROGESS, context);
        
        //Array de string de la grosseur du nombre de difficuité (Établi dans le Configuration.h)
        String newText[NBR_DIFFICULTIES];
        
        for (int i = 0; i < NBR_DIFFICULTIES; i++) {
            newText[i] = DIFFICULTIES[i];
        }

        newScreen->setText(newText, NBR_DIFFICULTIES);

        delete screen;
        screen = newScreen;
        break;
    }
    case ScreenType::END: {
        Screen* newScreen = new EndScreen(ScreenType::END, ScreenType::CHALLENGE, context);

        //Convertis le nombre de points en string
        String pointsString = String(context.selectedChallenge.pointsObtained + '0');
        //Fait un array de String avec tous les textes et valeurs à écrire
        String newText[] = {"Partie finie, résultat de la partie: ", context.selectedChallenge.status, "Nombre points: ", pointsString, "Retour à la page principale?"};
        
        newScreen->setText(newText, 5);
        
        delete screen;
        screen = newScreen;
        break;
    }
    default:
        Screen* newScreen = new EndScreen(ScreenType::END, ScreenType::CHALLENGE, context);

        //Fallback dans le cas où quelque chose arrive (Je sais pas comment mais ça fait pas mal de le mettre)
        String newText[] = {"Un problème est arrivé", "Retour à la page principale"};
        
        newScreen->setText(newText, 2);
        
        delete screen;
        screen = newScreen;
        break;
    }
}