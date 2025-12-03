#include "Screens/DifficultyScreen.h"

DifficultyScreen::DifficultyScreen(ScreenType type, ScreenType nextScreen, Context& context)
    : MenuScreen(type, nextScreen, context)
{
}

DifficultyScreen::~DifficultyScreen()
{
}

void DifficultyScreen::update(Inputs& inputs) {
  MenuScreen::update(inputs);
  
  if (inputs.btnJoy) {
    switchScreen();
  }
}

void DifficultyScreen::switchScreen() {
    //Enregistre la difficulté séléctionnée
    context.difficulty = screenText[currentSelection];
    Screen::switchScreen();
}