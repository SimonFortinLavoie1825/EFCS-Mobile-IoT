#include "Screens/Screen.h"

Screen::Screen(ScreenType type) 
    : type(type)
    , currentScreen(type)
    , textCount(0)
    , previousScreenInfo("")
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

void Screen::setText(const String* newText, int newTextCount) {
    delete[] screenText;
    screenText = new String[newTextCount];

    for (int i = 0; i < newTextCount; i++) {
        screenText[i] = newText[i];
    }

    textCount = newTextCount;
}