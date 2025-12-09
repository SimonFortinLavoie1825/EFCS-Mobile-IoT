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

    //Écrit en blanc
    for (int i = 0; i < textCount; i++) {
        screen->setTextColor(COLOR_RGB565_WHITE);
        screen->println(screenText[i]);

        //À part pour la dernière option où on écrit en jaune (pour signifier un input du joueur)
        if (i == textCount-1) {
            screen->setTextColor(COLOR_RGB565_YELLOW);
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