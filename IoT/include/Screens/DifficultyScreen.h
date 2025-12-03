#pragma once

#include "MenuScreen.h"

class DifficultyScreen:
    public MenuScreen
{
    public:
        DifficultyScreen(ScreenType type, ScreenType nextScreen, Context& context);
        ~DifficultyScreen();

        virtual void update(Inputs& inputs) override;
        
        virtual void switchScreen() override;
};