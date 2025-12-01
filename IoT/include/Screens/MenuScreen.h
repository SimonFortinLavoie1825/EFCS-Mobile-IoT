#include "Screen.h"

class MenuScreen:
    public Screen
{
    public:
        MenuScreen(ScreenType* screenOptions, ScreenType type);
        ~MenuScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
    private:
        int currentSelection;
        ScreenType* options;
};