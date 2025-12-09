#include "LEDManager.h"
#include "CodeManager.h"
#include "FirestoreManager.h"
#include "Inputs/Inputs.h"
#include "Context.h"
#include "Screens/ScreenManager.h"

Inputs inputs;

ScreenManager screenManager;

void setup() {
  Serial.begin(9600); 

  //Pin setup time
  pinMode(FIRST_LED, OUTPUT);
  pinMode(SECOND_LED, OUTPUT);
  pinMode(THIRD_LED, OUTPUT);

  pinMode(FIRST_BTN, INPUT_PULLUP);
  pinMode(SECOND_BTN, INPUT_PULLUP);
  pinMode(THIRD_BTN, INPUT_PULLUP);

  //Démarre le screenManager
  screenManager.init();
}

void loop() {
  // Enregistre les inputs
  inputs.manageInputs();
  
  screenManager.update(inputs);
  screenManager.draw();

  while (!inputs.hasJoystickInputs() && !inputs.buttonsPressed())
  {
    inputs.manageInputs();
  }

  
}