#include "Inputs/Inputs.h"

Inputs::Inputs() {
    reset();
}

// Réinitialise toutes les variables du Input à leur valeur de base
void Inputs::reset() {
    firstBtn = secondBtn = thirdBtn = btnJoy = false; 
    xJoy = yJoy = 0;
}

// Lis les différents boutons/joysticks et les enregistre dans les variables
void Inputs::manageInputs() {
    firstBtn = manageButtonInput(FIRST_BTN);
    secondBtn = manageButtonInput(SECOND_BTN);
    thirdBtn = manageButtonInput(THIRD_BTN);

    btnJoy = manageButtonInput(JOY_BTN);

    xJoy = manageJoystickInput(JOY_X);
    yJoy = manageJoystickInput(JOY_Y);
}

// Retourne True si le bouton associé à la pin de l'argument "btnPin" est pressé, False si il n'est pas pressé
bool Inputs::manageButtonInput(int btnPin) {
    int val = digitalRead(btnPin);
    bool buttonPressed = false;

    if (val == LOW && !buttonPressed) {
        buttonPressed = true;
    } else if (val == HIGH) {
        buttonPressed = false;
    }
    return buttonPressed;
}

// Retourne True si au moins un bouton est pressé, False si aucun l'est
bool Inputs::buttonsPressed() {
    return firstBtn || secondBtn || thirdBtn;
}

// Retourne True si au moins un bouton est pressé, False si aucun l'est
bool Inputs::hasJoystickInputs() {
    return btnJoy || xJoy != 0 || yJoy != 0;
}

// Retourne 1 si premier bouton est pressé, 2 si deuxième, 3 si troisième, 0 si aucun ou plusieurs pressés en même temps
int Inputs::currentButtonPressed() {
    /* code trouvé avec l'aide de ChatGPT
    Prompt:
    if (firstBtn && !secondBtn && !thirdBtn) {
        return 1;
    } else if (secondBtn && !thirdBtn) { 
        return 2;
    } else if (thirdBtn) { 
        return 3; 
    } else { 
        return 0; 
    }
    
    I have this code that returns which button is pressed and makes sure that it only returns one button press (incase of multiple presses at the same time). 
    Is there a more elegant way to achieve the same result?
    */

    // Vu que les booleans peuvent être convertis en valeur numérique (0: false, 1: true), les additionner va additioner leur valeur numérique. 
    // Alors, si cette somme est pas égal à 1, ça veut dire que soit aucun bouton est pressé, ou que plusieurs boutons sont pressés 
    if (firstBtn + secondBtn + thirdBtn != 1)
        return 0;

    return firstBtn ? 1 : secondBtn ? 2 : 3;
}

// Retourne 1 si le joystick associé à la pin de l'argument "joyPin" pointe vers le haut, -1 si pointe vers le bas, 0 si est neutre
int Inputs::manageJoystickInput(int joyPin) {
    int val = analogRead(joyPin);

    // 1 si pointe vers le haut, -1 si pointe vers le bas, 0 si est neutre
    return val > UP_JOYSTICK_VALUE ? 1 : val < DOWN_JOYSTICK_VALUE ? -1 : 0;
}