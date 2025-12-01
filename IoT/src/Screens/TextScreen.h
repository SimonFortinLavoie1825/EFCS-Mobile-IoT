#include "Screens/TextScreen.h"

TextScreen::TextScreen(ScreenType nextScreen)
    : Screen(type)
    , nextScreen(nextScreen)
{
}

TextScreen::~TextScreen() {
}

void TextScreen::draw() {
    screen->setCursor(0, 0);
    screen->fillRect(0, 0, screen->width(), screen->height() / 3,COLOR_RGB565_BLACK);

    for (int i = 0; i < textCount; i++) {
        screen->setTextColor(COLOR_RGB565_WHITE);
        screen->println(screenText[i]);
    }
}

void TextScreen::update(Inputs& inputs) {
    if (inputs.btnJoy) {
        currentScreen = nextScreen;
    }
}