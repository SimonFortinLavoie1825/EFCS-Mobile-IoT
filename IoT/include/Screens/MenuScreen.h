#pragma once

#include "Screen.h"

class MenuScreen:
    public Screen
{
    public:
        MenuScreen(ScreenType type, ScreenType nextScreen, Context& context);
        ~MenuScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
    protected:
        int currentSelection;
};