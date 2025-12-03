#include "Screens/MenuScreen.h"

MenuScreen::MenuScreen(ScreenType type, ScreenType nextScreen, Context& context)
    : Screen(type, nextScreen, context)
    , currentSelection(0)
{
}

MenuScreen::~MenuScreen()
{
}

void MenuScreen::draw() {
    //Reset l'écran
    screen->setCursor(0, 0);
    screen->fillRect(0, 0, screen->width(), screen->height() / 3,COLOR_RGB565_BLACK);

    //Écrit en blanc sauf pour le texte que le joueur a séléctionné
    for (int i = 0; i < textCount; i++) {
        if (i == currentSelection) {
            screen->setTextColor(COLOR_RGB565_YELLOW);
            screen->println(screenText[i]);
        } else {
            screen->setTextColor(COLOR_RGB565_WHITE);
            screen->println(screenText[i]);
        }
    }
}

void MenuScreen::update(Inputs& inputs) {

    //Contrôle du menu
    if (inputs.yJoy > 0) {
        currentSelection++;
        if (currentSelection >= textCount) {
            currentSelection = 0;
        }

        delay(OPTIONS_DELAY);
    }
    else if (inputs.yJoy < 0) {
        currentSelection--;
        if (currentSelection < 0) {
            currentSelection = textCount-1;
        }

        delay(OPTIONS_DELAY);
    } 
}