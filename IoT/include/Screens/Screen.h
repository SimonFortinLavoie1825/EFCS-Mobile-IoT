#include <Arduino.h>
#include "Inputs/Inputs.h"
#include "Configuration.h"
#include "DHT.h"
#include <DFRobot_GDL.h>

enum ScreenType {
    CHALLENGE,
    DIFFICULTY,
    CHALLENGE_IN_PROGESS,
    END
};

class Screen {
    public:
        Screen(ScreenType type);
        virtual ~Screen();
        virtual void draw() = 0;
        virtual void update(Inputs& inputs) = 0;

        virtual void setText(const String* newText, int newTextCount);

    protected:
        DHT* dht;
        DFRobot_ST7789_240x320_HW_SPI* screen;

        ScreenType type;
        ScreenType currentScreen;
        String previousScreenInfo;

        String* screenText;
        int textCount;
};