#include "Screens/GameScreen.h"

GameScreen::GameScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen)
    : Screen(type, nextScreen, context, screen)
    , gameRunning(false)
    , codeManager(CodeManager(context.selectedChallenge.sequence))
{
    if (context.difficulty == "Expert") {
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
    screen->fillScreen(COLOR_RGB565_BLACK);

    //Remplir avec du texte blanc 
    for (int i = 0; i < textCount; i++) {
        screen->setTextColor(COLOR_RGB565_WHITE);
    }
}

void GameScreen::update(Inputs& inputs) {
    // Démarre le jeu s'il ne l'est pas encore entrain de rouler
    if (!gameRunning) {
        gameRunning = true;
        codeManager.startCode();
        codeManager.showCodeLight(BASE_LED_DELAY_TIME / difficulty);
    } else {
        if (inputs.currentButtonPressed() !=0) {
            // À faire seulement si le code est pas fini
            if (!codeManager.hasCodeEnded()) {
                
                // Vérifier si l'input à l'index du code est correct
                if (codeManager.verifyInput(inputs.currentButtonPressed())) {
                    // Si oui, on change d'index
                    codeManager.switchCodeIndex();
                } else {
                    // Si non, l'utilisateur à échoué. Enregistre le statut du Challenge, enregistre le nombre de points perdu et change d'écran
                    context->selectedChallenge.status = "Echoue";
                    context->selectedChallenge.pointsObtained = -codeManager.getCodeLength() * difficulty;
                    Screen::switchScreen();
                }
            } 

            //Pas dans un else car le codeEnded peut changer depuis le premier if et on veut vérifier si ça s'est passé dans un cycle d'update, ce qui ne peut pas être fait dans le cas d'un else
            if (codeManager.hasCodeEnded()) {
                // Si le code est terminé, ça veut dire que l'utilisateur l'a réussi. Enregistre le statut du Challenge, enregistre le nombre de points gagnés et change d'écran
                context->selectedChallenge.status = "Reussi";
                context->selectedChallenge.pointsObtained = codeManager.getCodeLength() * difficulty;
                Serial.println(context->selectedChallenge.status);
                Screen::switchScreen();
            }
        }
    }
}