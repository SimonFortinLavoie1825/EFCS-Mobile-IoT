#pragma once

#include "MenuScreen.h"

class ChallengeScreen:
    public MenuScreen
{
    public:
        ChallengeScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen);
        ~ChallengeScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
        
        virtual void switchScreen() override;
};