#pragma once

#include <Arduino.h>
#include "Configuration.h"
#include "DHT.h"
#include <DFRobot_GDL.h>
#include "Screens/Screen.h"
#include "Screens/ChallengeScreen.h"
#include "Screens/DifficultyScreen.h"
#include "Screens/GameScreen.h"
#include "Screens/EndScreen.h"
#include <FirestoreManager.h>

class ScreenManager {
    public:
        static const String DIFFICULTIES[NBR_DIFFICULTIES];
        static const ScreenType START_SCREEN;

        ScreenManager();
        ~ScreenManager();

        void init();
        void draw();
        void update(Inputs& inputs);

        void changeScreen(ScreenType newScreenType);
    private:
        void loadScores();

        ScreenType currentlyShownScreen;
        Screen* screen;
        Context* context;
        
        FirestoreDataManager firestoreManager;

        DFRobot_ST7789_240x320_HW_SPI* dfScreen;
};