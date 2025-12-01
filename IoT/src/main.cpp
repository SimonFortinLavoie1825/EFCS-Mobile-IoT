#include "LEDManager.h"
#include "CodeManager.h"
#include "FirestoreDataManager.h"
#include "Inputs/ButtonManager.h"

FirestoreDataManager firestoreManager = FirestoreDataManager();
CodeManager gameManager = CodeManager();
ButtonManager inputManager = ButtonManager();

void setup() {
  Serial.begin(9600); 

  //Pin setup time
  pinMode(WHITE_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

  pinMode(WHITE_BTN, INPUT_PULLUP);
  pinMode(GREEN_BTN, INPUT_PULLUP);
  pinMode(BLUE_BTN, INPUT_PULLUP);

  //Start Mr. Firestore
  firestoreManager.startUp();
}

void loop() {
  //Vérifie si le jeux joue, si non, il le démarre
  if (!gameManager.isGameRunning()) {
    gameManager.startCode();
  }

  //Affiche la lumière du code du jeu
  gameManager.showCodeLight();

  //Tant que le code n'a pas été fini ou que le jeu est encore entrain de rouler
  while (!gameManager.isCodeEnded() && gameManager.isGameRunning()) {
    do
    {
      //Regarde quel bouton est cliqué tant qu'il n'y a rien de pressé
      inputManager.manageInputs();
    } while (inputManager.currentColorPressed() == NO_COLOR);

      //Vérifie cet input
      gameManager.verifyInput(inputManager.currentColorPressed());
  }

  //Si le code est finit (obligatoire vu que la while peut se terminer dans le cas où le jeu finit)
  if (gameManager.isCodeEnded()) {
    //Fait un nouveau code
    gameManager.resetSequence();
  }
}