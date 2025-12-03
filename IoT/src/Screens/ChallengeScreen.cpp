#include "Screens/ChallengeScreen.h"

ChallengeScreen::ChallengeScreen(ScreenType type, ScreenType nextScreen, Context& context)
    : MenuScreen(type, nextScreen, context)
{
}

ChallengeScreen::~ChallengeScreen()
{
}

void ChallengeScreen::update(Inputs& inputs) {
  MenuScreen::update(inputs);

  if (inputs.btnJoy) {
    switchScreen();
  }
}

void ChallengeScreen::switchScreen() {
  //Enregistre le challenge séléctionné
  context.selectedChallenge = context.allChallenges[currentSelection];
  Screen::switchScreen();
}