#include "Inputs/Inputs.h"

Inputs::Inputs() {
    reset();
}

void Inputs::reset() {
    firstBtn = secondBtn = thirdBtn = btnJoy = false; 
    xJoy = yJoy = 0;
}