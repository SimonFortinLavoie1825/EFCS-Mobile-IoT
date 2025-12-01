#include "Inputs/ButtonManager.h"

ButtonManager::ButtonManager() 
    : whiteBtn(false)
    , greenBtn(false)
    , blueBtn(false)
{}

void ButtonManager::manageInputs() {
    whiteBtn = manageSingleInput(WHITE_BTN);
    greenBtn = manageSingleInput(GREEN_BTN);
    blueBtn = manageSingleInput(BLUE_BTN);
}

int ButtonManager::currentColorPressed() {
    if (whiteBtn && !greenBtn && !blueBtn) {
        return WHITE_LED;
    } else if (greenBtn && !blueBtn) {
        return GREEN_LED;
    } else if (blueBtn) {
        return BLUE_LED;
    } else {
        return NO_COLOR;
    }
}

bool ButtonManager::manageSingleInput(int btnPin) {
    if (digitalRead(btnPin) == LOW) {
        delay(50); 
        if (digitalRead(btnPin) == LOW) {
            return true;
        }
    }

    return false;
}