#include "Screens/DifficultyScreen.h"

DifficultyScreen::DifficultyScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen)
    : MenuScreen(type, nextScreen, context, screen)
{
}

DifficultyScreen::~DifficultyScreen()
{
}

void DifficultyScreen::draw() {
  MenuScreen::draw();
}

void DifficultyScreen::update(Inputs& inputs) {
  MenuScreen::update(inputs);
  
  if (inputs.btnJoy) {
    switchScreen();
  }
}

void DifficultyScreen::switchScreen() {
    //Enregistre la difficulté séléctionnée
    context->difficulty = screenText[currentSelection];
    Screen::switchScreen();
}