#include "Screen.h"

class TextScreen:
    public Screen
{
    public:
        TextScreen(ScreenType nextScreen);
        ~TextScreen();

        virtual void draw() override;
        virtual void update(Inputs& inputs) override;
    private:
        ScreenType nextScreen;
};