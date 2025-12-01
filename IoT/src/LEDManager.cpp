#include "LEDManager.h"

void flashAllLeds(int times) {
    for (int i = 0; i < times; i++) {
        digitalWrite(WHITE_LED, HIGH);
        digitalWrite(GREEN_LED, HIGH);
        digitalWrite(BLUE_LED, HIGH);

        delay(LED_DELAY_TIME);

        digitalWrite(WHITE_LED, LOW);
        digitalWrite(GREEN_LED, LOW);
        digitalWrite(BLUE_LED, LOW);

        delay(LED_DELAY_TIME);
    }
}

void flashAllLeds(int times, int ledDelay) {
    for (int i = 0; i < times; i++) {
        digitalWrite(WHITE_LED, HIGH);
        delay(ledDelay);
        digitalWrite(GREEN_LED, HIGH);
        delay(ledDelay);
        digitalWrite(BLUE_LED, HIGH);

        delay(LED_DELAY_TIME);

        digitalWrite(WHITE_LED, LOW);
        delay(ledDelay);
        digitalWrite(GREEN_LED, LOW);
        delay(ledDelay);
        digitalWrite(BLUE_LED, LOW);

        delay(LED_DELAY_TIME);
    }
}

void flashSingleLed(int ledPin, int ledDelay) {
    digitalWrite(ledPin, HIGH);
    delay(ledDelay);
    digitalWrite(ledPin, LOW);
    delay(ledDelay);
}