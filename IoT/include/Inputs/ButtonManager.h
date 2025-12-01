#pragma once

#include <Arduino.h>
#include "Configuration.h"

class ButtonManager {
    public:
        ButtonManager();
        void manageInputs();

        int currentColorPressed();
    
    private:
        bool whiteBtn;
        bool greenBtn;
        bool blueBtn;

        bool manageSingleInput(int btnPin);
};