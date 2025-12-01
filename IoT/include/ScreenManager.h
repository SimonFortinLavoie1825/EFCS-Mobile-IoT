#pragma once

#include <Arduino.h>
#include "Configuration.h"
#include "DHT.h"
#include <DFRobot_GDL.h>
#include "Screens/Screen.h"

class ScreenManager {
    public:
        ScreenManager();
        ~ScreenManager();

        void draw();
    private:
        
};