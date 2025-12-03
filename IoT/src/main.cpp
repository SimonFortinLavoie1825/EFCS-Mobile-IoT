#include "LEDManager.h"
#include "CodeManager.h"
#include "FirestoreManager.h"
#include "Inputs/Inputs.h"
#include "Context.h"
#include "Screens/ScreenManager.h"

FirestoreDataManager firestoreManager = FirestoreDataManager();

Inputs inputs = Inputs();
Context context = Context();

ScreenManager screenManager = ScreenManager();

void setup() {
  Serial.begin(9600); 

  //Pin setup time
  pinMode(FIRST_LED, OUTPUT);
  pinMode(SECOND_LED, OUTPUT);
  pinMode(THIRD_LED, OUTPUT);

  pinMode(FIRST_BTN, INPUT_PULLUP);
  pinMode(SECOND_BTN, INPUT_PULLUP);
  pinMode(THIRD_BTN, INPUT_PULLUP);

  //Start Mr. Firestore
  firestoreManager.startUp();

  //Ramasse tout les FirestoreChallenge et les mets dans Context.allChallenges
  context.allChallenges = firestoreManager.getChallenges();

  //Démarre le screenManager
  screenManager.init(context);
}

void loop() {
  // Enregistre les inputs
  inputs.manageInputs();

  screenManager.update(inputs);
  screenManager.draw();

  //Si le status du SelectedChallenge n'est plus pending, ça veut dire que le challenge à été soit réussi, soit échoué. Dans tous les cas, on update les points dans le FirestoreManager
  if (context.selectedChallenge.status != "pending")
    firestoreManager.saveChallenge(context.selectedChallenge);
}