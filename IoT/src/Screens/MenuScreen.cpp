#include "Screens/MenuScreen.h"

MenuScreen::MenuScreen(ScreenType* screenOptions, ScreenType type)
    : Screen(type)
    , currentSelection(0)
{
    options = screenOptions;
}

MenuScreen::~MenuScreen()
{
    delete[] options;
}

void MenuScreen::draw() {
    screen->setCursor(0, 0);
    screen->fillRect(0, 0, screen->width(), screen->height() / 3,COLOR_RGB565_BLACK);

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

  if (inputs.btnJoy) {
    previousScreenInfo = screenText[currentSelection];
    currentScreen = options[currentSelection];
    delay(SWITCH_SCREEN_DELAY);
  }
}