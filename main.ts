let DEAD_ZONE = 400
let CENTER = 511
let HOLD = 100
let INTERVAL_DEFAULT = 400
let INTERVAL_STEP = 20
let interval = 0
let x = 0
let y = 0
let dx = 0
let dy = 0
let bar = 0
let game_active = false

input.onButtonPressed(Button.A, function () {
    if (bar > 0) {
        led.unplot(bar + 1, 4)
        bar = bar - 1
        led.plot(bar, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (bar < 3) {
        led.unplot(bar, 4)
        bar = bar + 1
        led.plot(bar + 1, 4)
    }
})

basic.forever(function(){
    basic.clearScreen()
    game.addScore(0)
    basic.pause(500)
    game.setScore(0)
    interval = INTERVAL_DEFAULT
    x = 2
    y = 3
    dx = 1
    dy = -1
    bar = 0
    led.plot(x, y)
    led.plot(bar, 4)
    led.plot(bar + 1, 4)
    game_active = true
    while (game_active) {
        if (x + dx > 4) {
            dx = -dx
        } else if (x + dx < 0) {
            dx = -dx
        }
        if (y + dy < 0) {
            dy = -dy
        } else if (y + dy > 3) {
            if (led.point(x + dx, y + dy)){
                dy = -dy
                game.setScore(game.score()+1)
                if (interval - INTERVAL_STEP >= 0){
                    interval = interval - INTERVAL_STEP
                }
            } else {
                game_active = false
            }
        }
        if (game_active) {
            led.plot(x + dx, y + dy)
            led.unplot(x, y)
            x = x + dx
            y = y + dy
            basic.pause(interval)
        } else {
            basic.clearScreen()
            game.addScore(0)
            basic.pause(500)
            basic.showNumber(game.score())
            basic.pause(1000)
        }
    }
})

basic.forever(function () {
    basic.pause(50)
    if (game_active) {
        if (pins.analogReadPin(AnalogPin.P2) > CENTER + DEAD_ZONE) {
            if (bar > 0) {
                led.unplot(bar + 1, 4)
                bar = bar - 1
                led.plot(bar, 4)
                basic.pause(HOLD)
            }
        }
        if (pins.analogReadPin(AnalogPin.P2) < CENTER - DEAD_ZONE) {
            if (bar < 3) {
                led.unplot(bar, 4)
                bar = bar + 1
                led.plot(bar + 1, 4)
                basic.pause(HOLD)
            }
        }
    }
})
