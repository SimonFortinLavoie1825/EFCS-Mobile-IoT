#include "Screens/EndScreen.h"

EndScreen::EndScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen)
    : Screen(type, nextScreen, context, screen)
{
}

EndScreen::~EndScreen() {
}

void EndScreen::draw() {
    //Reset l'écran
    screen->setCursor(0, 0);
    screen->fillScreen(COLOR_RGB565_BLACK);

    for (int i = 0; i < textCount; i++) {
        //Pour la dernière option, on écrit en jaune (pour signifier un input du joueur)
        if (i == textCount-1) {
            screen->setTextColor(COLOR_RGB565_YELLOW);
            screen->println(screenText[i]);
        } else {
            //Sinon on écrit en blanc
            screen->setTextColor(COLOR_RGB565_WHITE);
            screen->println(screenText[i]);
        }
    }
}

void EndScreen::update(Inputs& inputs) {
    if (inputs.btnJoy) {
        switchScreen();
    }
}

void EndScreen::switchScreen() {
    //Reset les variables du contexte
    context->difficulty = String("none");
    context->selectedChallenge = FirestoreChallenge();
    Screen::switchScreen();
}