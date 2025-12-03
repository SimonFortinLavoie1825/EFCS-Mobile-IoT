#pragma once

#include "Screen.h"

class EndScreen:
    public Screen
{
    public:
        EndScreen(ScreenType type, ScreenType nextScreen, Context& context);
        ~EndScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
        virtual void switchScreen() override;
};