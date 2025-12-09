#pragma once

#include "Screen.h"

class MenuScreen:
    public Screen
{
    public:
        MenuScreen(ScreenType type, ScreenType nextScreen, Context& context, DFRobot_ST7789_240x320_HW_SPI* screen);
        ~MenuScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
    protected:
        int currentSelection;
};