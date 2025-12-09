#include "Screens/Screen.h"

Screen::Screen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen) 
    : type(type)
    , currentScreen(type)
    , textCount(0)
    , context(&context)
    , nextScreen(nextScreen)
    , screen(screen)
{
    screenText = nullptr;
}

Screen::~Screen() {
    if (screenText != nullptr) {
        delete[] screenText;
    }
}

void Screen::init() {
}

//Change le texte de l'écran pour les valeur du tableau "newText". Argument "newTextCount" nécessaire pour bien afficher le texte.
void Screen::setText(const String* newText, int newTextCount) {
    if (screenText != nullptr) {
        delete[] screenText;
    }

    textCount = newTextCount;
    
    screenText = new String[textCount];

    for (int i = 0; i < textCount; i++) {
        screenText[i] = newText[i];
    }

}

// Retourne le type d'écran à afficher
ScreenType Screen::getCurrentScreen() {
    return currentScreen;
}

// Change l'écran actuel à celui déterminé par la valeur "nextScreen" donné à la création du Screen
void Screen::switchScreen() {
    currentScreen = nextScreen;
}