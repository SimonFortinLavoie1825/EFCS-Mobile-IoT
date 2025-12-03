#pragma once

#include "MenuScreen.h"

class ChallengeScreen:
    public MenuScreen
{
    public:
        ChallengeScreen(ScreenType type, ScreenType nextScreen, Context& context);
        ~ChallengeScreen();

        virtual void update(Inputs& inputs) override;
        
        virtual void switchScreen() override;
};