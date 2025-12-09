#pragma once

#include "MenuScreen.h"

class DifficultyScreen:
    public MenuScreen
{
    public:
        DifficultyScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen);
        ~DifficultyScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
        
        virtual void switchScreen() override;
};