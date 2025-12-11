#include "Screens/ChallengeScreen.h"

ChallengeScreen::ChallengeScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen)
    : MenuScreen(type, nextScreen, context, screen)
{
}

ChallengeScreen::~ChallengeScreen()
{
}

void ChallengeScreen::draw() {
  MenuScreen::draw();
}

void ChallengeScreen::update(Inputs& inputs) {
  MenuScreen::update(inputs);

  if (inputs.btnJoy) {
    switchScreen();
  }
}

void ChallengeScreen::switchScreen() {
  //Enregistre le challenge séléctionné
  context->selectedChallenge = context->allChallenges[currentSelection];
  Serial.print("Selected challenge: ");
  Serial.print(context->selectedChallenge.challenger);
  Serial.print(", Sequence: ");
  Serial.print(context->selectedChallenge.sequence);
  Serial.print(", Length: ");
  Serial.println(context->selectedChallenge.sequence.length());
  Serial.print(", Index: ");
  Serial.println(context->selectedChallenge.index);
  Screen::switchScreen();
}