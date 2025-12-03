#include "Screens/Screen.h"

Screen::Screen(ScreenType type, ScreenType nextScreen, Context& context) 
    : type(type)
    , currentScreen(type)
    , textCount(0)
    , context(context)
    , nextScreen(nextScreen)
{
    dht = new DHT(DHT_PIN, DHT_TYPE);
    screen = new DFRobot_ST7789_240x320_HW_SPI(TFT_DC, TFT_CS, TFT_RST);
    screenText = new String("");
}

Screen::~Screen() {
    delete dht;
    delete screen;
    delete[] screenText;
}

//Change le texte de l'écran pour les valeur du tableau "newText". Argument "newTextCount" nécessaire pour bien afficher le texte.
void Screen::setText(const String* newText, int newTextCount) {
    delete[] screenText;
    screenText = new String[newTextCount];

    for (int i = 0; i < newTextCount; i++) {
        screenText[i] = newText[i];
    }

    textCount = newTextCount;
}

// Retourne le type d'écran à afficher
ScreenType Screen::getCurrentScreen() {
    return currentScreen;
}

// Change l'écran actuel à celui déterminé par la valeur "nextScreen" donné à la création du Screen
void Screen::switchScreen() {
    currentScreen = nextScreen;
    delay(SWITCH_SCREEN_DELAY);
}