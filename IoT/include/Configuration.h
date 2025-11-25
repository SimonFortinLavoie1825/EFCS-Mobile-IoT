#include "DHT.h"
#include <DFRobot_GDL.h>

#define BTN_ROUGE_PIN 12
#define BTN_BLANC_PIN 27
#define BTN_JAUNE_PIN 14

#define LED_ROUGE_PIN 25
#define LED_BLANC_PIN 33
#define LED_JAUNE_PIN 26

#define JOYSTICK_BTN 32
#define JOYSTICK_X 34
#define JOYSTICK_Y 35

#define TFT_DC 17
#define TFT_CS 5
#define TFT_RST 16

void setUpPin();

DFRobot_ST7789_240x320_HW_SPI screen(TFT_DC, TFT_CS, TFT_RST);