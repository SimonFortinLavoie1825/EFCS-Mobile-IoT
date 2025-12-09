#pragma once

#include "Configuration.h"
#include <Arduino.h>

class Inputs
{
    public:
        Inputs();
        
        void reset();

        void manageInputs();

        bool buttonsPressed();
        bool hasJoystickInputs();

        int currentButtonPressed();
        
        bool firstBtn;
        bool secondBtn;
        bool thirdBtn;
        int xJoy;
        int yJoy;
        bool btnJoy;

    private:
        bool manageButtonInput(int btnPin);
        int manageJoystickInput(int joyPin);
};