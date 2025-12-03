#pragma once

#include <Arduino.h>
#include "Inputs/Inputs.h"
#include "Configuration.h"
#include "DHT.h"
#include <DFRobot_GDL.h>
#include <Context.h>

enum ScreenType {
    CHALLENGE,
    DIFFICULTY,
    CHALLENGE_IN_PROGESS,
    END
};

class Screen {
    public:
        Screen(ScreenType type, ScreenType nextScreen,Context& context);
        virtual ~Screen();
        virtual void draw() = 0;
        virtual void update(Inputs& inputs) = 0;

        virtual void setText(const String* newText, int newTextCount);

        ScreenType getCurrentScreen();

        virtual void switchScreen();

    protected:
        DHT* dht;
        DFRobot_ST7789_240x320_HW_SPI* screen;

        ScreenType type;
        ScreenType currentScreen;
        ScreenType nextScreen;

        Context context;

        String* screenText;
        int textCount;
};