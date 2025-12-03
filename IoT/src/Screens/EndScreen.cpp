#include "Screens/EndScreen.h"

EndScreen::EndScreen(ScreenType type, ScreenType nextScreen, Context& context)
    : Screen(type, nextScreen, context)
{
}

EndScreen::~EndScreen() {
}

void EndScreen::draw() {
    //Reset l'écran
    screen->setCursor(0, 0);
    screen->fillRect(0, 0, screen->width(), screen->height() / 3,COLOR_RGB565_BLACK);

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
    context.difficulty = String("none");
    context.selectedChallenge = FirestoreChallenge();
    Screen::switchScreen();
}