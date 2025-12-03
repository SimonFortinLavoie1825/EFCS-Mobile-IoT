#pragma once

#include "Screen.h"
#include <CodeManager.h>

class GameScreen:
    public Screen
{
    public:
        GameScreen(ScreenType type, ScreenType nextScreen, Context& context);
        ~GameScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
    private:
        bool gameRunning;

        int difficulty;
        CodeManager codeManager;
};