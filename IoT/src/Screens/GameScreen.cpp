#include "Screens/GameScreen.h"

GameScreen::GameScreen(ScreenType type, ScreenType nextScreen, Context& context)
    : Screen(type, nextScreen, context)
    , gameRunning(false)
    , codeManager(CodeManager(context.selectedChallenge))
{
    if (context.difficulty = "Expert") {
        difficulty = 2;
    } else {
        difficulty = 1;
    }
}

GameScreen::~GameScreen() {
}

void GameScreen::draw() {
    //Reset l'écran
    screen->setCursor(0, 0);
    screen->fillRect(0, 0, screen->width(), screen->height() / 3,COLOR_RGB565_BLACK);

    //Remplir avec du texte blanc 
    for (int i = 0; i < textCount; i++) {
        screen->setTextColor(COLOR_RGB565_WHITE);
        screen->println(screenText[i]);
    }
}

void GameScreen::update(Inputs& inputs) {
    // Démarre le jeu s'il ne l'est pas encore entrain de rouler
    if (!gameRunning) {
        codeManager.startCode();
        gameRunning = true;
        codeManager.showCodeLight(BASE_LED_DELAY_TIME / difficulty);
    }

    // À faire seulement si le code est pas fini
    if (!codeManager.hasCodeEnded()) {
        while (!inputs.buttonsPressed()) {/*Rien faire durant ce temps là*/} 

        // Vérifier si l'input à l'index du code est correct
        if (codeManager.verifyInput(inputs.currentButtonPressed())) {
            // Si oui, on change d'index
            codeManager.switchCodeIndex();
        } else {
            // Si non, l'utilisateur à échoué. Enregistre le statut du Challenge, enregistre le nombre de points perdu et change d'écran
            context.selectedChallenge.status = "Échoué";
            context.selectedChallenge.pointsObtained = -codeManager.getCodeLength() * difficulty;
            Screen::switchScreen();
        }
    } else {
        // Si le code est terminé, ça veut dire que l'utilisateur l'a réussi. Enregistre le statut du Challenge, enregistre le nombre de points gagnés et change d'écran
        context.selectedChallenge.status = "Réussi";
        context.selectedChallenge.pointsObtained = codeManager.getCodeLength() * difficulty;
        Screen::switchScreen();
    }
}